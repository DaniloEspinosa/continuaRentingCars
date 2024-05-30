import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Funciona el router')
})

export default router