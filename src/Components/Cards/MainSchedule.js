import {Link} from "react-router-dom";
const React = require("react");



const MainSchedule = ({schedule}) => {


    return (
        <div className="main__schedule">
            <h2>다음일정</h2>
            <ul>
                {!schedule || !schedule.length ? <li><strong>다음 일정이 없습니다.</strong></li> :
                    schedule.map((day) => {
                        return (
                            <li><Link to="/meetingroom" state={{room: day.mt_idx}}><strong>{day.mt_name}</strong> <em>{day.mt_start_dt.split(' ')[1].slice(0,5)} - {day.mt_end_dt.split(' ')[1].slice(0,5)}</em></Link></li>
                        )
                    })
                }
            </ul>
            <Link to="/calendar" className="btn btn__calendar">
                <img src={require('../../assets/image/ic_arrow_light_circle_24.png')} alt=""/>
                캘린더 보기
            </Link>
        </div>
    )


}

export default MainSchedule;