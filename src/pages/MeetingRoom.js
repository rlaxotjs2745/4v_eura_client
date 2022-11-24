import React, {useEffect, useState} from "react";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../util/env";
import $ from "jquery";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper";
import {Link, useNavigate, useLocation} from "react-router-dom";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css"
import RoomUserList from "../Components/Cards/RoomUserList";

const MeetingRoom = (props) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const pathSplit = Number(pathname.split('/')[2])
    console.log(pathSplit)

    const [roomInfo, setRoomInfo] = useState('');
    const [invites, setInvites] = useState('');
    const [timer, setTimer] = useState('');
    const [invCount, setInvCount] = useState('');

    useEffect(() => {
        axios.get(SERVER_URL +
            `/meet/room/main?idx_meeting=${pathSplit}`,
            AXIOS_OPTION)
            .then(res => {
                if(res.data && res.data.data && res.data.data.mt_finish === 1){
                    navigate(`/analyse/${pathSplit}`);
                } else if (res.data.result_code === 'FAIL01') {
                    navigate(`/analyse/${pathSplit}`);
                }
                setRoomInfo(res.data.data);
            }).catch(res => console.log(res))

         axios.get(SERVER_URL +
            `/meet/room/invite?idx_meeting=${pathSplit}`,
            AXIOS_OPTION)
            .then(res => {
                setInvCount(res.data.data.mt_invites.length);
                makeInviteTag(res.data.data.mt_invites);
            })

    }, [])

    useEffect(() => {
        console.log(roomInfo);
    }, [roomInfo])

    const openModal = () => {
        // setModal(true);
        $('.pop__detail').addClass('is-on');
        $('#shade').addClass('is-on');
    }

    const closeModal = () => {
        // setModal(false);
        $('.pop__detail').removeClass('is-on');
        $('#shade').removeClass('is-on');
    }

    $('#shade').click(() => {
        closeModal();
    })

    const cancelMeeting = () => {
        if(roomInfo.mt_status === 2){
            axios.post(SERVER_URL +
                    '/meet/room/erase', {idx_meeting:window.location.pathname.split('/')[window.location.pathname.split('/').length-1]},
                AXIOS_OPTION)
                .then(res => {
                    if(res.data.result_code === 'SUCCESS'){
                        setRoomInfo({...roomInfo, mt_status: 3});
                        navigate('/')
                    }else{
                        alert(res.data.result_str);
                    }
                })
        } else {
        axios.post(SERVER_URL +
            '/meet/room/cancel', {idx_meeting:window.location.pathname.split('/')[window.location.pathname.split('/').length-1]},
            AXIOS_OPTION)
            .then(res => {
                console.log(res)
                if(res.data.result_code === 'SUCCESS'){
                    axios.get(SERVER_URL +
                        `/meet/room/info?idx_meeting=${pathSplit}`,
                        AXIOS_OPTION)
                        .then(res => {
                            setRoomInfo({...roomInfo, mt_status: 2});
                            navigate('/')
                        })
                }else{
                    alert(res.data.result_str);
                }
            })
        }
        //             setRoomInfo({...roomInfo, mt_status: 3});
        closeModal();
    }

    const getMeetingRunningTime = () => {
        let nowDiff = new Date() - new Date(roomInfo.mt_live_dt);

        let hour = '' + Math.floor(nowDiff / 3600000);
        nowDiff = nowDiff - hour * 3600000;
        let min = '' + Math.floor(nowDiff / 60000);
        nowDiff = nowDiff - min * 60000;
        let sec = '' + Math.floor(nowDiff / 1000);

        setTimer(`${hour.length === 1 ? '0'+ hour : hour}:${min.length === 1 ? '0' + min : min}:${sec.length === 1 ? '0' + sec : sec}`);
    }

    const startTimer = () => {
        setInterval(getMeetingRunningTime, 1000);
    }

    const makeInviteTag = (invit) => {
        let invArr = [];
        let res = [];
        invit.forEach((inv, idx) => {
            invArr.push(inv);
            if(invArr.length === 16){
                res.push(invArr);
                invArr = [];
            }
            if(invit.length-1 === idx){
                res.push(invArr);
            }
        })
        setInvites(res);
        console.log(invites)
    }

    const startMeeting = () => {
        // const timeDiff = new Date(roomInfo.mt_start_dt) - new Date();
        // if(Math.floor(timeDiff / 1000 / 60) > 10){
        //     return alert('지금은 예정된 시작 시간보다 너무 이릅니다. \r예정된 시작 시간 10분 전부터 시작할 수 있습니다.')
        // }

        axios.post(SERVER_URL + '/meet/room/start', {idx_meeting : window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}, AXIOS_OPTION)
            .then(res => {
                if(res.data.result_code === 'SUCCESS'){
                    const mcid = res.data.data.mcid;
                    const token = res.data.data.token;
                    window.location.href = `EuraEmotionService://mcid=${mcid},token=${token}`;
                    window.location.reload();
                }else{
                    alert(res.data.result_str);
                }
            })
    }





    return (
            <div className="page">
                <div className="meeting__dash">
                    <h3>미팅룸 정보
                        <div className="sorting">
                            {
                                roomInfo.mt_ishost === '0' ? '' :
                                    roomInfo.isLive === 1 && roomInfo.mt_ishost === '1' ? '' :
                                        roomInfo.mt_ishost === '1' && roomInfo.mt_status === 2 ?
                                            <a onClick={openModal} className="btn btn-delete js-modal-alert">
                                                <img src={require('../assets/image/ic_delete_16.png')} alt=""/>미팅 삭제하기
                                            </a> :
                                            roomInfo.mt_status === 3 ?
                                                "" :
                                <a onClick={openModal} className="btn btn-modify js-modal-alert">
                                    <img src={require('../assets/image/ic_close_16.png')} alt=""/>미팅 취소하기
                                </a>
                            }
                        </div>
                    </h3>
                    <div className="casing">
                        <div className="case-1">
                            <div className="case__title">{roomInfo.mt_name}
                                {
                                    roomInfo.mt_ishost === '1' && roomInfo.mt_live !== 1 ?
                                    <Link to={
                                            roomInfo.mt_status === 2 ?
                                            "/reopen/" + window.location.pathname.split('/')[window.location.pathname.split('/').length-1]
                                        :
                                            "/newroom/" + window.location.pathname.split('/')[window.location.pathname.split('/').length-1]
                                    }
                                          className="btn btn__edit">
                                        <img src={require('../assets/image/ic_edit_24.png')} alt=""/>
                                    </Link> : ''
                                }
                            </div>
                            <dl className="type__host">
                                <dt>강의내용</dt>
                                <dd>{roomInfo.mt_info}</dd>
                            </dl>
                            <dl className="">
                                <dt>호스트 이름</dt>
                                <dd>{roomInfo.mt_hostname}</dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>{!roomInfo.mt_start_dt ? '' : roomInfo.mt_start_dt.split(' ')[0]}</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>{!roomInfo.mt_start_dt ? '' : roomInfo.mt_start_dt.split(' ')[1].slice(0,5)} - {!roomInfo.mt_end_dt ? '' :roomInfo.mt_end_dt.split(' ')[1].slice(0,5)}</dd>
                            </dl>
                        </div>
                        <div className="case-2">
                            {
                                roomInfo.mt_live ? startTimer() : ''
                            }
                            {
                                roomInfo.mt_status == 0 ?
                                    <div className="case__message is-late">비공개 상태</div>
                                    : roomInfo.mt_status == 2 ?
                                    <div className="case__message is-cancel">취소된 상태</div>
                                    : roomInfo.mt_status == 1 && !roomInfo.mt_live && new Date() > new Date(roomInfo.mt_start_dt) ?
                                    <div className="case__message is-late">호스트가 미팅을 시작하기 전 입니다.</div>
                                    : roomInfo.mt_status == 1 && !roomInfo.mt_live ?
                                    <div className="case__message is-ready">미팅 시작 전</div>
                                    : roomInfo.mt_live ?
                                    <div className="case__message is-live"><img src={require('../assets/image/ic_time-record_24.png')} alt="" />{timer}</div>
                                                : <div className="case__message is-cancel">삭제된 미팅</div>
                            }
                        </div>
                        <div className="case-3">
                            <div className="list__upload">
                                <ul>
                                    {
                                        !roomInfo.mt_files || !roomInfo.mt_files.length ?
                                            <li>
                                                <a>
                                                   <span className="file__name">강의에 업로드 된 파일이 없습니다.</span>
                                                </a>
                                            </li>
                                        : roomInfo.mt_files.map(file => {
                                            return (
                                                <li>
                                                    <a href={file.download}>
                                                        <img src={require('../assets/image/ic_file_14.png')} alt=""/><span className="file__name">{file.files}</span>
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="meeting__user">
                    <h3>미팅 참석자 <div className="user__count"><img src={require('../assets/image/ic_participant_24.png')} alt="" />{invCount}</div>
                    </h3>
                    <div className="usering">
                        <Swiper modules={[
                            Pagination, Navigation
                        ]} spaceBetween={30}
                                slidesPerView={1}
                                navigation
                        >
                                {
                                    !invites || !invites.length ? '' :
                                        invites.map(inv =>{
                                               return <SwiperSlide>
                                            <RoomUserList invites={inv} roomInfo={roomInfo} />
                                        </SwiperSlide>
                                        })
                                }
                        </Swiper>
                        <div className="btn__group">
                            {
                                roomInfo.mt_ishost == '0' ?
                                    <div onClick={startMeeting} className="btn btn__able btn__xl">참여하기</div> //게스트, 시작된 미팅
                                    :
                                    roomInfo.mt_ishost == '0' ?
                                        <div className="btn btn__disable btn__xl">참여하기</div> // 게스트, 시작 전 미팅
                                        :
                                        roomInfo.mt_ishost == '1' && roomInfo.mt_status === 1?
                                    <div onClick={startMeeting} className="btn btn__able btn__xl">시작하기</div> // 호스트, 시작 전 미팅
                                            :
                                            roomInfo.mt_ishost == '1' ?
                                                <div className="btn btn__disable btn__xl">시작하기</div> //호스트, 시작된 미팅
                                                :
                                                roomInfo.mt_ishost == '1' && roomInfo.mt_status !== 1 ?
                                                    <div className="btn btn__disable btn__xl">시작하기</div>
                                                    : ''
                            }

                        </div>
                    </div>
                </div>

                    <div id="popup__cancel" className="pop__detail">
                        <a className="btn__close js-modal-close" onClick={closeModal}><img src={require('../assets/image/ic_close_24.png')} alt="" /></a>
                        <div className="popup__cnt">
                            {
                                    roomInfo.mt_status === 2 ?
                                        <div className="pop__message">
                                            <img src={require('../assets/image/ic_warning_80.png')} alt="" />
                                            <strong>미팅룸을 삭제 하시겠습니까?</strong>
                                        </div>
                                        :
                                        <div className="pop__message">
                                            <img src={require('../assets/image/ic_warning_80.png')} alt="" />
                                            <strong>미팅룸 취소 시 비공개로 전환되며 홈 화면에 반영됩니다.<br/>
                                                미팅룸을 취소 하시겠습니까?</strong>
                                            <span>미팅을 취소하면 초대한 참석자들에게 메일이 발송됩니다.</span>
                                        </div>
                                }
                            <div className="btn__group">
                                <a onClick={cancelMeeting} className="btn btn__able btn__s js-modal-alert">예</a>
                                <a onClick={closeModal} className="btn btn__normal btn__s js-modal-close">아니오</a>
                            </div>
                        </div>
                    </div>
            </div>
    )
}

export default MeetingRoom;
