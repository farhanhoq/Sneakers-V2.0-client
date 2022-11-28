import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useRole from '../hooks/useRole';
import Loading from '../shared/Loading';

const SellerRoute = ({children}) => {
    
    const { user, loading } = useContext(AuthContext);
    const [isRole, isRoleLoading] = useRole(user?.email);
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <Loading></Loading>
    }

    if (user && isRole === "Seller") {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default SellerRoute;