import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    function get_cookie(name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    }

    // get_cookie('user_id') !== null ? console.log('쿠키 있다') : console.log('쿠키 없다')

    return get_cookie('user_id') == null ? <Navigate to='/login' /> : children;
};

export default PrivateRoute;