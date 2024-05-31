
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ventasRouter = require('./routes/ventas');
const tipoPagoRoutes = require('./routes/tipoPagos');
const comprasRoutes = require('./routes/compras');

const app = express();
const port = process.env.PORT || 3000;




app.use(cors());
app.use(express.json());
app.use(express.static('storage'));
app.use('/venta', ventasRouter); 
app.use('/', require('./routes'));
app.use('/tipoPago', tipoPagoRoutes);
app.use('/compra', comprasRoutes);

app.listen(port, () => {
    console.log(`API_REST corriendo en el puerto:  ${port}`);
});






