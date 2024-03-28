import { ContenedorLayout } from "../layout";


export const NuevoProducto = () => {
    return (
        <ContenedorLayout>
            <form className="w-100">
                <h2>Nuevo Producto</h2>
                <div className="cuerpoFormulario">
                    <div>
                        <div className="input-animado">
                            <input type="text" required />
                            <label htmlFor="">Nombre: </label>
                        </div>
                        <div className="input-animado">
                            <select name="" id="">
                                <option value="">Balanceados</option>
                                <option value="">Medicamentos</option>
                                <option value="">Accesorios</option>
                                <option value="">Juguetes</option>
                                <option value="">Otros</option>
                            </select>
                            <label htmlFor="">Categoria : </label>
                        </div>
                    </div>

                    <div>
                        <div className="input-animado">
                            <input type="text" required />
                            <label htmlFor="">Peso: </label>
                        </div>
                        <div className="input-animado">
                            <input type="text" required />
                            <label htmlFor="">Unidades: </label>
                        </div>
                        <div className="input-animado">
                            <input type="text" required />
                            <label htmlFor="">Mililitros: </label>
                        </div>
                        <div className="input-animado">
                            <select name="" id="">
                                <option value="">Grande</option>
                                <option value="">Mediano</option>
                                <option value="">Chico</option>
                            </select>
                            <label htmlFor="">Tamaño: </label>
                        </div>
                    </div>
                        
                    <div>
                        <div className="input-animado">
                            <select name="" id="" multiple>
                                <option value="">Grande</option>
                                <option value="">Mediano</option>
                                <option value="">Chico</option>
                            </select>
                            <label htmlFor="">Tamaño: </label>
                        </div>
                        <div className="input-animado">
                            <select name="" id="" multiple>
                                <option value="">Grande</option>
                                <option value="">Mediano</option>
                                <option value="">Chico</option>
                            </select>
                            <label htmlFor="">Tamaño: </label>
                        </div>
                    </div>

                    <div>
                        <div className="input-animado">
                            <input type="file" required />
                            <label htmlFor="">Mililitros: </label>
                        </div>
                        <div className="input-animado">
                            <textarea type="text" required />
                            <label htmlFor="">Mililitros: </label>
                        </div>
                    </div>
                </div>

                <button>Enviar</button>
            </form>
        </ContenedorLayout>
    );
};