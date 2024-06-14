// Cargar los módulos (agregamos el type:modules para utilizar la nueva sintaxis)
import express from 'express'
import bodyParser from 'body-parser'
import mysql from 'mysql'
import path from 'path'
import { router3000, router4000 } from './router.js'

// La constante que lanza la aplicación
const app = express()
// Crear la variable para el puerto
const PORT = process.argv[2]

// Determinar motor de plantillas
app.set('view engine', 'ejs')
// Analizar y manejar datos tipo JSON
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Indicar la carpeta de los ficheros estáticos
app.use(express.static('public'))

if (PORT === '3000') {
    // Usaremos las rutas importadas desde router 3000 (parte publica)
    app.use(router3000)
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })

} else if (PORT === '4000') {
    app.use(router4000)
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`)
    })
} else {
    console.log(`El puerto ${PORT} no esta disponible,
    ejecutar:
    node --env-file .env --watch .\app.js PUERTO
    Reemplazar PUERTO por 3000 (Publico)
    Reemplazar PUERTO por 4000 (Privado)`)
}

