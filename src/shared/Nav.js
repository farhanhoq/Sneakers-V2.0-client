import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useRole from '../hooks/useRole';

const Nav = () => {

    const { user, setUser, logOut } = useContext(AuthContext);
    const [isRole] = useRole(user?.email);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {})
            .catch(err => console.error(err))
    }

    const menuItems = (
        <React.Fragment>
            <li><Link to="">Home</Link></li>
                    
            <li><Link to="/blogs">Blogs</Link></li>
            {
            user?.uid ?
                <>
                    <li tabIndex={0}>
                        <Link to="">Dashboard<svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg></Link>
                        <ul className="p-2 bg-red-600">
                            {
                            isRole === "Seller" && 
                                <>
                                    <li><Link to="/addproduct">Add a product</Link></li>
                                    <li><Link to="/myproducts">My Products</Link></li>
                                    <li><Link to="/mybuyers">My Buyers</Link></li>
                                </>
                            }
                            {
                            isRole === "Buyer" && 
                                <li><Link to="/myorders">My Orders</Link></li>
                            }
                            {
                            isRole === "Admin" && 
                                <>
                                <li><Link to="/allbuyers">All Buyers</Link></li>
                                <li><Link to="/allsellers">All Sellers</Link></li>
                                <li><Link to="/reporteditems">Reported Items</Link></li>
                                </>
                            }
                        </ul>
                    </li>
                    <li><Link className="btn btn-secondary bg-red-600" to='/login' onClick={handleLogOut}>Log Out</Link></li>
                </>
                :
                <li><Link className="btn btn-secondary bg-red-600" to='/login'>Login</Link></li>
                    }
        </React.Fragment>
        );

    return (
        <div className="navbar bg-base-100 flex justify-between mb-10">
            <div className="navbar-start">
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                    />
                </svg>
                </label>
                <ul
                tabIndex={1}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                {menuItems}
                </ul>
            </div>
            <Link to='/' className="btn btn-ghost normal-case text-4xl font-bold text-red-600">Sneakers v2.0</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default Nav;