import React, { useState } from 'react'

import styles from './Blog.module.css'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [toggle, setToggle] = useState(false)

  const toogleDetails = () => {
    setToggle(!toggle)
  }

  const handleClick = () => {
    const newBlog = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url,
    }
    handleLike(newBlog)
  }

  const handleRemoveClick = (blog) => {
    const res = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (res) handleRemove(blog.id)
  }

  return (
    <div className={styles.box}>
      {blog.title}
      <button className={styles.button} onClick={toogleDetails}>
        {toggle ? 'hide' : 'view'}
      </button>

      <ul style={{ display: toggle ? '' : 'none' }} className={styles.list}>
        <li>{blog.url}</li>
        <li>
          likes: {blog.likes}
          <button onClick={handleClick}>like</button>
        </li>
        <li>{blog.author}</li>
        {user?.username === blog.user.username && (
          <button
            className={styles.remove}
            onClick={() => handleRemoveClick(blog)}
          >
            remove
          </button>
        )}
      </ul>
    </div>
  )
}

export default Blog
