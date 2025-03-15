const jwt = require('jsonwebtoken');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    const token = req.headers['authorization']
    if(!token) return res.status(401).json({message: 'Access denied. No token provided. '})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err){
        res.status(400).json({message: 'Invalid token'})
    }   
}

module.exports = userMiddleware;