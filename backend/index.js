const express = require("express");
const app = express();
const cors = require("cors");
const BlogPosts = require("./blog");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
app.use(cors());

app.post("/api/login", jsonParser, (req, res) => {
  const creds = {
    username: req.body.username,
    password: req.body.password,
  };
  if (creds.username === "admin" && creds.password === "123") {
    res.status(200)
    .send({ message: "Login successful"});
  } 
  else {
    res.status(400).send({ message: "Login failed"});
  }
});

app.post("/api/post", jsonParser, (req, res) => {
  const post = {
    slug: req.body.slug,
    title: req.body.title,
    description: req.body.description,
  };
  BlogPosts.BlogPosts.push(post);
  res.status(200).send({ message: "Posted successful" });
});


app.get("/api/posts", (req, res) => {
  res.json(BlogPosts.BlogPosts);
});

app.get("/api/post/:slug", (req, res) => {
  const slug = req.params.slug;
  const post = BlogPosts.BlogPosts.find((e) => e.slug === slug);
  if (post) res.json(post);
  else res.status(404).send("Not found");
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`)
})