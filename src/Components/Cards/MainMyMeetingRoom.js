import React, {useEffect} from "react";

const MainMyMeetingRoom = ({room, modalOpen, navigateToMeetingRoom, mouseOver, mouseOut, isLast}) => {

    const getSubtractionDate = () => {
        let thisTime = new Date();
        let thisYear = thisTime.getFullYear();
        let thisMonth = thisTime.getMonth() + 1;
        let thisDate = thisTime.getDate();
        return Math.floor((new Date(room.mt_start_dt.split(' ')[0]) - new Date(`${thisYear}-${thisMonth}-${thisDate}`)) / 86400000);
    }




    // console.log('피니쉬?', room.is_finish)

    return (
        <div
            className={
                room.mt_status === 0 ? 'box is-before' :
                room.mt_status === 2 ? 'box is-cancel' :
                isLast ? 'box' : 'box'
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
                    : ""
                }
            </div>
            {
                room.is_host === 1 ?
                    <div className="box__setup">
                        {
                            room.mt_status === 0 ?
                                <div onClick={() => modalOpen(room)} onMouseOver={mouseOver} onMouseLeave={mouseOut} className="btn btn__setting js-modal-alert">공개하기</div>
                            :     room.mt_status === 2 ?
                                ''
                                // <div onClick={() => modalOpen(room)} onMouseOver={mouseOver} onMouseLeave={mouseOut} className="btn btn__setting">재개설 하기</div>
                            : ''
                        }
                    </div>
                : ''
            }
            <div className="box__title">{!room.mt_name ? '' : room.mt_name.length > 15 ? room.mt_name.slice(0,14) + '..' : room.mt_name}</div>
            <dl className="type__host">
                <dt>호스트 이름</dt>
                <dd>
                    {
                        room.is_host === 1 ? <img src={require('../../assets/image/ic_host.png')} alt="" /> : ''
                    }
                    {room.mt_hostname}
                </dd>
            </dl>
            {
                room.mt_iDataDisplay && room.mt_iDataDisplay === 0 && room.is_host === 1 ?
                <dl className="">
                    <dt>참여도 {room.mt_iData}%</dt>
                    <dd>
                        <div className="graph"><span className="graph__gage" ></span></div>
                    </dd>
                </dl> : ''
            }
            <dl>
                <dt>날짜</dt>
                <dd>{room.mt_start_dt.split(' ')[0]}</dd>
            </dl>
            <dl>
                <dt>시간</dt>
                <dd>{room.mt_start_dt.split(' ')[1].slice(0,5)} - {room.mt_end_dt.split(' ')[1].slice(0,5)}</dd>
            </dl>
        </div>
    )
}

export default MainMyMeetingRoom;




