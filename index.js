const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const expressFileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const path = require('path')
const jwt = require('jsonwebtoken')
const { nuevoUsuario } = require('./consultas')

// Middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressFileUpload({
    limits: 5000000,
    abortOnLimit: true,
    responseOnLimit: 'El tamaño de la imagen supera el límite permitido'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine(
    'handlebars',
    exphbs.engine({
        defaultLayout: 'Main', // preguntar
        layoutsDir: path.join(__dirname, 'views'),
        partialsDir: path.join(__dirname, 'views/layouts'),
    }))
app.set('view engine', 'handlebars')

// Rutas
app.get('/', function (req, res) {
    res.render('index')
})
app.get('/Registro', function (req, res) {
    res.render('Registro')
})
app.get('/Datos', function (req, res) {
    res.render('Datos')
})
app.get('/Login', function (req, res) {
    res.render('Login')
})

app.post('/Registro', async (req, res) => {
    res.render('Registro') 
})











app.listen(3000, () => console.log('Server started at http://localhost:3000'))