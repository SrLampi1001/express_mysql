const express = require('express');
const router = express.Router();
const usersController = require('./users.controller');
const usersLoggerMiddleware = require('../../middlewares/usersLogger.middleware'); // Middleware to log access to user routes
// Apply the logger middleware to all routes in this router
router.use(usersLoggerMiddleware);

router.get('/', usersController.getAllUsers); 

router.get('/:id', usersController.getUserById);
router.get('/email/:email', usersController.getUserByEmail);

module.exports = router;