const blogRouter = require("express").Router();

const Blog = require("../models/blog");

blogRouter.get("/", (request, response) => {
  Blog.find({}).then(blogs => {
    const allBlogs = blogs.map(b => b.toJSON());
    response.json(allBlogs);
  });
});

blogRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then(result => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
