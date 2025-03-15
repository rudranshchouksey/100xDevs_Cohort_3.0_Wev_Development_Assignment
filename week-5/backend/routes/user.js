//  start writing your code from here
const express = require("express")
const jwt = require("jsonwebtoken")
const { authenticateJwt, SECRET } = require("../middleware/user");
const { User } = require("../db");
const router = express.Router()

router.post("/signup", async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await user.findOne({ username })
        if(user){
            return res.status(403).json({message: "User already exists"})
        }

        const newUser = new User({ username, password })
        await newUser.save()

        const token = jwt.sign({userId: newUser._id}, SECRET, {expiresIn: '1h'} )
        res.json({message: "User Created Successfully", token})

    } catch(error) {
        res.status(500).json({ message: "Error creating user", error })
    }
})

router.post("/signin", async (req, res ) => {
    const { username, password } = req.body
    try {
        const user = await user.findOne({username, password})
        if(user){
            const token = jwt.sign({userId: user._id}, SECRET, {expiresIn: '1h'})

            res.json({message: "Logged in Successfully", token})
        } else {
            return res.status(403).json({message: "Invalid Username and password"})
        }
    } catch(error) {
        res.status(500).json({message: "Error signin user", error })
    }
})

module.exports = router;