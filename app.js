const express = require('express')
const app = express()
const restaurantsList = require('./restaurant.json')
const port = 3000

const {engine} = require('express-handlebars')

app.engine('handlebars' , engine({defaultLayout : 'main'}))
app.set('view engine' , 'handlebars')

app.use(express.static('public'))

app.get('/' , (req , res) => {
    res.render('index' , {restaurants : restaurantsList.results})
})

app.get('/search' , (req , res) => {
    const restaurants = restaurantsList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
    const keyword = req.query.keyword
    res.render('index' , {restaurants , keyword})
})

app.get('/restaurants/:restaurant_id' , (req , res) => {
    const restaurant = restaurantsList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show' , {restaurant})
})

app.listen(port , () => {
    console.log(`URL is http://localhost:${port}`)
})