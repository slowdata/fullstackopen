import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    if (name === 'title') setTitle(value)
    else if (name === 'author') setAuthor(value)
    else setUrl(value)
  }

  const handleNewBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    createBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a new Blog</h2>
      <form onSubmit={handleNewBlog}>
        title:
        <input value={title} name="title" type="text" onChange={handleChange} />
        <br />
        author:
        <input
          value={author}
          name="author"
          type="text"
          onChange={handleChange}
        />
        <br />
        url:
        <input value={url} name="url" type="text" onChange={handleChange} />
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
