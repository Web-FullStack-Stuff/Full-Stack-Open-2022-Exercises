const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          return null
        } else if (!args.genre) {
          return await Book.find({ author: author.id }).populate('author')
        } else if (args.genre) {
          return await Book.find({
            genres: { $in: [args.genre] },
            author: author.id,
          }).populate('author')
        }
      }

      if (args.genre && !args.author) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate(
          'author'
        )
      }
    },
    allAuthors: async (root, args) => {
      // console.log('Author.find');
      return Author.find({})
    },
  },

  Author: {
    // bookCount: async (root) => {
    //   console.log('Book.count');
    //   const booksByAuthorCount = await Book.countDocuments({ author: root.id })
    //   return booksByAuthorCount
    // },
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        }) 
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

    addBook: async (root, args, context) => {
      const book = new Book({ ...args })
      const currentUser = context.currentUser

      if(!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        const authorExist = await Author.findOne({ name: args.author })
        if (!authorExist) {
          const author = new Author({ name: args.author, bookCount: 1 })
          await author.save()
          book.author = author._id
        } else {
          authorExist.bookCount = (authorExist.bookCount) + 1
          await authorExist.save()
          book.author = authorExist._id
        }
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error,
          },
        })
      }

      const savedBook = await book.populate('author')
      
      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

      return savedBook
    },

    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })

      const currentUser = context.currentUser

      if(!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      
      if (!author) return null

      const updatedAuthor = await Author.findOneAndUpdate(
        { _id: author.id },
        { born: args.setBornTo },
        { new: true }
      )

      return updatedAuthor
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers