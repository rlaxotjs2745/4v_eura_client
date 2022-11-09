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
            </header>
        </>

    )
}

export default Header;