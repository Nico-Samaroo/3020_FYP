const passport = require("passport");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");

const UserModel = require("./models/User");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    // Query the database for requested user; call the "next" callback based
    // on the cases: (1) User with email found or not (2) email-password matches or not
    async (email, password, next) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) return next(null, false, { message: "INVALID_EMAIL" });

        const doesPasswordMatch = await bcrypt.compare(password, user.password);
        if (!doesPasswordMatch)
          return next(null, false, { message: "INVALID_PASSWORD" });

        return next(null, user);
      } catch (error) {
        next(error);
      }
    }
  )
);

passport.use(
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, next) => {
      try {
        const user = await UserModel.findById(payload.id);
        return next(null, user.withoutPassword());
      } catch (error) {
        return next(error);
      }
    }
  )
);
