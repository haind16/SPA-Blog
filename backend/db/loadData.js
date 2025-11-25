require('dotenv').config();
const mongoose = require('mongoose');
const Post = require("./postModel"); 
const { BlogPosts } = require("../blog"); 

const run = async () => {
  try {
    await mongoose .connect(process.env.DB_URL)
        .then(() => {
            console.log("Successfully connected to MongoDB Atlas!");
        })
        .catch((error) => {
            console.error(error);
        }
    );

    await Post.deleteMany({});
    console.log("Cleared Posts collection");

    await Post.insertMany(BlogPosts);
    console.log("Seeded posts successfully");
  } catch (err) {
    console.error("Error seeding posts:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected MongoDB");
  }
};

run();
