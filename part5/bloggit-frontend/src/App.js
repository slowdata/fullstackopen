import React, { useState, useEffect } from "react";

import Blog from "./components/Blog";
import blogService from "./services/blogs";

function App() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const blogs = await blogService.getAll();
                console.log(blogs);

                setBlogs(blogs);
            } catch (error) {
                console.error(error);
            }
        }
        fetchBlogs();
    }, []);

    return (
        <>
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </>
    );
}

export default App;
