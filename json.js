import fs from 'fs'

let data = fs.readFileSync('vehicles.json')

// console.log(data)

let vehiculos = JSON.parse(data)

console.log(vehiculos)