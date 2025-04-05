import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button id='submit-blog-button' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
