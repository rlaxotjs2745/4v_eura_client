import React, {useEffect} from "react";

const MainMyMeetingRoom = (room) => {



    const getSubtractionDate = () => {
        let thisTime = new Date();
        let thisYear = thisTime.getFullYear();
        let thisMonth = thisTime.getMonth() + 1;
        let thisDate = thisTime.getDate();

        return Math.floor((new Date(room.mt_start_dt.split(' ')[0]) - new Date(`${thisYear}-${thisMonth}-${thisDate}`)) / 86400000);
    }





    return (
        <div className={room.mt_status === 0 ? 'box is-before' : room.mt_status === 2 ? 'box is-cancel' : 'box'}>
            <div className="box__badge">
                {
                    room.mt_live ?
                        <span className="type__live">LIVE</span>
                    : room.mt_status === 0 ?
                        <span className="type__private">비공개</span>
                    : room.mt_status === 2 ?
                        <span className="type__cancel">취소된 미팅</span>
                    : new Date(room.mt_start_dt) - new Date() > 86400000 ?
                        <span className="type__dday">D-{getSubtractionDate()}</span>
                    :
                        <span className="type__ready">약 {Math.floor((new Date(room.mt_start_dt) - new Date()) / 3600000)}시간 뒤 시작</span>
                }
            </div>
            {
                room.mt_status % 2 === 0 ?
                    <div className="box__setup">
                        {
                            room.mt_status === 0 ?
                                <a href="#popup__notice"  className="btn btn__setting js-modal-alert">공개하기</a>
                            :     room.mt_status === 2 ?
                                <a href="#none" className="btn btn__setting">재개설 하기</a>
                            : ''
                        }
                    </div>
                : ''
            }
            <div className="box__title">{room.mt_name}</div>
            <dl className="type__host">
                <dt>호스트 이름</dt>
                <dd>{room.mt_hostname}</dd>
            </dl>
            <dl>
                <dt>날짜</dt>
                <dd>{room.mt_start_dt.split(' ')[0]}</dd>
            </dl>
            <dl>
                <dt>시간</dt>
                <dd>{room.mt_start_dt.split(' ')[1]} - {room.mt_end_dt.split(' ')[0]}</dd>
            </dl>
        </div>
    )
}

export default MainMyMeetingRoom;




