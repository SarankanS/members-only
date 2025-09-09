const {body} = require("express-validator")
const { Router } = require('express');
const authController = require('../controllers/authController');

const authRouter = Router();

authRouter.get("/login", authController.renderLoginForm);
authRouter.post("/login", authController.login);

authRouter.get("/signup", authController.renderSignUpForm);

authRouter.post("/signup",[
    body('fname')
      .trim()
      .notEmpty().withMessage('Username is required')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

    body('lname')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),


    body('email')
      .isEmail().withMessage('Invalid email')
      .normalizeEmail(),

    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('cpassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      })
  ], authController.signup);

authRouter.get("/logout", authController.logout);

authRouter.get("/join", authController.renderJoinForm);
authRouter.post("/join", authController.joinClub);

module.exports = authRouter;