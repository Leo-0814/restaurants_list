const express = require('express')
const {engine} = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurants')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://127.0.0.1:27017/restaurant-list')
const db = mongoose.connection

db.on('error' , () => {
    console.log('db error')
})

db.once('open' , () => {
    console.log('db connect')
})

const app = express()

app.engine('handlebars' , engine({defaultLayout : 'main'}))
app.set('view engine' , 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

app.get('/' , (req , res) => {
    Restaurant.find()
    .lean()
    .then(restaurants => res.render('index' , {restaurants}))
    .catch(error => console.log(error))
})

app.get('/restaurants/new' , (req , res) => {
    res.render('new')
})

app.post('/restaurants/new' , (req , res) => {
    const item = {
        name: req.body.name,
        name_en: req.body.name_en,
        category: req.body.category,
        image: req.body.image,
        location: req.body.location,
        phone: req.body.phone,
        google_map: req.body.google_map,
        rating: req.body.rating,
        description: req.body.description,
    }
    Restaurant.create({
        name: item.name,
        name_en: item.name_en,
        category: item.category,
        image: item.image,
        location: item.location,
        phone: item.phone,
        google_map: item.google_map,
        rating: item.rating,
        description: item.description,
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id' , (req , res) => {
    const id = req.params.id
    Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show' , {restaurant}))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit' , (req , res) => {
    const id = req.params.id
    Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit' , {restaurant}))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit' , (req , res) => {
    const id = req.params.id
    const item = {
        name: req.body.name,
        name_en: req.body.name_en,
        category: req.body.category,
        image: req.body.image,
        location: req.body.location,
        phone: req.body.phone,
        google_map: req.body.google_map,
        rating: req.body.rating,
        description: req.body.description,
    }
    Restaurant.findById(id)
    .then(restaurant => {
        restaurant.name = item.name
        restaurant.name_en = item.name_en
        restaurant.category = item.category
        restaurant.image = item.image
        restaurant.location = item.location
        restaurant.phone = item.phone
        restaurant.google_map = item.google_map
        restaurant.rating = item.rating
        restaurant.description = item.description
        restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete' , (req , res) => {
    const id = req.params.id
    Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// app.get('/search' , (req , res) => {
//     const restaurants = restaurantsList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
//     const keyword = req.query.keyword
//     res.render('index' , {restaurants , keyword})
// })

app.listen(3000 , () => {
    console.log(`URL is http://localhost:3000`)
})