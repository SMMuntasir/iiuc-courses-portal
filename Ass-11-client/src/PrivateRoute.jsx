import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './Auth/AuthContext';

const PrivateRoute = ({children}) => {
    const navigate=useNavigate();
    const {user,loading}=useContext(AuthContext);
    const location =useLocation();

    if(loading){
        return <div className='flex justify-center my-52'><span className="loading loading-spinner loading-lg  "></span></div>;
    }
    if(user){
        return children;
    }
    return <Navigate state={location} to='/login'></Navigate>
        
    
};

export default PrivateRoute;