import React from "react";
import {useNavigate} from "react-router-dom";

const MainMyMeetingRoom = ({room, modalOpen, navigateToMeetingRoom, mouseOver, mouseOut, isLast, idx}) => {

    const getSubtractionDate = () => {
        let thisTime = new Date();
        let thisYear = thisTime.getFullYear();
        let thisMonth = thisTime.getMonth() + 1;
        let thisDate = thisTime.getDate();
        return Math.floor((new Date(room.mt_start_dt.split(' ')[0]) - new Date(`${thisYear}-${thisMonth}-${thisDate}`)) / 86400000);
    }

    const navigate = useNavigate();


    const idxCheck = () => {
        navigate(`/reopen/${room.mt_idx}`)
    }


    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = week[new Date(room.mt_start_dt.split(' ')[0]).getDay()];


    return (
        <div
            className={
                room.mt_status === 0 ? 'box is-before box__ts' :
                room.mt_status === 2 ? 'box is-cancel box__ts' :
                isLast ? 'box box__ts' : 'box box__ts'
            }
            onClick={() => navigateToMeetingRoom(room.mt_idx, isLast)}
        >
            <div className="box__badge">
                {
                    room.mt_live && isLast !== 1 ?
                        <span className="type__live">LIVE</span>
                    : room.mt_status === 0 && room.is_host === 1 ?
                        <span className="type__private">비공개</span>
                    : room.mt_status === 2 && room.is_host === 1 ?
                        <span className="type__cancel">취소된 미팅</span>
                    : new Date(room.mt_start_dt) - new Date() > 86400000 ?
                        <span className="type__dday">D-{getSubtractionDate()}</span>
                    : room.mt_iData !== 0 && Math.floor((new Date(room.mt_start_dt) - new Date())/(1000*60)) < 60 && Math.floor((new Date(room.mt_start_dt) - new Date())/(1000*60)) >= 5?
                        <span className="type__ready">약 {Math.floor((new Date(room.mt_start_dt) - new Date())/(1000*60))}분 뒤 시작</span>
                    : room.mt_iData !== 0 && Math.floor((new Date(room.mt_start_dt) - new Date())/(1000*60)) < 5 ?
                        <span className="type__ready">곧 시작</span>
                    : room.mt_iData !== 0 ?
                        <span className="type__ready">약 {Math.floor((new Date(room.mt_start_dt) - new Date()) / 3600000)}시간 뒤 시작</span>
                    : room.is_join === 0 ?
                        <span className="type__private">미참석</span>
                    : ""
                }
            </div>
            {
                room.is_host === 1 ?
                    <div className="box__setup">
                        {
                            room.mt_status === 0 ?
                                <div onClick={() => modalOpen(room)} onMouseOver={mouseOver} onMouseLeave={mouseOut} className="btn btn__setting js-modal-alert">공개하기</div>
                            : room.mt_status === 2 && room.is_host === 1 ?
                                    <div onClick={idxCheck} onMouseOver={mouseOver} onMouseLeave={mouseOut} className="btn btn__setting js-modal-alert">재개설하기</div>
                                    :
                                        room.mt_status === 2 ?
                                ''
                            : ''

                        }
                    </div>
                : ''
            }
            {/*<div className="box__title">{!room.mt_name ? '' : room.mt_name.length > 15 ? room.mt_name.slice(0,14) + '..' : room.mt_name}</div>*/}
            <div className="box__title">{!room.mt_name ? '' : room.mt_name}</div>
            <dl className="type__host">
                <dt>호스트 이름</dt>
                <dd>
                    {
                        room.is_host === 1 ? <img src={require('../../assets/image/ic_host.png')} alt="" /> : ''
                    }
                    {room.mt_hostname}
                </dd>
            </dl>

            <dl>
                <dt>날짜</dt>
                <dd>{room.mt_start_dt.split(' ')[0]} ({dayOfWeek})</dd>
            </dl>
            <dl>
                <dt>시간</dt>
                <dd>{room.mt_start_dt.split(' ')[1].slice(0,5)} - {room.mt_end_dt.split(' ')[1].slice(0,5)}</dd>
            </dl>
        </div>
    )
}

export default MainMyMeetingRoom;




