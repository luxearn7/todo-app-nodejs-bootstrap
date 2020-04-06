if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Layouts = require('express-ejs-layouts')

const indexRouter = require('./routes/indexRouter')
const taskRouter = require('./routes/taskRouter')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(express.static('public'))
app.use(Layouts)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

mongoose.connect(process.env.DB_URL, { 
    useUnifiedTopology: true,
    useNewUrlParser: true 
 })
const db = mongoose.connection
db.on('error', function(error) {
    console.error(error)    
})
db.once('open', function() {
    console.log('Connect success!')    
})

//---------------------------------
app.use('/', indexRouter)
app.use('/task', taskRouter)

app.listen(process.env.PORT, function() {
    console.log('Server running...')    
})