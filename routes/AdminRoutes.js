const express = require('express');
const { getallbooking } = require('../controller/AdminController');
const router = express.Router();

router.get("/getallbookings", getallbooking)

module.exports = router