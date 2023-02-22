const mentorModel = require('../models/mentors')

//function to get all the mentors in db
const getAllMentor = async (req, res) => {
    try {
        const mentor = await mentorModel.find();
        res.status(200).send(mentor);
    } catch (err) {
        res.send(err)
    }

}

//function to post mentor
const postmentors = async (req, res) => {
    try {
        const mentors = new mentorModel(req.body)
        await mentors.save()
        res.status(200).send(mentors);
    } catch (err) {
        res.send("err")
    }

}

//function to get a specific mentor details
const getMentorbyId = async (req, res) => {
    try {
        const mentorid = req.body.mentorid;
        const mentor = await mentorModel.findOne({ _id: mentorid })
        res.status(200).send(mentor)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

//code to add mentor in db by admin
const addmentor = async (req, res) => {
    const { men, feeperday, avldays, description, email, type, image1, image2, image3, skills, maxbooking } = req.body
    const newmentor = new mentorModel({
        name: men,
        feeperday,
        avldays,
        description,
        email,
        type,
        imageurl: [image1, image2, image3],
        currentbookings: [],
        skills: skills,
        maxbooking: maxbooking
    })
    try {
        await newmentor.save()
        res.send(newmentor)
    } catch (error) {
        return res.status(400).json({ error });
    }
};

module.exports = { getAllMentor, postmentors, getMentorbyId, addmentor }