const { Router } = require("express");

const carRouter = Router();

carRouter.get("/", (req, res) => res.end("HELLO FROM CAR CARROUTER"));

module.exports = carRouter;
