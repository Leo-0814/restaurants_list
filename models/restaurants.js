const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    name_en: String,
    category: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    google_map: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    description: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('Restaurant' , restaurantSchema)