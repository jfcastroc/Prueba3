const express = require('express');
const orderSchema = require('../models/order.js');
const router = express.Router();
const cors = require('cors');
const config = require('../configs/config');
const jwt = require('jsonwebtoken');

router.use(cors({
    origin: 'http://localhost:3000' //Poner IP de cada PC, esta sale cuando se corre el Front
}))

const verifyToken = (req, res, next) => {
    const token = req.header('x-access-token');
    if (token) {
      jwt.verify(token, config.llave, (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 };

router.post('/orders/id', verifyToken,(req,res) =>{
    orderSchema.findById(req.body.id)
    .then((data) =>{
        res.json(data)
    })
    .catch((error) => res.json({message:error}));;
})

router.post('/orders/update', verifyToken,(req,res) =>{
    orderSchema.updateOne(req.body)
    .then((data) =>{
        console.log(data)
        res.json(data)
    })
    .catch((error) => res.json({message:error}));;
})

router.post("/orders", verifyToken,(req,res) => {
    const order = orderSchema(req.body);
    order
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

router.get('/orders', verifyToken,(req,res) =>{
    orderSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
})

module.exports = router;