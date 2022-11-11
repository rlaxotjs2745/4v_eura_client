import React, {useState, useEffect} from 'react';
import axios from "axios";
import MainTimer from "../Components/Cards/MainTimer";
import MainSchedule from "../Components/Cards/MainSchedule";
import MainMyMeetingRoom from "../Components/Cards/MainMyMeetingRoom";
import {Link, useNavigate} from "react-router-dom";
import {SERVER_URL, AXIOS_OPTION} from "../util/env";
import $ from "jquery";
const Home = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [schedule, setSchedule] = useState({});
    const [meeting, setMeeting] = useState({});
    const [lastMeeting, setLastMeeting] = useState([]);
    const [modal, setModalOpen] = useState(false);
    const [curMeeting, setCurMeeting] = useState(false)
    const [curEvent, setCurEvent] = useState(true);


    useEffect(() => {
        $('#mt_status_0').hide();
        $('#mt_status_2').hide();
        $('#popup__notice').hide();


        axios.get(SERVER_URL + '/meet/main', AXIOS_OPTION)
            .then(res => {
                setUser(res.data);
                setSchedule(res.data.mt_meetShort);
            });

        axios.get(SERVER_URL + '/meet/main/list', AXIOS_OPTION)
            .then(res => {
                setMeeting(res.data);
            })

        axios.get(SERVER_URL + '/meet/main/endlist', AXIOS_OPTION)
            .then(res => {
                setLastMeeting(res.data);
            })



        // setMeeting({
        //     mt_meetMyListCount: 1,
        //     mt_meetMyList: [{
        //         mt_idx: 5,
        //         mt_name: '경제학',
        //         mt_hostname: '김태선',
        //         mt_status: 2,
        //         mt_start_dt: '2022-11-08 21:00:00',
        //         mt_end_dt: '2022-12-13 12:00:00',
        //         mt_live: 0
        //     },{
        //         mt_idx: 5,
        //         mt_name: '경제학',
        //         mt_hostname: '김태선',
        //         mt_status: 2,
        //         mt_start_dt: '2022-11-08 21:00:00',
        //         mt_end_dt: '2022-12-13 12:00:00',
        //         mt_live: 0
        //     },{
        //         mt_idx: 5,
        //         mt_name: '경제학',
        //         mt_hostname: '김태선',
        //         mt_status: 1,
        //         mt_start_dt: '2022-11-08 21:00:00',
        //         mt_end_dt: '2022-12-13 12:00:00',
        //         mt_live: 0
        //     },{
        //         mt_idx: 5,
        //         mt_name: '경제학',
        //         mt_hostname: '김태선',
        //         mt_status: 2,
        //         mt_start_dt: '2022-11-08 21:00:00',
        //         mt_end_dt: '2022-12-13 12:00:00',
        //         mt_live: 0
        //     },{
        //         mt_idx: 5,
        //         mt_name: '경제학',
        //         mt_hostname: '김태선',
        //         mt_status: 3,
        //         mt_start_dt: '2022-11-08 21:00:00',
        //         mt_end_dt: '2022-12-13 12:00:00',
        //         mt_live: 0
        //     },{
        //         mt_idx: 5,
        //         mt_name: '경제학',
        //         mt_hostname: '김태선',
        //         mt_status: 0,
        //         mt_start_dt: '2022-11-08 21:00:00',
        //         mt_end_dt: '2022-12-13 12:00:00',
        //         mt_live: 0
        //     },{
        //         mt_idx: 5,
        //         mt_name: '경제학',
        //         mt_hostname: '김태선',
        //         mt_status: 1,
        //         mt_start_dt: '2022-11-08 21:00:00',
        //         mt_end_dt: '2022-12-13 12:00:00',
        //         mt_live: 1
        //     },{
        //         mt_idx: 5,
        //         mt_name: '경제학',
        //         mt_hostname: '김태선',
        //         mt_status: 2,
        //         mt_start_dt: '2022-11-08 21:00:00',
        //         mt_end_dt: '2022-12-13 12:00:00',
        //         mt_live: 0
        //     },{
        //         mt_idx: 5,
        //         mt_name: '경제학',
        //         mt_hostname: '김태선',
        //         mt_status: 2,
        //         mt_start_dt: '2022-11-08 21:00:00',
        //         mt_end_dt: '2022-12-13 12:00:00',
        //         mt_live: 0
        //     },
        //     ]
        // })


    }, [])

    const pageSort = (e) => {
        let endPoint;
        let resMtd;
        if(e.target.id == 'lastMeetSort'){
            endPoint = `/meet/main/endlist?pageSort=${e.target.value}`;
            resMtd = (res) => setLastMeeting(res);
        } else {
            endPoint = `/meet/main/list?pageSort=${e.target.value}`;
            resMtd = (res) => setMeeting(res);
        }
        axios.get(SERVER_URL + endPoint, AXIOS_OPTION)
            .then(res => {
                resMtd(res.data);
            })
    }

    const modalOpen = (meet) => {
        console.log("#########" + meet);
        if(meet.mt_status == 0){
            $('#mt_status_0').show();
        } else {
            $('#mt_status_2').show();
        }
        $('#popup__notice').show();
    }

    const modalClose = () => {
        $('#mt_status_0').hide();
        $('#mt_status_2').hide();
        $('#popup__notice').hide();
    }

    const changeMeetingStatus = () => {
        let meet = curMeeting;
        let newMeeting = [];
        if(meet.mt_status === 0){
            axios.put(SERVER_URL + '/meet/room/open', {idx_meeting: meet.mt_idx}, AXIOS_OPTION)
                .then(res => {
                    if(res.result_code === "SUCCESS"){
                        meet.mt_status = 1;
                        newMeeting.push(meet);
                        for(let cur of meeting){
                            if(cur.mt_idx !== meet.mt_idx){
                                newMeeting.push(cur);
                            }
                        }
                        setMeeting(newMeeting);
                    }
                })
        } else if(meet.mt_status === 2) {
            navigate(`/newroom/${meet.mt_idx}`);
        }
    }

    const navigateToMeetingRoom = (meet) => {
        if(curEvent){
            navigate(`/meetingroom/${meet.mt_idx}`);
        }
    }

    const mouseOver = () => {
        setCurEvent(false);
    }

    const mouseOut = () => {
        setCurEvent(true);
    }






    return (
        <>
            <div className="page">
                <MainTimer user={user} />

                <MainSchedule schedule={schedule} />

                <div className="main__meetingroom">
                    <h3><img src={require('../assets/image/ic_video.png')} alt=""/> 나의 미팅룸 <em>({meeting.mt_meetMyListCount ? meeting.mt_meetMyListCount : 0})</em>
                        <Link to="/newroom" className="btn btn__make"><img src={require('../assets/image/ic_plus.png')} alt=""/>새 미팅룸 만들기</Link>
                        <div className="sorting">
                            <select name="" id="meetSort" onChange={pageSort}>
                                <option value="1">최신순</option>
                                <option value="2">미팅 시간 순</option>
                                <option value="3">비공개 미팅 순</option>
                                <option value="4">취소된 미팅 순</option>
                            </select>
                        </div>
                    </h3>
                    <div className="boxing">
                        {
                            !meeting ||
                            !meeting.mt_meetMyListCount ?
                            <div className="boxing">
                                <div className="msg__nodata">
                                    <span>미팅 일정이 없습니다.</span>
                                </div>
                            </div>
                                :
                            meeting.mt_meetMyList.map(room => {
                                return (
                                    <MainMyMeetingRoom room={room} modalOpen={modalOpen} navigateToMeetingRoom={navigateToMeetingRoom} mouseOver={mouseOver} mouseOut={mouseOut} />
                                )
                            })
                        }
                    </div>
                    {
                        !meeting ||
                        !meeting.mt_meetMyListCount ? '' :
                            <div className="btn__group">
                                <a href="#none" className="btn btn__more">더 보기</a>
                            </div>
                    }
                </div>

                <div className="main__history">
                    <h3><img src="" alt=""/><img src={require('../assets/image/ic_last.png')} alt=""/> 지난 미팅 <em>({lastMeeting.mt_meetEndMyList ? lastMeeting.mt_meetEndMyList.length : 0})</em>
                        <div className="sorting">
                            <select name="" id="lastMeetSort" onChange={pageSort}>
                                <option value="1">최신순</option>
                                <option value="2">미팅 시간 순</option>
                                <option value="3">비공개 미팅 순</option>
                                <option value="4">취소된 미팅 순</option>
                            </select>
                        </div>
                    </h3>
                    <div className="boxing">
                        {
                            !lastMeeting ||
                            !lastMeeting.mt_meetEndMyList || !lastMeeting.mt_meetEndMyList.length ?
                                <div className="boxing">
                                    <div className="msg__nodata">
                                        <span>지난 미팅 일정이 없습니다.</span>
                                    </div>
                                </div>
                                :
                                lastMeeting.mt_meetEndMyList.map(room => {
                                    return (
                                        <MainMyMeetingRoom room={room} modalOpen={modalOpen} navigateToMeetingRoom={curEvent} mouseOver={mouseOver} mouseOut={mouseOut} />
                                    )
                                })
                        }
                    </div>
                </div>
                    <div id="popup__notice" className="pop__detail is-on">
                        <div onClick={modalClose} className="btn__close js-modal-close"><img src={require('../assets/image/ic_close_24.png')} alt=""/></div>
                        <div className="popup__cnt">
                            <div className="pop__message">
                                <img src={require('../assets/image/ic_warning_80.png')} alt=""/>
                                        <div id="mt_status_0">
                                            <strong>미팅룸을 공개하면 다시 비공개로 설정할 수 없습니다. <br/>
                                                미팅룸을 공개 하시겠습니까?</strong>
                                            <span>미팅을 공개하면 초대한 참석자들에게 메일이 발송됩니다.</span>
                                        </div>
                                        <div id="mt_status_2">
                                            <strong>미팅룸을 재개설 하시겠습니까?</strong>
                                            <span>미팅을 재개설하면 초대한 참석자들에게 메일이 발송됩니다.</span>
                                        </div>
                            </div>
                            <div className="btn__group">
                                <div onClick={changeMeetingStatus} className="btn btn__able btn__s">예</div>
                                <div onClick={modalClose} className="btn btn__normal btn__s js-modal-close">아니오</div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Home;