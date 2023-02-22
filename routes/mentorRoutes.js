const express = require('express');
const router = express.Router();
const { getAllMentor, postmentors, getMentorbyId, addmentor } = require('../controller/mentorController');


router.get("/getallmentors", getAllMentor)
router.post("/postmentors", postmentors)
router.post("/getmentorbyid", getMentorbyId)
router.post("/addmentor", addmentor)


module.exports = router
