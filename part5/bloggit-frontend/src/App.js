import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [addedMessage, setAddedMessage] = useState(null)

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  const blogFormRef = useRef()

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogs = await blogService.getAll()
        setBlogs(sortBlogs(blogs))
      } catch (error) {
        // THis is not working
        setErrorMessage(error.message)
        setTimeout(() => setErrorMessage(null), 5000)
      }
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (username, password) => {
    try {
      setErrorMessage(null)
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  const addBLog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const res = await blogService.create(blogObject)

      const newBlogs = blogs.concat(res)
      setBlogs(newBlogs)
      setAddedMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => setAddedMessage(null), 5000)
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const sortBlogs = (blogs) => {
    const newBlogs = blogs.sort((a, b) => {
      return a.likes < b.likes ? 1 : -1
    })
    return newBlogs
  }

  const addLike = async (newBlog) => {
    try {
      const res = await blogService.update(newBlog)
      const newBlogs = blogs.map((blog) => {
        if (blog.id === res.id) {
          const updatedBlog = {
            ...blog,
            likes: res.likes,
          }
          return updatedBlog
        }
        return blog
      })
      setBlogs(sortBlogs(newBlogs))
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const remove = async (id) => {
    await blogService.deleteBlog(id)
    const newBlogs = blogs.filter((blog) => blog.id !== id)
    setBlogs(newBlogs)
  }

  return (
    <>
      <h2 style={{ color: 'purple' }}>
        <em>Blogs</em>
      </h2>
      {user ? (
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
      ) : (
        <div>
          {errorMessage && (
            <Notification type="error">{errorMessage}</Notification>
          )}
          <Togglable buttonLabel="log in">
            <LoginForm handleLogin={login} />
          </Togglable>
        </div>
      )}
      <br />
      {user && (
        <div>
          {addedMessage && <Notification>{addedMessage}</Notification>}
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBLog} />
          </Togglable>
        </div>
      )}
      <br />
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={addLike}
            handleRemove={remove}
            user={user}
          />
        ))}
      </div>
    </>
  )
}

export default App
