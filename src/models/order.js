const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    fecha:{
        type:Date,
        required: true
    },
    hora:{
        type:String,
        required:true
    },
    ancho:{
        type:Number,
        required:true
    },
    largo:{
        type: Number,
        required:true
    },
    alto:{
        type: Number,
        required:true
    },
    peso:{
        type: Number,
        required:true
    },
    direccionRecogida:{
        type: String,
        required:true
    },
    ciudadRecogida:{
        type: String,
        required:true
    },
    nombreDestinatario:{
        type: String,
        required:true
    },
    numIdentificacionDestinatario:{
        type: String,
        required:true
    },
    direccionEntrega:{
        type: String,
        required:true
    },
    ciudadEntrega:{
        type: String,
        required:true
    },
    estado:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model("order", orderSchema);