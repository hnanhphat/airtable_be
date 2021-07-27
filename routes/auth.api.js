const router = require("express").Router();
const authController = require("../controllers/auth.controller");

/**
 * @route POST api/auth/login
 * @description Login
 * @access Public
 */
router.post("/login", authController.login);

module.exports = router;
