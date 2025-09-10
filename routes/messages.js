const { Router } = require('express');
const messageRouter = Router();
const messageController = require('../controllers/messageController');
const { ensureAuthenticated } = require('../middleware/auth'); 

messageRouter.get("/new", ensureAuthenticated, messageController.renderMessageForm)
messageRouter.post("/new", ensureAuthenticated, messageController.createMessage);


module.exports = messageRouter;