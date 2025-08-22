const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
async (email, password, done) => {
    try {
        const q = await User.findOne({ email }).exec();
        if (!q) {
            return done(null, false, { message: 'User not found' }
        );
        }
        if (!q.validatePassword(password)) {
            return done(null, false, { message: 'Invalid password' });
        }
        return done(null, q);
    } catch (err) {
        return done(err);
    }
}));

