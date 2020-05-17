const express = require("express")
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config")

router.get("/", async (req, res) => {
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

// register a new User 
router.post("/", async (req, res) => {
  const { name, email, contact, password } = req.body
  if (!name || !email || !contact || !password) {
    return res.status(400).json({ msg: "please enter all fields!" })
  }
  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: "User already registered!" })
      const newUser = new User({
        name,
        email,
        contact,
        password,
      })
      // create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id },
                config.jwtSecret,
                { expiresIn: "1d" },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                    }
                  })
                }
              )
            })
            .catch(err => res.json(err))
        })
      })
    })
})
// search for specific user 
router.get("/:userId", async (req, res) => {
  try {
    const post = await User.findById(req.params.userId)
    res.json(post)
  } catch (err) {
    res.json(err)
  }
})

// delete a specific user using id
router.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.userId })
    res.json(deletedUser)
  } catch (err) {
    res.json(err)
  }
})
//update a user using Id
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

module.exports = router;