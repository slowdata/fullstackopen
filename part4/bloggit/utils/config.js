require("dotenv").config();

const MONGODB_URI = process.env === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI
};
