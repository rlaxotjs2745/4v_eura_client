import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import LayoutType2 from "../Layout/LayoutType2";
import LayoutType1 from "../Layout/LayoutType1";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Error from "../pages/404";
import FindPW from "../pages/FindPw";
import Profile from "../pages/Profile";
import PublickRoute from "./PublickRoute";
import PrivateRoute from "./PrivateRoute";
import SignUp from "../pages/SignUp";
import MeetingRoom from "../pages/MeetingRoom";
import NewRoom from "../pages/NewRoom";
import MeetingCalendar from "../pages/MeetingCalendar";
import AnalyseMeeting from "../pages/AnalyseMeeting";

const Routers = () => {

    const [curSort, setCurSort] = useState(2);
    const [curLastSort, setCurLastSort] = useState(2);


    return (
        <Routes>
            {/* type1 푸터 헤더 있는 버전 */}
            {/* PrivateRoute 안에는 로그인 해야 접근 가능, 로그인 안되어 있으면 /login으로 이동*/}
            <Route path="/" element={<PrivateRoute><LayoutType1/></PrivateRoute>}>
                {/*<Route path="*" element={<Error/>}/>*/}
                <Route index element={
                    <Home
                        curLastSort={curLastSort}
                        setCurLastSort={setCurLastSort}
                        curSort={curSort}
                        setCurSort={setCurSort}
                    />}/>
                <Route path="/profile" element={<Profile/>} />
                <Route path="/meetingroom/:idx" element={<MeetingRoom />} />
                <Route path="/newroom" element={<NewRoom />} />
                <Route path="/newroom/:idx" element={<NewRoom />} />
                <Route path="/reopen/:idx" element={<NewRoom />} />
                <Route path="/newroom/" element={<NewRoom />} />

                <Route path="/calendar" element={<MeetingCalendar />}/>
                <Route path="/analyse/:idx" element={<AnalyseMeeting />} />
            </Route>
            {/* 로그인 되어 있으면 login 페이지가 아니라 /로 넘어가는 라우터 */}
            <Route path="/" element={<PublickRoute><LayoutType1/></PublickRoute>}>
                <Route path="/signup" element={<SignUp/>}/>
                {/*<Route path="/signup_complete" element={<SignUpComplete/>}/>*/}
                <Route path="/find_pw" element={<FindPW/>}/>
                {/* 404 페이지 */}
                <Route path="*" element={<Error/>}/>
            </Route>
            {/* type2 푸터 헤더 없는 버전 */}
            {/* 로그인 되어 있으면 login 페이지가 아니라 /로 넘어가는 라우터 */}
            <Route path="/" element={<PublickRoute><LayoutType2/></PublickRoute>}>
                <Route path="/login" element={<Login/>}/>
            </Route>
        </Routes>
    )
}

export default Routers;