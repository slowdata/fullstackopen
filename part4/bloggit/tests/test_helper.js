const Blog = require('../models/blog')
const User = require('../models/user')

const inicialBlogs = [
    {
        title: 'Best blog ever',
        author: 'JD',
        url: 'best.blog.com',
        likes: 5
    },
    {
        title: 'Rework',
        author: 'DHH & JS',
        url: 'https://rework.fm/',
        likes: 20
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'will remove this soon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = { inicialBlogs, nonExistingId, blogsInDb, usersInDb }
