module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'localhost',
  jwtSecret: process.env.jwtSecret || "its_my_jwt_secret"
}