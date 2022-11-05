const { Router } = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { sign } = require("jsonwebtoken");
const { z } = require("zod");
const UserModel = require("../models/User");

const authRouter = Router();

authRouter.post("/login", (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user)
      return res.status(400).json(info ?? { code: "INVALID_DATA" });

    req.login(user, { session: false }, (err) => {
      if (err) res.status(500).send(err);
      const token = sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });
      return res.json({ user: user.withoutPassword(), token });
    });
  })(req, res);
});

const registerSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
authRouter.post("/register", async (req, res) => {
  const registerParsed = registerSchema.safeParse(req.body);
  if (registerParsed.error)
    return res.status(400).json({ message: "INVALID_DATA" });
  if (registerParsed.success) {
    const { data } = registerParsed;
    const doesUserExist = await UserModel.exists({ email: data.email });
    if (doesUserExist)
      return res.status(400).json({ message: "INVALID_EMAIL" });

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await UserModel.create({
      ...data,
      password: hashedPassword,
    });
    return res.json({ user: user.withoutPassword() });
  }
});

module.exports = authRouter;
