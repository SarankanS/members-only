const { Router } = require('express');
const homeController = require('../controllers/homeController');

const homeRouter = Router();

homeRouter.get("/", homeController.renderHome);

module.exports = homeRouter;
