const JwtStrategy = require('passport-jwt').Strategy; // This is a Passport strategy for authenticating with a JSON Web Token
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require*('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload._id, (err, user) => {
            if(err){
                return done(err, false);
            }

            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}
