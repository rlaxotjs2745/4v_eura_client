import {Route, Routes} from "react-router-dom";
import LayoutType2 from "../Layout/LayoutType2";
import LayoutType1 from "../Layout/LayoutType1";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Error from "../pages/404";
import FindPW from "../pages/FindPw";
import SignUpComplete from "../pages/SignUpComplete";
import FindPwMail from "../pages/FindPwMail";
import Profile from "../pages/Profile";
import PublickRoute from "./PublickRoute";
import PrivateRoute from "./PrivateRoute";
import SignUp from "../pages/SignUp";

const Routers = () => {
    return (
        <Routes>
            {/* type1 푸터 헤더 있는 버전 */}
            {/* PrivateRoute 안에는 로그인 해야 접근 가능 */}
            <Route path="/" element={<PrivateRoute><LayoutType1/></PrivateRoute>}>
                <Route index element={<Home/>}/>
                <Route path="/profile" element={<Profile/>} />
            </Route>
            <Route path="/" element={<PublickRoute><LayoutType1/></PublickRoute>}>
                <Route path="signup" element={<SignUp/>}/>
                <Route path="/signup_complete" element={<SignUpComplete/>}/>
                <Route path="/find_pw" element={<FindPW/>}/>
                <Route path="/find_pw_mail" element={<FindPwMail/>} />
                {/* 404 페이지 */}
                <Route path="*" element={<Error/>}/>
            </Route>
            {/* type2 푸터 헤더 없는 버전 */}
            <Route path="/" element={<LayoutType2/>}>
                <Route path="/login" element={<Login/>}/>
            </Route>
        </Routes>
    )
}

export default Routers;