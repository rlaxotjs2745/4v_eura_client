import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const navigate = useNavigate();

    function get_cookie(name) {
        let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    }

    return get_cookie('user_id') !== null ? <Navigate to='/'/> : children;
};

export default PublicRoute;