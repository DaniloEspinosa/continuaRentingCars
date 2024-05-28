// Cargar los módulos (agregamos el type:modules para utilizar la nueva sintaxis)
import express from 'express'
// const express = require('express')  --- Esta es la otra sintaxis

import bodyParser from 'body-parser'

import router from './router.js'

// La constante que lanza la aplicación
const app = express()

// Crear la variable para el puerto
const PORT = process.env.PORT
// process.env.PORT es para utilizar las variables de entorno

// Determinar motor de plantillas
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Indicar cual es la carpeta de los ficheros estáticos
app.use(express.static('public'))
// Ahora indicar las rutas
app.use(router)



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})