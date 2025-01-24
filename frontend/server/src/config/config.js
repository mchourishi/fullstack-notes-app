require("dotenv").config();

module.exports = {
  port: process.env.PORT || 4000,
  backendUrl: process.env.BACKEND_URL,
  environment: process.env.NODE_ENV || "development",
};
