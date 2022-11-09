import {Link} from "react-router-dom";
import $ from "jquery";


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