const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const expressFileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const path = require('path')
const jwt = require('jsonwebtoken')
const { nuevoUsuario, getUsuarios, setUsuarioStatus, getUsuario } = require('./consultas')
const SecretKey = 'hola'

// Middlewares
app.use(express.static(path.join(__dirname, '/public')))
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use(expressFileUpload({
    limits: 5000000,
    abortOnLimit: true,
    responseOnLimit: 'El tamaño de la imagen supera el límite permitido'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine(
    'hbs',
    exphbs.engine({
        extname: 'hbs',
        defaultViews: 'main', // preguntar
        layoutsDir: path.join(__dirname, '/views/layouts/'),
        partialsDir: path.join(__dirname, '/views/partials/'),
    }))
app.set('view engine', 'hbs')


// Rutas
app.get('/', function (req, res) {
    res.render('Index', { title: 'Inicio' })
})
app.get('/Registro', function (req, res) {
    res.render('Registro')
})
app.get('/Datos', function (req, res) {
    res.render('Datos')
})
// ruta login
app.get('/Login', async (req, res) => {
    res.render('Login')
})

app.get('/Admin', async (req, res) => {
    try {
        const usuarios = await getUsuarios()
        res.render('Admin', { usuarios })
    } catch (error) {
        res.status(500).send({
            error: `Algo salio mal ${error}`,
            code: 500
        })

    }
})


// Escribe datos  faltas parametros - dudas sobre uploading file - no funciona aun...
app.post('/usuarios', async (req, res) => {
    const { email, nombre, password, anos_experiencia, especialidad } = req.body
    try {
        const data = await nuevoUsuario(email, nombre, password, anos_experiencia, especialidad)
        res.status(201).send(JSON.stringify(data))

        res.render('Registro')
    } catch (error) {
        return res.status(500).send({
            error: `Algo salio mal ... ${error}`,
            code: 500
        })

    }

})

// valida usuarios en vista admin
app.put('/Registro', async (req, res) => {
    const { id, auth } = req.body
    try {
        const usuario = await setUsuarioStatus(id, auth)
        res.status(200).send(JSON.stringify(usuario))

    } catch (error) {
        res.status(500).send({
            error: `Algo salio mal ${error}`,
            code: 500
        })

    }

})
// verficacion del login
app.post('/verify', async (req, res) => {
    const { email, password } = req.body
    const user = await getUsuario(email, password)
    if (user) {
        if (user.auth) {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 180,
                data: user,
            })
            SecretKey
        }
        res.send(token)
    } else{
        res.status(404).send({
            error:'El usuario no existe',
            code: 404
        })
    }
})











app.listen(3000, () => console.log('Server started at http://localhost:3000'))