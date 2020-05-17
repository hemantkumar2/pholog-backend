const express = require("express")
const mongoose = require("mongoose")

const app = express()

const config = require('./config')

const postsRoute = require("./routes/post")
const usersRoute = require("./routes/user")
const authUser = require("./routes/auth")

app.use(express.json())
// ROUTES 
app.get("/", (req, res) => {
  res.send("Welcome!")
})
app.use("/posts", postsRoute)
app.use("/users", usersRoute)
app.use("/auth", authUser)


// connect to DB 
mongoose.connect(config.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("connected to DB")
  })

app.listen(config.PORT, () => {
  console.log(`server running at port ${config.PORT}`)
})