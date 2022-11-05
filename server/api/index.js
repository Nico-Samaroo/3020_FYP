const { Router } = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);

module.exports = apiRouter;
