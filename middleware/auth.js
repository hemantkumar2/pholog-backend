const jwt = require("jsonwebtoken")
require("dotenv/config")

function auth(req, res, next) {
  const token = req.header("x-auth-token")

  // check for token 

  if (!token) {
    res.status(401).json({ msg: "No token authorization denied" })
  }

  try {
    // verify token 
    const decoded = jwt.verify(token, process.env.jwtSecret)
    // add user from payload 
    req.user = decoded
    next()
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" })
  }
}

module.exports = auth