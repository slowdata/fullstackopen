const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const supertest = require('supertest')

const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secreto', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ronhonho',
            name: 'Ronhonho da Silva',
            password: 'coisinhas'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd.length).toBe(usersAtStart.length + 1)

        const username = userAtEnd.map(u => u.username)
        expect(username).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'superuser',
            password: 'secreto'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username as length less than 3', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ro',
            name: 'superuser',
            password: 'secreto'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(
            `\`username\` (\`${newUser.username}\`) is shorter than the minimum`
        )

        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd.length).toBe(usersAtStart.length)
    })
})

afterAll(async done => {
    await mongoose.connection.close()
    done()
})
