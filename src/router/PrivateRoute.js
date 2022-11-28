import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const navigate = useNavigate()

    function get_cookie(name) {
        let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        if(value){
            return value[2];
        }
        return null;
    }

    return get_cookie('user_id') == null ? <Navigate to='/login'/> : children;
};

export default PrivateRoute;