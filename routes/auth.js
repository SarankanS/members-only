const { Router } = require('express');
const authController = require('../controllers/authController');

const authRouter = Router();

authRouter.get("/login", authController.renderLoginForm);
authRouter.post("/login", authController.login);

authRouter.get("/signup", authController.renderSignUpForm);
authRouter.post("/signup", authController.signup);

authRouter.get("/logout", authController.logout);

module.exports = authRouter;