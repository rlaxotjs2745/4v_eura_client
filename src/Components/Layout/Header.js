import {Link} from "react-router-dom";
import $ from "jquery";

import {Link, Navigate} from "react-router-dom";
import { useCookies } from 'react-cookie';
import {useNavigate} from "react-router-dom";
import React from "react";

const Header = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['id']);
    const navigate = useNavigate();

    const logOut = () => {
        removeCookie('user_id'); // 쿠키를 삭제
        navigate('/login'); // 로그인 페이지로 이동
    };

    function get_cookie(name) {
        let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    }

const Header = () => {
    const logout = () => {
        document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.location.pathname = '/login';
    }

    const profileHover = () => {
        $('#user_profile_drop').removeClass('user_profile_hide')
    }

    const profileHoverOut = () => {
        $('#user_profile_drop').addClass('user_profile_hide')
    }




    return (

        <>
            <header className="header">
                <h1><Link to="/"><img src={require('../../assets/image/h1_logo.png')} alt=""/></Link></h1>
                {get_cookie('user_id') == null ? null :
                    <div className="user__box">
                        <a href="#none" className="user__hover"><strong>강채연</strong>님</a>
                        <div className="user__anchor">
                            <ul>
                                <li><a href="#none">내 프로필</a></li>
                                <li><a href="#none" onClick={logOut} className="log-out">로그아웃</a></li>
                            </ul>
                        </div>
                    </div>
                }

                <div className="user__box" onMouseOver={profileHover} onMouseOut={profileHoverOut}>
                    <Link to="/profile" className="user__hover"><strong>강채연</strong>님</Link>
                    <div id="user_profile_drop" className="user__anchor user_profile_hide">
                        <ul>
                            <li><Link to="/profile">내 프로필</Link></li>
                            <li><a onClick={logout} className="log-out">로그아웃</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>

    )
}

export default Header;