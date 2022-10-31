const { Router } = require("express");
const carRouter = require("./car");
const userRouter = require("./user");

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/car", carRouter);

module.exports = apiRouter;
