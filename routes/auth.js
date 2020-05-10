const express = require("express")
const router = express.Router();
const User = require("../models/User")

router.get("/users", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user)
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
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
  })
  try {
    const response = await user.save()
    res.json(response)
  } catch (err) {
    res.json({ message: err })
  }
})
// search for a specific post 
router.get("/:postId", async (req, res) => {
  try {
    const post = await User.findById(req.params.postId)
    res.json(post)
  } catch (err) {
    res.json(err)
  }
})

// delete a specific post using id
router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.userId })
    res.json(deletedUser)
  } catch (err) {
    res.json(err)
  }
})
//update a post
router.patch("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.params.userId }, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
      }
    })
    res.json(updatedUser)
  } catch (err) {
    res.json(err)
  }
})
module.exports = router