const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 2 })
    response.send(blogs.map(b => b.toJSON()))
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById({ _id: request.params.id })
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response) => {
    const { body, token } = request

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: user.name,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id.toString()
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id.toString())

    await user.save()

    response.status(201).json(savedBlog.toJSON())
})

blogRouter.put('/:id', async (request, response) => {
    const { body } = request

    const blog = {
        likes: body.likes === undefined ? 0 : body.likes
    }

    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
        useFindAndModify: false
    })
    response.json(savedBlog.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
    const {
        token,
        params: { id }
    } = request
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById({ _id: id })
    if (!blog) {
        return response
            .status(404)
            .json({ error: 'invalid blog or blog already deleted' })
    } else if (decodedToken.id === blog.user.toString()) {
        await Blog.findByIdAndDelete({ _id: id })
        return response.status(204).end()
    }
    response.status(401).json({ error: 'invalid user' })
})

module.exports = blogRouter
