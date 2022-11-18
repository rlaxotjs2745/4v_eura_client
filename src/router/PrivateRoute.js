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
    // get_cookie('user_id') !== null ? console.log('쿠키 있다') : console.log('쿠키 없다')

    return get_cookie('user_id') == null ? navigate('/login') : children;
};

export default PrivateRoute;