const express = require('express');
const userSchema = require('../models/user.js');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');

router.use(cors({
    origin: 'http://192.168.1.5:3000'
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
            const passwordForm = bcrypt.hashSync(user.password, data[0].salt);
            console.log(passwordForm);
            console.log(data[0].password);

            bcrypt.compare(user.password, data[0].password, (err, data) => {
                console.log(data);

                if (err) {
                    return res.json({message:'Ocurrio un error.'})
                }
                else if (data) {
                    return res.status(200).json({ login: "Ok" })
                } else {
                    return res.status(401).json({ message: "Invalid credencial" })
                }
            })
        }
    });
});

module.exports = router;