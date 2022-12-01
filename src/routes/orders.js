const express = require('express');
const orderSchema = require('../models/order.js');
const router = express.Router();
const cors = require('cors');
var moment = require('moment');

router.use(cors({
    origin: 'http://192.168.3.105:3000'
}))


router.get('/orders',(req,res) =>{
    orderSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
})

router.post('/orders',(req,res) =>{
    orderSchema.findById(req.body.id)
    .then((data) =>{
        res.json(data)
    })
    .catch((error) => res.json({message:error}));;
})

router.post('/orders/update',(req,res) =>{
    const temp = req.body;
    console.log(temp)
    orderSchema.updateOne(req.body)
    .then((data) =>{
        console.log(data)
        res.json(data)
    })
    .catch((error) => res.json({message:error}));;
})

module.exports = router;