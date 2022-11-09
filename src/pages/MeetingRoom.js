import React, {useEffect, useState} from "react";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../util/env";
import $ from "jquery";
import Modal from "react-modal"


const MeetingRoom = (props) => {

    const [roomInfo, setRoomInfo] = useState('');
    const [modal, setModal] = useState(false);

    useEffect(() => {
        // axios.get(SERVER_URL +
        //     `/meet/room/info?idx_meeting=${window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}`,
        //     AXIOS_OPTION)
        //     .then(res => {
        //         setRoomInfo(res.data);
        //     })

        setRoomInfo({
            mt_name: '경제학',
            mt_hostname: '김태선',
            mt_start_dt: '2022-11-08 21:00:00',
            mt_end_dt: '2022-12-13 12:00:00',
            mt_remind_type: 0, //되풀이 미팅 타입 0 없음 1 매일 2 주 3 월 4 년
            mt_remind_count: 0, //되풀이 미팅 주기 0 없음, 1이상 주기별
            mt_remind_week: null,
            mt_remind_end: null,
            mt_info: '경제적으로 밥먹기, 화장실에서 돈을 모으지 못하지만 기분좋은 쌀국수에 소스가 말린 채 월드컵 경기장에서 국민체조를 즐기는 것',
            mt_status: 1, // 0 비공개 1 공개 2 취소 3 삭제
            mt_live: 0, // 라이브여부
            mt_files: [
                {
                    idx: 1,
                    files: 'filepath/filename'
                }
            ],
            mt_invites: [{
                idx: 1,
                uname: '서광칠',
                email: 'kwang7@4thevision.com'
            }]
        })

    }, [])

    const openModal = () => {
        // setModal(true);
        $('.pop__detail').addClass('is-on');
    }

    const closeModal = () => {
        // setModal(false);
        $('.pop__detail').removeClass('is-on');
    }




    return (
            <div className="page">
                <div className="meeting__dash">
                    <h3>미팅룸 정보
                        <div className="sorting">
                            <a onClick={openModal} className="btn btn-modify js-modal-alert">
                                <img src={require('../assets/image/ic_close_16.png')} alt=""/>미팅 취소하기
                            </a>
                        </div>
                    </h3>
                    <div className="casing">
                        <div className="case-1">
                            <div className="case__title">{roomInfo.mt_name}
                                <a href="#none" className="btn btn__edit">
                                    <img src={require('../assets/image/ic_edit_24.png')} alt=""/>
                                </a>
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
                                roomInfo.mt_status == 0 ?
                                    <div className="case__message is-late">비공개 상태</div>
                                    : roomInfo.mt_status == 2 ?
                                    <div className="case__message is-cancel">취소된 상태</div>
                                    : roomInfo.mt_status == 1 && !roomInfo.mt_live && new Date() > new Date(roomInfo.mt_start_dt) ?
                                    <div className="case__message is-late">호스트가 미팅을 시작하기 전 입니다.</div>
                                    : roomInfo.mt_status == 1 && !roomInfo.mt_live ?
                                    <div className="case__message is-ready">미팅 시작 전</div>
                                    : roomInfo.mt_live ?
                                    <div className="case__message is-live"><img src={require('../assets/image/ic_time-record_24.png')} alt="" />00:00:01</div>
                                                : ''
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
                                                    <a href={file.files}>
                                                        <img src={require('../assets/image/ic_file_14.png')} alt=""/><span className="file__name">1주차_인간공학의 개요_ppt.pdf</span>
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
                    <h3>미팅 참석자 <div className="user__count"><img src={require('../assets/image/ic_participant_24.png')} alt="" />32</div>
                    </h3>
                    <div className="usering">
                        <div className="swiper userSwiper">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">

                                    <div className="user is-disabled">
                                        <ul>

                                            <li>
                                                <figure><img src={require('../assets/image/image_profile.png')} alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div className="swiper-slide">

                                    <div className="user is-disabled">
                                        <ul>

                                            <li>
                                                <figure><img src={require('../assets/image/image_profile.png')} alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-button-next"></div>
                            <div className="swiper-button-prev"></div>
                        </div>
                        <div className="btn__group">
                            <a href="#none" className="btn btn__able btn__xl">시작하기</a>
                        </div>
                    </div>
                </div>

                    <div id="popup__cancel" class="pop__detail">
                        <a href="#none" className="btn__close js-modal-close" onClick={closeModal}><img src={require('../assets/image/ic_close_24.png')} alt="" /></a>
                        <div className="popup__cnt">
                            <div className="pop__message">
                                <img src={require('../assets/image/ic_warning_80.png')} alt="" />
                                    <strong>미팅룸 취소 시 비공개로 전환되며 홈 화면에 반영됩니다.<br/>
                                        미팅룸을 취소 하시겠습니까?</strong>
                                    <span>미팅을 취소하면 초대한 참석자들에게 메일이 발송됩니다.</span>
                            </div>
                            <div className="btn__group">
                                <a href="#popup__delete" className="btn btn__able btn__s js-modal-alert">예</a>
                                <a href="#none" className="btn btn__normal btn__s js-modal-close">아니오</a>
                            </div>
                        </div>
                    </div>
                {/*</Modal>*/}

            </div>
    )
}

export default MeetingRoom;
