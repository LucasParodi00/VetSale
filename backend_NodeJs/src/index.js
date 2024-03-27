//express permite hacer un server con node js de manera sencilla 
const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');

//instancia de express  
const app = express();
app.set("port", 4000);

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

app.use('/producto', productosRouter);
app.use('/usuario', usersRouter);


app.listen(app.get("port"), () => {
    console.log("RUN... PUERTO: " + app.get("port"));
});


