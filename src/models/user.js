const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: true
    },
    tipoIdentificacion:{
        type:String,
        required:true
    },
    numeroIdentificacion:{
        type:Number,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    salt:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model("user", userSchema);