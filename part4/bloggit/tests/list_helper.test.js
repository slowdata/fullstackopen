const listHelper = require("../utils/list_helper");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 17,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

test("dummy return one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test("when a list has only one blog equals the likes of that", () => {
    expect(listHelper.totalLikes([{ title: "Bolas", likes: 3 }])).toBe(3);
  });

  test("of a bigger list is calculated right", () => {
    expect(listHelper.totalLikes(blogs)).toBe(41);
  });
});

describe("favorite blog", () => {
  test("of empty list is null", () => {
    expect(listHelper.favoriteBlog([])).toEqual(null);
  });

  test("of a list with one blog equals that blog", () => {
    const { title, author, likes } = blogs[
      Math.floor(Math.random() * blogs.length)
    ];
    const b = { title, author, likes };

    expect(listHelper.favoriteBlog([b])).toEqual(b);
  });

  test("of a list of blogs equals the blog with more likes", () => {
    const { title, author, likes } = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 17,
      __v: 0
    };
    expect(listHelper.favoriteBlog(blogs)).toEqual({ title, author, likes });
  });
});

describe("most blogs", () => {
  test("of empty list is null", () => {
    expect(listHelper.favoriteBlog([])).toEqual(null);
  });

  test("of a list with one blog Author blogs count should be 1", () => {
    const { title, author, likes } = blogs[0];
    const b = { title, author, likes };

    expect(listHelper.mostBlogs([b])).toEqual({
      author: b.author,
      blogs: 1
    });
  });

  test("of a list of blog's should return the Author with more Blogs", () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    });
  });
});

describe("most likes", () => {
  test("of empty list is null", () => {
    expect(listHelper.favoriteBlog([])).toEqual(null);
  });

  test("of a list with one blog should be the likes of that blog", () => {
    const b = blogs[0];
    //const b = { title, author, likes };

    expect(listHelper.mostLikes([b])).toEqual({
      author: b.author,
      likes: b.likes
    });
  });

  test("of a list of blog's should return the Author with more Blogs", () => {
    expect(listHelper.mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    });
  });
});
