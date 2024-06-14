import express from 'express'
import mysql from 'mysql'
import path from 'path'

// Configurando la conexion a la base de datos
const configConnection = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}
const connection = mysql.createConnection(configConnection)

const router3000 = express.Router()
const router4000 = express.Router()
const menu = menuNav()


// --------------------------------- TODAS LAS RUTAS PUERTO 3000 --------------------------------


// La ruta raiz
router3000.get('/', (req, res) => {
    res.render('index', { title: 'Rental Car', h1: 'Danilo Rental car', menu })
    // res.send('Funciona la raiz')
})

// Ruta para ver los vehiculos disponibles según tipo (con el params)
router3000.get('/:vehiculo', (req, res) => {
    const { vehiculo } = req.params
    const selectTipo = `SELECT * FROM modelos WHERE tipo = '${vehiculo}'`

    connection.query(selectTipo, (err, result) => {
        let cards = []
        result.forEach(item => {
            let card = {
                nombre: item.nombre_modelo,
                personas: item.personas,
                puertas: item.puertas,
                matetas: item.maletas,
                precio: item.precioDia,
                tipo: item.tipo,
                id: item.id_modelo
            }
            cards.push(card)
        })
        if (err) throw err
        res.render('vehiculo', { title: vehiculo, h1: 'Danilo Rental car', cards, menu })
    })
    // res.send('Funciona el router con params')
})

// Ruta para ver un vehiculo especifico (con el params)
router3000.get('/:vehiculo/:id', (req, res) => {
    const { vehiculo } = req.params
    const { id } = req.params
    const selectCard = `SELECT * FROM modelos WHERE id_modelo = '${id}'`

    connection.query(selectCard, (err, result) => {
        result = result[0]
        if (err) throw err
        res.render('card', { title: vehiculo, h1: 'Danilo Rental car', card: result, menu })
    })
    // res.send('Funciona el router con params')
})

router3000.get('/:vehiculo/:id/reservar', (req, res) => {
    const id = req.params.id
    const selectVehiculo = `SELECT * FROM modelos WHERE id_modelo = ${id}`

    connection.query(selectVehiculo, (err, result) => {
        if (err) throw err
        res.render('reservar', { title: 'Rental Car', h1: 'Danilo Rental car', menu, result })
    })

    // res.send('Funciona la raiz')
})

// Router intermedio para comprobar si existe o no el dni del cliente
router3000.post('/comprobar', (req, res) => {
    const dni = req.body.dni
    const id = req.body.id_modelo
    const select = `SELECT * FROM clientes WHERE dni = '${dni}'`
    connection.query(select, (err, result) => {

        if (err) throw err

        if (result.length === 1) {
            const cliente = result[0]

            const selectVehiculo = `SELECT * FROM modelos WHERE id_modelo = ${id}`
            connection.query(selectVehiculo, (err, result) => {
                if (err) throw err
                res.render('alquilar', { title: 'Rental Car', h1: 'Danilo Rental car', menu, result: result[0], cliente })
            })

        } else {
            res.render('nuevoCliente', {
                title: 'Rental Car', h1: 'Danilo Rental car', menu,
                mensaje: 'Su dni no figura en los clientes actuales, por favor complete sus datos.'
            })

        }
    })
    // res.send('Funciona comprobar')
})

// Ruta que agrega el nuevo cliente si el dni no se encuentra en los clientes
router3000.post('/nuevocliente', (req, res) => {
    const { nombre, apellido, dni, tel, email, poblacio, password, password2 } = req.body
    if (password === password2) {
        const insert = `
    INSERT INTO clientes (nombre, apellido, dni, tel, email, poblacio, password)
    VALUES ('${nombre}', '${apellido}', '${dni}', '${tel}', '${email}', '${poblacio}', '${password}')`
        connection.query(insert, (err, result, fields) => {
            if (err) throw err
            res.redirect('/')
        })
    } else {
        res.render('nuevoCliente', {
            title: 'Rental Car', h1: 'Danilo Rental car', menu,
            mensaje: 'Los password no coinciden, vuelva a intentarlo'
        })
    }

    // res.send('Funciona nuevo cliente')
})

// Ruta alquilar vehiculo
router3000.post('/alquilarVehiculo', (req, res) => {
    const respuesta = req.body

    const id_cliente = respuesta.id_cliente
    const id_modelo = respuesta.id_modelo
    const recogida = respuesta.fecha_recogida
    const entrega = respuesta.fecha_entrega
    const dias = calcularDias(entrega, recogida)
    const precioDia = respuesta.precioDia
    const facturacion = precioDia * dias
    const alquiladas = respuesta.unidades_alquiladas

    const insert = `INSERT INTO alquileres
    (id_cliente, id_modelo, fecha_recogida, fecha_entrega, facturacion)
    values(${id_cliente}, ${id_modelo}, '${recogida}', '${entrega}', ${facturacion})`

    const update = `UPDATE modelos SET unidades_alquiladas = '${parseInt(alquiladas) + 1}' WHERE id_modelo = '${id_modelo}'`

    connection.query(insert, (err, result) => {
        if (err) throw err
    })
    connection.query(update, (err, result) => {
        if (err) throw err
    })
    
    res.render('alquilerExitoso', { title: 'Rental Car', h1: 'Danilo Rental car', menu })

    // res.send('Funciona alquilar vehiculo')
})

