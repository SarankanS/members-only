const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./config/passport');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');


require('dotenv').config();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layout'); 

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

initializePassport(passport);

app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);

app.get("/", (req, res) => {
  // res.send("Welcome to the Members only!");
  res.render("home", {title: "Members Home"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
