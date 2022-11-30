const express = require('express');
const orderSchema = require('../models/order.js');
const router = express.Router();
const cors = require('cors');

router.use(cors({
    origin: 'http://192.168.20.22:3000' //Poner IP de cada PC, esta sale cuando se corre el Front
}))


router.get('/orders',(req,res) =>{
    console.log(req)
    orderSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
})

router.post("/orders",(req,res) => {
    const order = orderSchema(req.body);
    order
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;