// --------------------------------- TODAS LAS RUTAS PUERTO 4000 --------------------------------

// Ruta para la parte privada, muestra la tabla de vehiculos existentes
router4000.get('/', (req, res) => {
    const selectFacturacion =
        'SELECT facturacion, mo.id_modelo FROM alquileres al INNER JOIN modelos mo ON al.id_modelo = mo.id_modelo'
    let resultFacturacion
    //Obtener la facturacion segun el id del modelo
    connection.query(selectFacturacion, (err, result, fields) => {
        resultFacturacion = result
        if (err) throw err
    })

    const select = 'SELECT * FROM modelos'
    connection.query(select, (err, result) => {
        // Agregando la factuacion de cada vehiculo segun su id
        result.forEach(item => {
            item.facturacion = 0
            resultFacturacion.forEach(fact => {
                if (item.id_modelo == fact.id_modelo) {
                    item.facturacion += fact.facturacion
                }
            })
        })

        if (err) throw err
        res.render('private', { title: 'Rental Car', h1: 'Rental car', vehiculos: result })
    })
    // res.send('Funciona el private')
})

// Ruta para ver el stock disponible, parte privada
router4000.get('/stock', (req, res) => {
    const select = 'SELECT * FROM modelos'
    connection.query(select, (err, result) => {
        if (err) throw err
        res.render('stock', { title: 'Rental Car', h1: 'Rental car', vehiculos: result })
    })
    //res.send('Funciona el stock')
})

// Ruta para acceder al formulario
router4000.get('/formulario', (req, res) => {
    res.render('formulario', { title: 'Añadir vehiculo', id: 0 })
    // res.send('Funciona el formulario')
})

// Ruta para agregar nuevos vehiculos
router4000.post('/insert', (req, res) => {
    const { nombre, unidades_totales, unidades_alquiladas, personas, puertas, cambio, maletas, tipo, precioDia } = req.body
    const insert = `
    INSERT INTO modelos (nombre_modelo, unidades_totales, unidades_alquiladas, personas, puertas, cambio, maletas, tipo, precioDia)
    VALUES ('${nombre}', '${unidades_totales}', '${unidades_alquiladas}', '${personas}', '${puertas}', '${cambio}', '${maletas}', '${tipo}', '${precioDia}')`
    connection.query(insert, (err, result, fields) => {
        if (err) throw err
        res.redirect('/')
    })
    // console.log(req.body)

})

// Ruta para la edición
router4000.get('/editar/:id', (req, res) => {
    const id = req.params.id
    const select = `SELECT * FROM modelos WHERE id_modelo = '${id}'`
    connection.query(select, (err, results) => {
        // console.log(results)
        if (err) throw err
        if (results.length === 1) {
            res.render('formulario', { title: 'Actualizar vehiculo', results: results[0], id })
        } else {
            res.send(`No existe el id: ${id} <a href="/private" class="btn btn-primary" role="button" aria-disabled="true">Inicio</a>`)
        }
    })
    // res.send(`Funciona el editar ${id}`)
})

// Hacer la actualizacion de los datos
router4000.post('/update', (req, res) => {
    const { nombre, unidades_totales, unidades_alquiladas, personas, puertas, cambio, maletas, tipo, precioDia, id_modelo } = req.body
    const update = `
    UPDATE modelos SET
    nombre_modelo = '${nombre}',
    unidades_totales = '${unidades_totales}',
    unidades_alquiladas = '${unidades_alquiladas}',
    personas = '${personas}',
    puertas = '${puertas}',
    cambio = '${cambio}',
    maletas = '${maletas}',
    tipo = '${tipo}',
    precioDia = '${precioDia}'
    WHERE id_modelo = '${id_modelo}'
    `
    connection.query(update, (err, result, fields) => {
        if (err) throw err
        res.redirect('/')
    })
})

// Borrar el elemento seleccionado
router4000.get('/borrar/:id', (req, res) => {
    const { id } = req.params
    const borrarLinea = `DELETE FROM modelos WHERE id_modelo = ${id}`
    connection.query(borrarLinea, (err, result, fields) => {
        if (err) throw err
        res.redirect('/')
    })
})


function menuNav() {
    const select = 'SELECT * FROM modelos'
    let menu = []
    connection.query(select, (err, result) => {
        result.forEach(item => {
            if (!menu.includes(item.tipo) && item.unidades_totales - item.unidades_alquiladas > 0) {
                menu.push(item.tipo)
            }
        })
        if (err) throw err
    })
    return menu
}

function calcularDias(fechaEntrega, fechaRecogida) {
    let dateRecogida = new Date(fechaRecogida)
    let dateEntrega = new Date(fechaEntrega)

    let diferencia = dateEntrega - dateRecogida

    let diferenciaDias = diferencia / (1000 * 60 * 60 * 24);

    return Math.abs(diferenciaDias)
}


// Exportacion de los routerExpress
export { router3000, router4000 }