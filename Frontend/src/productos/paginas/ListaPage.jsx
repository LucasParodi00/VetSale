import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { ButonAmarillo, ButonVerde, SectionHeader } from "../../componetes";
import { Buscador } from "../../componetes/Buscador";
import { useEffect, useRef, useState } from "react";
import { ItemProducto } from "../componentes/ItemProducto";
import { Link, useLocation } from "react-router-dom";
import { ProductoModal } from "../componentes/ProductoModal";
import { productosApi } from "../../api/productos/productosApi";

export const ListaPage = () => {

    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const mensaje = location.state?.mensaje
    const [productos, setProductos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [productoEstado, setProductoEstado] = useState(true);
    const elementRef = useRef();

    const [buscando, setBuscando] = useState(false);



    const verProducto = (producto) => {
        setProductoSeleccionado(producto);
        setOpen(true);
    }

    const productosEliminados = () => {
        const nuevoEstado = !productoEstado;
        setProductoEstado(nuevoEstado);
        setProductos([]);
        setPage(1);
        setHasMore(true);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection)
        if (observer && elementRef.current) {
            observer.observe(elementRef.current);
        }
        return () => {
            if (observer) {
                observer.disconnect();
            }
        }
    }, [page, productoEstado]);

    const onIntersection = (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && hasMore) {
            moreItems();
        }
    }

    async function moreItems() {
        setTimeout(async () => {
            const { data } = await productosApi.get(`/producto?limite=15&pagina=${page}&v_estado=${productoEstado}`)
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setProductos([...productos, ...data]);
                setPage(page + 1);
            }
        }, 700)
    };

    const buscarProducto = async (e) => {
        if (e.target.value === '') {
            setBuscando(false);
            setProductos([]);
            setPage(1);
            setHasMore(true);
        } else {
            setBuscando(true);
            const param = encodeURIComponent(e.target.value);
            console.log(param);
            try {
                const { data } = await productosApi.get(`/producto?param=${param}&v_estado=${productoEstado}`)
                setProductos(data);
                console.log(data);
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <Container>
                {mensaje && <Typography variant="h3"> {mensaje} </Typography>}
                <SectionHeader>
                    <Buscador parametro='un producto' onChange={buscarProducto} />
                    <Box component='div' display={'flex'} gap={2}>
                        <Link to={'nuevo'}> <ButonVerde> Nuevo Producto </ButonVerde> </Link>
                        <ButonAmarillo onClick={productosEliminados}> {productoEstado ? 'Eliminados' : 'Activos'} </ButonAmarillo>
                    </Box>
                </SectionHeader>
                <div className="scroll">
                    {
                        productos.map((p) => {
                            return <ItemProducto key={p.codProducto} productos={p} verProducto={verProducto} productoEstado={productoEstado} />
                        })
                    }
                    {(hasMore && buscando != true) ? <div ref={elementRef} style={{ textAlign: 'center' }}><CircularProgress sx={{ color: 'red' }} /></div> : ''}
                    {<ProductoModal open={open} setOpen={setOpen} producto={productoSeleccionado} />}
                    {console.log(buscando)}
                </div>
            </Container>
        </>
    );
};