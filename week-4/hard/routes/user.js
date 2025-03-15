const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../database/index');
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const { username, password } = req.body
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, password: hashedPassword});
        await user.save();
        res.status(201).json({message: 'User created successfully'})
    } catch (error ){
        res.status(400).json({message: 'An error occurred', error})
    }
});

router.post('/login', async (req, res) => {
     // Implement user login logic
     const { username, password } = req.body

     try{
        const user = await User.findOne({ username })
        if(!user || (!await bcrypt.compare(password, user.password))){
            return res.status(401).json({message: 'Invalid username or password'})
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({message: 'Login successful', token})
     } catch (error){
        res.status(500).json({message: 'An error occurred during login', error})
     }
});

router.get('/todos', userMiddleware, (req, res) => {
    // Implement logic for getting todos for a user
    res.send('Fetch user todos')
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
    res.json({message: 'Logout successful'})
});

module.exports = router