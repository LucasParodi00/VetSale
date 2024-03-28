

export const Buscador = ( { parametro = '' } ) => {
    return (
        <form className="formAzul formularioBuscador">
            <label htmlFor="buscador">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input className="" type="text" id="buscador" placeholder={`Buscar ${parametro}...`} />
            </label>
        </form>
    );
};