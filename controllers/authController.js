const db = require("../models/users.js");


async function renderLoginForm(req, res) {
    res.render("login") //TODO make login form view
}


async function login(req,res){
    return null;
}

async function renderSignUpForm(req,res) {
    res.render("signup");
}

async function signup(req,res){
    try{
        await db.createUser(req.body.fname, req.body.lname, req.body.email, req.body.password)
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