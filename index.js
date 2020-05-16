const express = require("express")
const mongoose = require("mongoose")

const app = express()

require("dotenv/config")

const postsRoute = require("./routes/post")
const usersRoute = require("./routes/user")
const authUser = require("./routes/auth")

app.use(express.json())
app.use("/posts", postsRoute)
app.use("/users", usersRoute)
app.use("/auth", authUser)
// ROUTES 
app.get("/", (req, res) => {
  res.send("home page!")
})


// connect to DB 
mongoose.connect(process.env.MONGO_URI,
  { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log("connected to DB")
  })

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`server running at port ${port}`)
})