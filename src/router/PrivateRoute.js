import React from 'react';
import {Navigate} from 'react-router-dom';

const PrivateRoute = ({ children }) => {
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