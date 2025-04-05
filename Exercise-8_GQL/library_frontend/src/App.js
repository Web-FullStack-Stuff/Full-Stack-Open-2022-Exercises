import { useEffect, useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'

import { Routes, Route, Link } from 'react-router-dom'

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same Book twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const result_authors = useQuery(ALL_AUTHORS)
  const result_books = useQuery(ALL_BOOKS)

  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  if (result_authors.loading || result_books.loading) {
    return <div>loading...</div>
  }

  const logout = async () => {
    setToken(null)
    localStorage.clear()
    await client.resetStore()
  }

  if (!token) {
    return (
      <>
        <div className='nav'>
          <Link to='/'>
            <button>books</button>
          </Link>
          <Link to='/authors'>
            <button>authors</button>
          </Link>
          <Link to='/login'>
            <button>login</button>
          </Link>
        </div>
        <Routes>
          <Route
            path='/'
            element={<Books books={result_books.data.allBooks} />}
          />
          <Route path='/login' element={<LoginForm setToken={setToken} />} />
          <Route
            path='/authors'
            element={
              <Authors authors={result_authors.data.allAuthors} token={token} />
            }
          />
        </Routes>
      </>
    )
  }

  return (
    <div>
      <div className='nav'>
        <Link to='/'>
          <button>books</button>
        </Link>
        <Link to='/authors'>
          <button>authors</button>
        </Link>
        <Link to='/add'>
          <button>add book</button>
        </Link>
        <Link to={'/recommend'}>
          <button>recommend</button>
        </Link>
        <button onClick={logout}>logout</button>
      </div>

      <Routes>
        <Route
          path='/'
          element={<Books books={result_books.data.allBooks} />}
        />
        <Route
          path='/authors'
          element={
            <Authors authors={result_authors.data.allAuthors} token={token} />
          }
        />
        <Route path='/add' element={<NewBook />} />
        <Route
          path='/recommend'
          element={<Recommend allBooks={result_books.data.allBooks} />}
        />
      </Routes>
    </div>
  )
}

export default App
