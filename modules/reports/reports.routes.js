const express = require('express');
const router = express.Router();
const reportsController = require('./reports.controller');
const reportsLoggerMiddleware = require('../../middlewares/reports.middleware');
// Apply the logger middleware to all routes in this router
router.use(reportsLoggerMiddleware);
//Level 1 Assignment
router.get('/avg-users-order-value', reportsController.getAvgUsersOrderValue);
//Level 2 Assignment
router.get('/category-revenues', reportsController.getCategoriesTotalRevenue)

module.exports = router;