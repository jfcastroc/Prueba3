const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const bodyParser = require('body-parser');

const port = process.env.PORT || 9000;
const userRouters = require('./routes/users');
const orderRouters = require('./routes/orders');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Inicio');
});

app.get('/', (req, res) =>{
    res.send('Hola desarrollador');
});

//Conexion a la base de datos
mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log('conectado a la base de datos'))
    .catch((error)=>console.error(error));

app.use(express.json());
app.use('/api', userRouters)
app.use('/api', orderRouters)
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.listen(port,() => {
    console.log('server listening on port', port)
})