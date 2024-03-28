import { Link } from "react-router-dom";





export const ButtonComponent = ({nombre, color, ruta = ''}) => {
    const p = color.charAt(0).toUpperCase() + color.slice(1)
    return (
        <>
            <Link to={`/${ruta}`}>
                <button className={`btn btn${p}`} >
                    
                    {nombre}
                </button>
            </Link>
        </>
    );
};