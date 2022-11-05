const { Router } = require("express");
const passport = require("passport");

const userRouter = Router();

userRouter.use(passport.authenticate("jwt", { session: false }));

userRouter.get("/", (req, res) => res.send(req.user));

module.exports = userRouter;
