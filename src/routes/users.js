const express = require('express');
const userSchema = require('../models/user.js');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const config = require('../configs/config');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use(cors({
    origin: 'http://localhost:3000' //Poner IP de cada PC 
}))

router.post('/users',(req,res) =>{
    const user = userSchema(req.body);
    userSchema.find({email : user.email})
    .then((data) =>{
        if(data.length === 0){
            user.save()
            .then((data) => res.json(data))
            .catch((error) => res.json({message:error}));
        }else{
            res.json({message:'el usuario con el email ingresado ya existe.'})
        }
    });
});

router.post('/users/login',(req,res) =>{
    const user = userSchema(req.body);
    userSchema.find({email : user.email})
    .then((data) =>{
        if(data.length === 0){
            res.json({message:'No hay ningún usuario registrado con el email dado.'})
        }else{
            bcrypt.compare(user.password, data[0].password, (err, data) => {
                const payload = {
                    check:  true
                };
                const token = jwt.sign(payload, config.llave, { expiresIn: 1440});
                if (err) {
                    return res.json({message:'Ocurrio un error.'})
                }
                else if (data) {
                    return res.status(200).json({ mensaje: 'Autenticación correcta', token: token })
                } else {
                    return res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" })
                }
            })
        }
    });
});

module.exports = router;