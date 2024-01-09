import passport from 'passport';
import local from 'passport-local';
import github from 'passport-github2';
import { config } from "dotenv";
import { UserMongo } from "../dao/UserMongo.js";
import User from "../dao/models/User.js";

config();

const userMongo = new UserMongo();

export const inicializaPassport = () => {

    passport.use('github', new github.Strategy({
            clientID: process.env.GITHUB_CLIENT_ID, 
            clientSecret: process.env.GITHUB_KEY,
            callbackURL: process.env.GITHUB_CALLBACK
        }, async (token, tokenRefresh, profile, done) => {
            try {
                let user=await User.findOne({email:profile._json.email});
                if(!user){
                    user=await User.create({
                        first_name: profile._json.name,
                        email: profile._json.email,
                        github: profile
                    });
                }
                done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ));

    passport.use('register', new local.Strategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            const { first_name, last_name, email, age, password } = req.body;
            const user = await userMongo.register(first_name, last_name, email, age, password);
            done(null, user);
        } catch (error) {
            done(null, false, error);
        }
    }));

    passport.use('login', new local.Strategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            const { email, password } = req.body;
            const user = await userMongo.login(email, password);
            req.session.user = user;
            done(null, user);
        } catch (error) {
            done(null, false, error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser( async (id, done) => {
        const user = await userMongo.findUserById(id);
        done(null, user);
    });

}