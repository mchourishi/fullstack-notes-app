const express = require("express");
const router = express.Router();
const { validateNote } = require("../middleware/validation");
const { validateToken } = require("../middleware/auth");
const NoteService = require("../services/noteService");
const { handleAsync } = require("../utils/errorHandler");

router.post(
  "/",
  validateToken,
  validateNote,
  handleAsync(NoteService.createNote)
);
router.get("/", validateToken, handleAsync(NoteService.getNotes));
router.get(
  "/random_quote",
  validateToken,
  handleAsync(NoteService.getRandomQuote)
);

module.exports = router;
