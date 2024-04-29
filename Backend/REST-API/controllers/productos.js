



const { matchedData } = require('express-validator');
const { producto, categoria, tamanio } = require('../models/index');
const manejadorErrores = require('../utils/manejadorErrores');
const Categoria = require('../models/categoria');
const Tamanio = require('../models/tamanio');
const Producto = require('../models/producto');
const ProductoEdad = require('../models/productoEdad');
const ProductoMascota = require('../models/productoMascota');
const { where } = require('sequelize');

const getProductos = async (req, res) => {
    try {
        const { pagina, limite, v_estado } = req.query;
        console.log('parametros: ', req.query);
        const estado = v_estado === 'true' ? true : false;
        const offset = (parseInt(pagina) - 1) * limite;
        console.log('pagina: ', pagina, 'limite: ', limite, 'offset: ', offset, 'estado: ', v_estado);
        const productos = await Producto.findAllData({
            offset,
            limit: parseInt(limite),
            estado
        });
        res.json(productos);
    } catch (e) {
        console.log(e);
        manejadorErrores(res, `Ocurrio un error aca: ${e}`);
    }
};

const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('codProducto: ', id);
        const data = await Producto.findProductData({
            where: { codProducto: id }
        });
        res.send(data);
    } catch (e) {
        manejadorErrores(res, `Ocurrio un error al buscar el producto: ${e}`);
    }
}

const setProductos = async (req, res) => {
    try {
        //Implementar cuando tenga todas las validaciones 
        //const body = matchedData(req);
        const { body, file } = req;
        const { codEdades, codMascotas } = body;
        // console.log('file: ', file);

        // const fileData = {
        //     fileName: file.filename,
        //     url: `${PUBLIC_URL}/${file.filename}`
        // }

        // console.log('Informacion de la imagen: ', file);

        // const imagenData = await store.create(fileData); // Imagen

        // console.log('Informacion de la imagen post agregacion: ', imagenData);

        // const productoData = { ...body, imagen: imagenData.url }
        console.log(body);
        const productoCreado = await producto.create(body); // Informacion del producto

        await Promise.all(codEdades.map(async (codEdad) => {
            await ProductoEdad.create({ codProducto: productoCreado.codProducto, codEdad }); // Informacion de las edades
        }));

        await Promise.all(codMascotas.map(async (codMascota) => {
            await ProductoMascota.create({ codProducto: productoCreado.codProducto, codMascota }); // Informacion de las mascotas
        }));

        res.send({ message: `Producto creado correctamente.` });

    } catch (e) {
        manejadorErrores(res, `Ocurrio un error al cargar el producto: ${e}`);
        console.log('error al cargar el producto' + e);
    }
};


const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        console.log('Codigo del producto: ', id, 'Datos: ', body);
        await ProductoEdad.destroy({ where: { codProducto: id } })
        await ProductoMascota.destroy({ where: { codProducto: id } })

        await producto.update(body, { where: { codProducto: id } });

        await Promise.all(body.codEdades.map(async (codEdad) => {
            await ProductoEdad.create({ codProducto: body.codProducto, codEdad });
        }));

        await Promise.all(body.codMascotas.map(async (codMascota) => {
            await ProductoMascota.create({ codProducto: body.codProducto, codMascota });
        }));
        res.send({ message: `El producto ${id} se actualizo correctamente.` });
    } catch (error) {
        manejadorErrores(res, `Ocurrio un error al actualizar el producto: ${error}`)
    }
}

const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Producto a eliminar: ', id);
        const { estado, ...data } = await producto.findByPk(id);
        if (estado === true) {
            await producto.update({ estado: false }, { where: { codProducto: id } });
            res.send({ data });
        } else {
            await producto.update({ estado: true }, { where: { codProducto: id } });
            res.send({ data });
        }
    } catch (error) {
        manejadorErrores(res, 'Ocurrio un error al eliminar el producto')
    }
}





module.exports = { getProductos, setProductos, getProducto, updateProducto, deleteProducto };