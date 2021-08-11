const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    return res.json({
        code: 200,
        msg: 'success'
    })
})

router.post('/user/addUser', async (req, res) => {
    
})