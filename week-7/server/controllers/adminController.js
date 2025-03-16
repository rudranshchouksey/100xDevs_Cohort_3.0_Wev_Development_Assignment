const Admin = require('../models/Admin');
const Course = require('../models/Course');
const generateToken = require('../utils/jwt');

exports.signup = async (req, res) => {
    const { username, password } = req.body
    const admin = new Admin({ username, password })
    await admin.save()
    const token = generateToken(admin)
    res.json({ message: 'Admin created successfully', token })
}

exports.login = async (req, res) => {
    const { username, password } = req.headers
    const admin = await Admin.findOne({ username, password })
    if(admin) {
        const token = generateToken(admin)
        res.json({ message: 'Logged in successfully', token })
    } else {
        res.status(403).json({ messgae: "Admin authentication failed" })
    }
}

exports.createCourse = async (req, res) => {
    const course = new Course(req.body)
    await course.save()
    res.json({ message: "Course created successfully", courseId: course._id})
}

exports.updateCourse = async (req, res) => {
    const courseId = req.params.courseId
    await Course.findByAndUpdate(courseId, req.body)
    res.json({ message: "Course updated successfully" })
}

exports.getCourse = async (req, res) => {
    const courses = await Course.find({})
    res.json({ courses })
}