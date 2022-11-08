import React, {useState, useEffect} from 'react';
import axios from "axios";
import MainTimer from "../Components/Cards/MainTimer";
import MainSchedule from "../Components/Cards/MainSchedule";
import MainMyMeetingRoom from "../Components/Cards/MainMyMeetingRoom";
import {Link, Route} from "react-router-dom";

const Home = ({user}) => {
    useEffect(() => {
        axios.get('/api/hello')
            .then(response => console.log(response.data))
    }, [])


    let schedule = [];
    let meeting = {};




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
                            <select name="" id="">
                                <option value="">최신순</option>
                                <option value="">미팅 시간 순</option>
                                <option value="">비공개 미팅 순</option>
                                <option value="">취소된 미팅 순</option>
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
                    <h3><img src="" alt=""/><img src={require('../assets/image/ic_last.png')} alt=""/> 지난 미팅 <em>(2)</em>
                        <div className="sorting">
                            <select name="" id="">
                                <option value="">최신순</option>
                                <option value="">미팅 시간 순</option>
                                <option value="">비공개 미팅 순</option>
                                <option value="">취소된 미팅 순</option>
                            </select>
                        </div>
                    </h3>
                    <div className="boxing">
                        <div className="box">
                            <div className="box__badge"><span className="type__ready">3:00뒤 시작</span></div>
                            <div className="box__setup"><a href="#none" className="btn btn__setting">공개하기</a></div>
                            <div className="box__title">공업교육론</div>
                            <dl className="type__host">
                                <dt>호스트 이름</dt>
                                <dd><img src={require('../assets/image/ic_host.png')} alt=""/>강채연</dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 03</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>9:00 - 11:00</dd>
                            </dl>
                        </div>
                        <div className="box">
                            <div className="box__badge"><span className="type__ready">3:00뒤 시작</span></div>
                            <div className="box__title">전력전자공학</div>
                            <dl className="">
                                <dt>호스트 이름</dt>
                                <dd>김춘배</dd>
                            </dl>
                            <dl className="">
                                <dt>참여도 82%</dt>
                                <dd>
                                    <div className="graph"><span className="graph__gage"></span>
                                    </div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 04</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>9:00 - 11:00</dd>
                            </dl>
                        </div>
                        <div className="box">
                            <div className="box__badge"><span className="type__private">미참석</span></div>
                            <div className="box__setup"><a href="#none" className="btn btn__setting">공개하기</a></div>
                            <div className="box__title">인간공학개론</div>
                            <dl className="">
                                <dt>호스트 이름</dt>
                                <dd>홍현수</dd>
                            </dl>
                            <dl className="">
                                <dt>참여도 0%</dt>
                                <dd>
                                    <div className="graph"><span className="graph__gage" ></span></div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 08</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>9:00 - 11:00</dd>
                            </dl>
                        </div>
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