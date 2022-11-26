import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import Nav from '../shared/Nav';

const DashboardLayout = () => {

    const { user } = useContext(AuthContext);

    return (
        <div>
            <Nav></Nav>
            <div className="drawer drawer-mobile">

                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content flex flex-col">
                    <Outlet></Outlet>
                </div>

                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                    <ul className="menu p-4 w-full  text-black">
                        <li><Link to='/dashboard'>My Appointments</Link></li>
                        {
                            
                            <>
                                <li><Link to='/dashboard/users'>All Users</Link></li>
                                <li><Link to='/dashboard/adddoctor'>All Doctor</Link></li>
                                <li><Link to='/dashboard/managedoctors'>Manage Doctors</Link></li>
                            </>
                        }
                    </ul>
                
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;