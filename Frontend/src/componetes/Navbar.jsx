import { Home, List, Person, ShoppingCart } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";



export const Navbar = () => {
    return (
        <div className='contenedorNav'>
            <nav className='navbar'>
                <Link
                    className='navItem'
                    to='/ventas' 
                >
                    VetSale <Home />
                </Link>
                <div className='navSecciones'>
                    <NavLink 
                        className='navItem'
                        to='/productos'
                        >
                        Productos <List />
                    </NavLink>

                    <NavLink
                        className='navItem'
                        to='/compras'
                    >
                        Compras <ShoppingCart />
                    </NavLink>

                    <NavLink
                        className='navItem'
                        to='/usuarios'
                    >
                        Usuarios <Person />
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