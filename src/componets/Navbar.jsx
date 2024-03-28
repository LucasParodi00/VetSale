import { Link, NavLink } from "react-router-dom";



export const Navbar = () => {
    return (
        <div className='contenedorNav'>
            <nav className='navbar'>
                <Link
                    className='navItem'
                    to='/ventas' 
                >
                    VetSale <i className="fa-solid fa-house"></i>
                </Link>
                <div className='navSecciones'>
                    <NavLink 
                        className='navItem'
                        to='/producto'
                        >
                        Productos <i className="fa-solid fa-list"></i>
                    </NavLink>

                    <NavLink
                        className='navItem'
                        to='/compras'
                    >
                        Compras <i className="fa-solid fa-cart-shopping"></i>
                    </NavLink>

                    <NavLink
                        className='navItem'
                        to='/usuarios'
                    >
                        Usuarios <i className="fa-solid fa-user"></i>
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        className='navItem'
                        to='/ventas'
                    >
                         <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </NavLink>
                </div>
            </nav>
        </div>
    ) 
};

   