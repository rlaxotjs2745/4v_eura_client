import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import { useCookies } from 'react-cookie';
import {useNavigate} from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../../util/env";

const Header = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user_id']);
    const navigate = useNavigate();

    const logOut = () => {
        removeCookie('user_id'); // 쿠키를 삭제
        navigate('/login'); // 로그인 페이지로 이동
    };

    function get_cookie(name) {
        let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    }

    const profileHover = () => {
        $('#user_profile_drop').removeClass('user_profile_hide')
    }

    const profileHoverOut = () => {
        $('#user_profile_drop').addClass('user_profile_hide')
    }
    const [user, setUser] = useState({});

    axios.get(SERVER_URL + '/meet/main', AXIOS_OPTION)
        .then(async res => {
            setUser(res.data.data);
        });


    return (

        <>
            <header className="header">
                <h1><Link to="/"><img src={require('../../assets/image/h1_logo.png')} alt=""/></Link></h1>
                {get_cookie('user_id') == null ? null :
                    <div className="user__box" onMouseOver={profileHover} onMouseOut={profileHoverOut}>
                        <a className="user__hover"><strong>{user.ui_name}</strong>님</a>
                        <div id="user_profile_drop" className="user__anchor user_profile_hide">
                            <ul>
                                <li><Link to="/profile">내 프로필</Link></li>
                                <li><div onClick={logOut} className="log-out">로그아웃</div></li>
                            </ul>
                        </div>
                    </div>
                }
            </header>
        </>

    )
}

export default Header;