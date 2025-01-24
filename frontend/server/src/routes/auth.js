const express = require("express");
const router = express.Router();
const { validateUser } = require("../middleware/validation");
const AuthService = require("../services/authService");
const { handleAsync } = require("../utils/errorHandler");

router.post("/signup", validateUser, handleAsync(AuthService.signup));
router.post("/login", handleAsync(AuthService.login));
router.post("/logout", handleAsync(AuthService.logout));

module.exports = router;
