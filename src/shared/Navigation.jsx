import { NavLink } from 'react-router';
import { useAuth } from '../contexts/AuthContext';


function Navigation() {
    const { isAuthenticated } = useAuth();

   const navlinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors px-3 py-1.5 rounded-md ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-slate-300 hover:text-white hover:bg-slate-700'
    }`;

    return (
        <nav>
            <ul
                className="flex items-center gap-1 list-none p-0 m-0"
            >
                
                <li>
                    <NavLink to="/about" className={navlinkClass}>
                        About
                    </NavLink>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <NavLink to="/todos" className={navlinkClass}>
                                Todos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" className={navlinkClass}>
                                Profile
                            </NavLink>
                        </li>
                    </>
                ):(
                    <li>
                            <NavLink to="/login" className={navlinkClass}>
                                Login
                            </NavLink>
                     </li>

                )}
            </ul>
        </nav>
    )
    
}

export default Navigation;