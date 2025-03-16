const mongoose = require('mongoose')

const courseSchema = new mongoos.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
})

module.exports = mongoose.model('Course', courseSchema)