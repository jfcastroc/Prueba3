const express = require('express');
const orderSchema = require('../models/order.js');
const router = express.Router();
const cors = require('cors');

router.use(cors({
    origin: 'http://192.168.1.5:3000'
}))


router.get('/orders',(req,res) =>{
    console.log(req)
    orderSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message:error}));
})

module.exports = router;