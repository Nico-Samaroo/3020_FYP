const { Router } = require("express");
const passport = require("passport");
const authRouter = require("./auth");

const apiRouter = Router();

apiRouter.use('/auth',authRouter);

const user = Router()
user.get('/',(req,res)=>res.send("HELO"))
apiRouter.use('/user',passport.authenticate('jwt',{session:false}),user)

module.exports = apiRouter;
