// Cargar los módulos (agregamos el type:modules para utilizar la nueva sintaxis)
import express from 'express'

import router from './router.js'

// La constante que lanza la aplicación
const app = express()

// Crear la variable para el puerto
const PORT = process.env.PORT || 3000

// Indicar la carpeta de los ficheros estáticos
app.use(express.static('public'))
app.use(router)




app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})