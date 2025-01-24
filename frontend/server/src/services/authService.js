const axios = require("axios");
const config = require("../config/config");

class AuthService {
  static async signup(req) {
    try {
      const response = await axios.post(
        `${config.backendUrl}/signup`,
        req.body
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw {
          status: 400,
          message: error.response.data.message || "User already exists",
        };
      } else if (error.response && error.response.status !== 500) {
        throw {
          status: error.response.status,
          message: error.response.data.message || "An error occurred",
        };
      } else {
        throw new Error("Internal Server Error");
      }
    }
  }

  static async login(req) {
    try {
      const response = await axios.post(
        `${config.backendUrl}/login`,
        req.body,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status !== 500) {
        throw {
          status: error.response.status,
          message:
            error.response.data.message || "User not found.Please signup.",
        };
      } else {
        throw new Error("Internal Server Error");
      }
    }
  }

  static async logout(req) {
    try {
      const response = await axios.post(
        `${config.backendUrl}/logout`,
        {},
        {
          headers: { Authorization: req.headers.authorization },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error message:", error.message);
      throw new Error("Error in Logout request : " + error.message);
    }
  }
}

module.exports = AuthService;
