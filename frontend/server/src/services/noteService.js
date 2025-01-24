const axios = require("axios");
const config = require("../config/config");

class NoteService {
  static async createNote(req) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const respone = await axios.post(`${config.backendUrl}/notes`, req.body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return respone.data;
    } catch {
      console.error("Error message:", error.message);
      throw new Error("Error in Create Note request : " + error.message);
    }
  }

  static async getNotes(req) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const response = await axios.get(`${config.backendUrl}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch {
      console.error("Error message:", error.message);
      throw new Error("Error in Get Notes request : " + error.message);
    }
  }

  static async getRandomQuote(req) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const response = await axios.get(`${config.backendUrl}/random_quote`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch {
      console.error("Error message:", error.message);
      throw new Error("Error in Get Random Note request : " + error.message);
    }
  }
}

module.exports = NoteService;
