const LocalStrategy = require('passport-local').Strategy;
const db = require("../models/users")
const bcrypt = require("bcryptjs");

function initializePassport(passport){
    passport.use((new LocalStrategy(async (email, password, done) => {
        try{
            const user = await db.getUserByEmail(email);
            if (!user){
                return done(null, false, { message: 'Incorrect email/username' });
            }

            const isMatch = await bcrypt.compare(password, user.password)
            return done(null, user)
        }catch(err){
            return done(err);
        }

    })))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const  user = await db.getUserById(id);
            done(null, user);
        }catch(err) {
            done(err);
        }
    });
}


module.exports = initializePassport;
