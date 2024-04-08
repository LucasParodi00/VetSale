//express permite hacer un server con node js de manera sencilla 
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require ('cors')
//instancia de express  
const app = express();
app.set("port", 4000);
app.use (cors())

//database 
const db = require('./data/database');
(async () => {
    try {
        await db.autenticate();
        await db.sync();
        console.log("conexion exitosa");
    } catch (error) {
        throw new Error("asd: ", error);
    }
});

//middlewares - script que permiter interacctuar con las consultas - app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json()); 

//TODO: RUTAS 
const productosRouter = require('./routes/productos');
const usersRouter = require('./routes/usuarios');
const authRouter = require('./routes/auth')

app.use('/producto', productosRouter);
app.use('/usuario', usersRouter);
app.use('/auth', authRouter);

app.listen(app.get("port"), () => {
    console.log("RUN... PUERTO: " + app.get("port"));
});


