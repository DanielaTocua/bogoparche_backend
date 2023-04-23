import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as localStrategy } from "passport-local";

import UserModel from "../models/user.model";

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: "Random string",
};

passport.use(
	"login",
	new localStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (email, password, done) => {
			try {
				const user = await UserModel.findByEmail(email);
				if (!user) {
					return done(null, false, { message: "User not found" });
				}
				const validate = await user.validatePassword(password);
				if (!validate) {
					return done(null, false, { message: "Wrong Password" });
				}

				return done(null, user, { message: "Logged in Successfully" });
			} catch (error) {
				return done(error);
			}
		},
	),
);

passport.use(
	new JWTStrategy(opts, function (jwt_payload, done) {
		try {
			return done(null, jwt_payload.user);
		} catch (err) {
			return done(err);
		}
	}),
);
