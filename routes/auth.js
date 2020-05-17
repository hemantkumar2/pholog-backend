const express = require("express")
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv/config")
const auth = require("../middleware/auth")

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

// login
router.post("/", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields!" })
  }
  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: "User does not exist!" })
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" })
          jwt.sign(
            { id: user.id },
            process.env.jwtSecret,
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
    })
})

// get user data 
router.post("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
    .catch(err => {
      res.json(err)
    })
})

module.exports = router;