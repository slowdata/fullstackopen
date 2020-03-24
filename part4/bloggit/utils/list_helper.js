const dummy = blogs => 1;

const totalLikes = blogs => {
  const reducer = (sum, blog) => sum + blog.likes;

  if (blogs.length === 0) return 0;
  else if (blogs.length >= 1) return blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null;

  const fav = blogs.reduce((acc, next) => {
    if (acc.title === next.title) return acc;
    return acc.likes >= next.likes ? acc : next;
  });

  const { title, author, likes } = fav;
  return { title, author, likes };
};

const mostBlogs = blogs => {
  if (blogs.length === 0) return null;

  const result = orderBlogs(blogs);
  const max = result.reduce((acc, next) => {
    return acc.blogs >= next.blogs ? acc : next;
  });

  return { author: max.author, blogs: max.blogs };
};

const mostLikes = blogs => {
  if (blogs.length === 0) return null;

  const result = orderBlogs(blogs);
  const mostLikes = result.reduce((acc, next) => {
    return acc.likes >= next.likes ? acc : next;
  });
  return { author: mostLikes.author, likes: mostLikes.likes };
};

function orderBlogs(blogs) {
  const result = [];
  for (let i = 0; i < blogs.length; i++) {
    const b = blogs.filter(bl => bl.author === blogs[i].author);
    result.push({ ...blogs[i], blogs: b.length });
    blogs = blogs.filter(blog => blog.author !== blogs[i].author);
  }
  return result;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
