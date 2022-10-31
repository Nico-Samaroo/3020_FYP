const { Router } = require("express");

const userRouter = Router();

userRouter.get("/", (req, res) => res.end("HELLO FROM USERROUTER"));

module.exports = userRouter;
