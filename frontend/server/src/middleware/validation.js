const { body } = require("express-validator");

const validateNote = [body("content").trim().isLength({ min: 1 }).escape()];

const validateUser = [
  body("username").trim().isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

module.exports = { validateNote, validateUser };
