const db = require("../models/users.js");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');


async function renderLoginForm(req, res) {
    res.render('login', { title: 'Login Page' });
}


async function login(req, res, next){
    const passport = require('passport');
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    })(req, res, next);
}

async function renderSignUpForm(req,res) {
    res.render('signup', { title: 'Sign Up Page' });
}

async function signup(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);       
        await db.createUser(req.body.fname, req.body.lname, req.body.email, hashedPassword);
        res.redirect("/")
    }catch(err){
        console.error("Signup error:", err);
        res.status(500).send("An error occurred during signup.");
    }
}


async function logout(req,res){
    return null;
}


module.exports = {
    renderLoginForm,
    login,
    renderSignUpForm,
    signup,
    logout
}