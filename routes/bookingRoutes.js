const express = require('express');
const { bookMentor, cancle, bookingByUserId } = require('../controller/bookingController');
const router = express.Router();

router.post("/bookmen", bookMentor)
router.post("/bookingbyuserid", bookingByUserId)
router.post("/cancle", cancle)

module.exports = router