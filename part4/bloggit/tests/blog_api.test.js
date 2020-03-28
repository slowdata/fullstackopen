const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogsObjects = helper.inicialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogsObjects.map(b => b.save())
    await Promise.all(promiseArray)

    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('test_pass', 10)
    const user = new User({
        username: 'test_user',
        name: 'User para testes',
        passwordHash
    })

    await user.save()
})

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const res = await api.get('/api/blogs')
        expect(res.body.length).toBe(helper.inicialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const res = await api.get('/api/blogs')

        const titles = res.body.map(r => r.title)
        expect(titles).toContain('Rework')
    })

    test('all blogs have unique identifier property id', async () => {
        const res = await api.get('/api/blogs')

        res.body.map(b => expect(b.id).toBeDefined())
    })

    describe('viewing a specific blog', () => {
        test('a specific blog can be viewed', async () => {
            const blogsAtStart = await helper.blogsInDb()

            const blogToView = blogsAtStart[0]

            const result = await api
                .get(`/api/blogs/${blogToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(result.body).toEqual(blogToView)
        })
    })

    describe('Changing the blogs collection', () => {
        test('creating a blog without a valid token will fail with a 401 statuscode', async () => {
            const newBlog = {
                title: 'Learn fullstack',
                url: 'fullstack.blog.io',
                likes: 999,
                author: 'TEster User'
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/)
        })

        test('a valid blog can be added', async () => {
            const res = await api
                .post('/api/login')
                .send({ username: 'test_user', password: 'test_pass' })

            const { token } = res.body
            const decodedToken = jwt.verify(token, process.env.SECRET)

            const newBlog = {
                title: 'Learn fullstack',
                url: 'fullstack.blog.io',
                likes: 999,
                author: decodedToken.name,
                user: decodedToken.id
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.inicialBlogs.length + 1)

            const titles = blogsAtEnd.map(t => t.title)
            expect(titles).toContain('Learn fullstack')
        })

        test('blog added without likes will default to 0', async () => {
            const res = await api
                .post('/api/login')
                .send({ username: 'test_user', password: 'test_pass' })

            const { token } = res.body
            const decodedToken = jwt.verify(token, process.env.SECRET)

            const newBlog = {
                title: 'Learn fullstack Blog',
                author: decodedToken.name,
                url: 'fullstack.blog.io',
                user: decodedToken.id
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)
                .expect(201)

            const blogsAtEnd = await helper.blogsInDb()
            const blog = blogsAtEnd.find(
                b => b.title === 'Learn fullstack Blog'
            )
            expect(blog.likes).toBe(0)
        })

        test('fails with status code 400 if creating blogs without title or url', async () => {
            const res = await api
                .post('/api/login')
                .send({ username: 'test_user', password: 'test_pass' })

            const { token } = res.body
            const decodedToken = jwt.verify(token, process.env.SECRET)

            const newBlogTitle = {
                title: 'Blog without an url',
                author: 'O grande Hosório',
                likes: 9
            }
            const newBlogUrl = {
                author: 'O grande Hosório',
                url: 'foobar.io',
                likes: 9
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlogTitle)
                .expect(400)

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlogUrl)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.inicialBlogs.length)
        })

        test('a blog can be updated', async () => {
            const blogsAtStart = await helper.blogsInDb()

            const blogTopdate = blogsAtStart[0]
            await api
                .put(`/api/blogs/${blogTopdate.id}`)
                .send({ likes: 111 })
                .expect(200)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.inicialBlogs.length)
            expect(blogsAtEnd[0].likes).toEqual(111)
        })

        test('a blog can be deleted', async () => {
            const res = await api
                .post('/api/login')
                .send({ username: 'test_user', password: 'test_pass' })

            const { token } = res.body
            const decodedToken = jwt.verify(token, process.env.SECRET)

            const newBlog = {
                title: 'Learn fullstack Blog',
                author: decodedToken.name,
                url: 'fullstack.blog.io',
                user: decodedToken.id
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .send(newBlog)
                .expect(201)

            const blogsAtStart = await helper.blogsInDb()

            const blogToDelete = blogsAtStart.find(
                b => b.title === 'Learn fullstack Blog'
            )

            console.log(blogToDelete)

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `bearer ${token}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toEqual(blogsAtStart.length - 1)
        })
    })
})

afterAll(() => mongoose.connection.close())
