const express = require('express');
const loginController = require("../controller/loginController")
const loginRouter = express.Router();

loginRouter.post('/', loginController.Login);

module.exports = loginRouter;