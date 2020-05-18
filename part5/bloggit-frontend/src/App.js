import React, { useState, useEffect } from "react";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import Login from "./components/Login";
import Notification from "./components/Notification";

function App() {
    const [blogs, setBlogs] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [addedMessage, setAddedMessage] = useState(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const blogs = await blogService.getAll();
                setBlogs(blogs);
            } catch (error) {
                // THis is not working
                setErrorMessage(error.message);
                setTimeout(() => setErrorMessage(null), 5000);
            }
        }
        fetchBlogs();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setErrorMessage(null);
            const user = await loginService.login({ username, password });
            blogService.setToken(user.token);
            window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));

            setUser(user);
            setUsername("");
            setPassword("");
        } catch (error) {
            setErrorMessage("Wrong credentials!");
            setTimeout(() => setErrorMessage(null), 5000);
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        setUser(null);
        window.localStorage.clear();
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "title") setTitle(value);
        else if (name === "author") setAuthor(value);
        else setUrl(value);
    };

    const handleNewBlog = async (e) => {
        e.preventDefault();

        const newBlog = {
            title,
            author,
            url,
        };

        const response = await blogService.create(newBlog);
        console.log(response);

        const newArrays = blogs.concat(response);
        setBlogs(newArrays);
        setAddedMessage(`a new blog ${title} by ${author} added`);
        setTimeout(() => setAddedMessage(null), 5000);
    };

    return (
        <>
            {user === null ? (
                <div>
                    <h2>log in to application</h2>
                    {errorMessage && (
                        <Notification type="error">{errorMessage}</Notification>
                    )}
                    <br />
                    <Login
                        login={handleLogin}
                        username={setUsername}
                        password={setPassword}
                    />
                </div>
            ) : (
                <div>
                    <h2>blogs</h2>
                    {addedMessage && (
                        <Notification>{addedMessage}</Notification>
                    )}
                    <div>
                        {user.name} logged in
                        <button onClick={handleLogout}>logout</button>
                    </div>
                    <br />
                    <h2>create new</h2>
                    <form onSubmit={handleNewBlog}>
                        title:
                        <input
                            name="title"
                            type="text"
                            onChange={handleChange}
                        />
                        <br />
                        author:
                        <input
                            name="author"
                            type="text"
                            onChange={handleChange}
                        />
                        <br />
                        url:
                        <input name="url" type="text" onChange={handleChange} />
                        <br />
                        <button type="submit">create</button>
                    </form>
                    <br />
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </>
    );
}

export default App;
