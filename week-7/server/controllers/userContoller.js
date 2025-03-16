const User = require('../models/User');
const Course = require('../models/Course');
const generateToken = require('../utils/jwt');

exports.signup = async (req, res) => {
    const { username, password } = req.body
    const user = new User({ username, password })
    await user.save()
    const token = generateToken(user)
    res.json({ message: "User created successfully", token })
}

exports.login = async (req, res) => {
    const { username, password } = req.headers
    const user = await User.findOne({ username, password })
    if(user){
        const token = generateToken(user)
        res.json({ message: "Logged in successfully ", token })
    } else {
        res.status(403).json({ message: 'User authentication failed' })
    }
}

exports.getCourses = async (req, res) => {
    const courses = await Course.find(req.params.courseId)
    if(!courses) {
        return res.status(404).json({ message: "Course not found" })
    }
}

exports.purchaseCourse = async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
  
    const user = await User.findById(req.user.id);
    user.purchasedCourses.push(course);
    await user.save();
  
    res.json({ message: 'Course purchased successfully' });
};

exports.getPurchasedCourses = async (req, res) => {
    const user = await User.fingById(req.user.id).populate('purchasedCourses')
    res.json({ purchasedCourses: user.purchasedCourses })
}