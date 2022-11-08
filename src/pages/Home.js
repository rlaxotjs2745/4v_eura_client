import React, {useState, useEffect} from 'react';
import axios from "axios";
import MainTimer from "../Components/Cards/MainTimer";
import MainSchedule from "../Components/Cards/MainSchedule";
import MainMyMeetingRoom from "../Components/Cards/MainMyMeetingRoom";
import {Link, Route} from "react-router-dom";
import {SERVER_URL, AXIOS_OPTION} from "../util/env";

const Home = () => {

    const [user, setUser] = useState('');
    const [schedule, setSchedule] = useState('');
    const [meeting, setMeeting] = useState('');
    const [lastMeeting, setLastMeeting] = useState('');



    useEffect(() => {
        // axios.get('/api/hello')
        //     .then(response => console.log(response.data))

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

    })

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



    return (
        <>
            <div className="page">
                <MainTimer user={user} />

                <MainSchedule schedule={schedule} />

                <div className="main__meetingroom">
                    <h3><img src={require('../assets/image/ic_video.png')} alt=""/> 나의 미팅룸 <em>({meeting.mt_meetMyListCount ? meeting.mt_meetMyListCount : 0})</em>
                        <a href="#none" className="btn btn__make"><img src={require('../assets/image/ic_plus.png')} alt=""/>새 미팅룸
                            만들기</a>
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
                            !meeting.mt_meetMyListCount ?
                            <div className="boxing">
                                <div className="msg__nodata">
                                    <span>미팅 일정이 없습니다.</span>
                                </div>
                            </div>
                                :
                            meeting.mt_meetMyList.map(room => {
                                return (
                                    <Link to="/meetingroom" state={{room: room.mt_idx}}>
                                        <MainMyMeetingRoom room={room} />
                                    </Link>
                                )
                            })
                        }
                    </div>
                    {
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
                            !lastMeeting.mt_meetEndMyList || !lastMeeting.mt_meetEndMyList.length ?
                                <div className="boxing">
                                    <div className="msg__nodata">
                                        <span>지난 미팅 일정이 없습니다.</span>
                                    </div>
                                </div>
                                :
                                lastMeeting.mt_meetEndMyList.map(room => {
                                    return (
                                        <Link to="/meetingroom" state={{room: room.mt_idx}}>
                                            <MainMyMeetingRoom room={room} />
                                        </Link>
                                    )
                                })
                        }
                    </div>
                </div>

                <div id="popup__notice" className="pop__detail">
                    <a href="#none" className="btn__close js-modal-close"><img src="../assets/image/ic_close_24.png"
                                                                               alt=""/></a>
                    <div className="popup__cnt">
                        <div className="pop__message">
                            <img src="../assets/image/ic_warning_80.png" alt=""/>
                                <strong>미팅룸을 공개하면 다시 비공개로 설정할 수 없습니다. <br/>
                                    미팅룸을 공개 하시겠습니까?</strong>
                                <span>미팅을 공개하면 초대한 참석자들에게 메일이 발송됩니다.</span>
                        </div>
                        <div className="btn__group">
                            <a href="#none" className="btn btn__able btn__s">예</a>
                            <a href="#none" className="btn btn__normal btn__s js-modal-close">아니오</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;