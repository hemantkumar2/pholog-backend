const express = require("express")
const router = express.Router();
const Post = require("../models/Post")

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts)
  } catch (err) {
    res.json({
      message: err
    })
  }
})

router.get("/specific", (req, res) => {
  res.send("specific post page!")
})

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  })
  try {
    const response = await post.save()
    res.json(response)
  } catch (err) {
    res.json({ message: err })
  }
})
// search for a specific post 

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    res.json(post)
  } catch (err) {
    res.json(err)
  }
})

// delete a specific post using id
router.delete("/:postId", async (req, res) => {
  try {
    const deletedPost = await Post.deleteOne({ _id: req.params.postId })
    res.json(deletedPost)
  } catch (err) {
    res.json(err)
  }
})
//update a post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne({ _id: req.params.postId }, {
      $set: {
        title: req.body.title,
        description: req.body.description,
      }
    })
    res.json(updatedPost)
  } catch (err) {
    res.json(err)
  }
})
module.exports = router