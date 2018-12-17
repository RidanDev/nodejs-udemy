const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express()

app.set('view engine', 'ejs')

//Allows me to refer to a file inside the views folder just typing its name
//i.e 404 => views/404.ejs
app.set('views', 'views')

//Parses the body making easier to access an element
//i.e req.body.title
app.use(bodyParser.urlencoded({ extended: false }))

//Forwards the request to the public folder allowing me to access the elements inside
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(shopRoutes)

app.use('/', (req, res, next) => {
    res.status(404).render("404", { pageTitle: "Page Not Found", path: '' })
})

app.listen(3000)