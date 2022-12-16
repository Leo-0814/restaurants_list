const mongoose = require('mongoose')
const Restaurant = require('../restaurants')
const restaurantsList = require('../../restaurant.json')

mongoose.connect('mongodb://127.0.0.1:27017/restaurant-list')
const db = mongoose.connection

db.on('error' , () => {
    console.log('db error')
})

db.once('open' , () => {
    console.log('db connect')
    for(let i = 0; i < restaurantsList.results.length; i++){
        Restaurant.create(restaurantsList.results[i])
    }
})