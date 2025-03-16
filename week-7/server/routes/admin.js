const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticateJwt = require('../middlewares/auth');

router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.post('/courses', authenticateJwt, adminController.createCourse);
router.put('/courses/:courseId', authenticateJwt, adminController.updateCourse);
router.get('/courses', authenticateJwt, adminController.getCourses);

module.exports = router;