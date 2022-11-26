import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const Nav = () => {

    const { user, setUser, logOut } = useContext(AuthContext);
    console.log(user)
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {})
            .catch(err => console.error(err))
    }

    const menuItems = (
        <React.Fragment>
            <li><Link to="">Home</Link></li>

                    <li tabIndex={0}>
                        <Link to="">Brands<svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg></Link>
                        <ul className="p-2 bg-red-600">
                            <li><Link to="">Nike</Link></li>
                            <li><Link to="">Addidas</Link></li>
                            <li><Link to="">Jordan</Link></li>
                        </ul>
                    </li>
                    
                    <li><Link to="">Item 3</Link></li>
                    {
                user?.uid ?
                        <>
                            <li><Link to="">Dashboard</Link></li>
                            <li><Link className="btn btn-secondary" to='/login' onClick={handleLogOut}>Log Out</Link></li>
                        </>
                        :
                        <li><Link className="btn btn-secondary" to='/login'>Login</Link></li>
                    }
        </React.Fragment>
        );

    return (
        <div className="navbar bg-base-100 mb-20">

            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">daisyUI</Link>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default Nav;