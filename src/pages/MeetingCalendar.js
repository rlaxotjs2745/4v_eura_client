import React, {useEffect, useState} from "react";
import Calendar from "react-calendar";
import '../Calendar.css'
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../util/env";
import {formatDate} from "react-calendar/dist/cjs/shared/dateFormatter";
import {Link, useNavigate} from "react-router-dom";

const MeetingCalendar = () => {

    const [value, onChange] = useState(new Date());
    const [meeting, setMeeting] = useState([]);
    const [clickedDay, setClickedDay] = useState('');
    const [clickedDayMeeting, setClickedDayMeeting] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    //     axios.get(SERVER_URL + "/meet/main/calendar", AXIOS_OPTION)
    //         .then(res => {
    //             // setMeeting(res.data.mt_meetMyList);
    //             res.data.mt_meetMyList.forEach((day) => {
    //                 tileContent(day.mt_date, day.mt_name)
    //             })
    //         })

        //더미
    setMeeting([
        {
            mt_idx: 1,
            mt_name: "경제학",
            mt_date: "2022-11-10 15:00:00"
        },
        {
            mt_idx: 2,
            mt_name: "사회학",
            mt_date: "2022-11-10 15:00:00"
        },
        {
            mt_idx: 3,
            mt_name: "과학",
            mt_date: "2022-11-10 15:00:00"
        },
        {
            mt_idx: 4,
            mt_name: "사과학",
            mt_date: "2022-11-10 15:00:00"
        }
    ])
        setClickedDay(new Date());

        setClickedDayMeeting(
            [
                {
                    mt_idx: 1,
                    mt_name: "경제학",
                    timer: "15:00 - 17:00",
                    hostname: "김경제",
                    mt_info: "야근이라는게 말이죠 별거 아닌 것 같지만 목이 좀 아파오는 느낌이며 지금 집에 들어가서 씻고 자도 1시가 넘습니다"
                },
                {
                    mt_idx: 2,
                    mt_name: "사회학",
                    timer: "15:00 - 17:00",
                    hostname: "김사회",
                    mt_info: "야근이라는게 말이죠 별거 아닌 것 같지만 목이 좀 아파오는 느낌이며 지금 집에 들어가서 씻고 자도 1시가 넘습니다"
                },
                {
                    mt_idx: 3,
                    mt_name: "과학",
                    timer: "15:00 - 17:00",
                    hostname: "김과",
                    mt_info: "야근이라는게 말이죠 별거 아닌 것 같지만 목이 좀 아파오는 느낌이며 지금 집에 들어가서 씻고 자도 1시가 넘습니다"
                }
            ]
    )
        //더미

    }, [])


    const getDayMeetingInfo = (day) => {
        // axios.get(SERVER_URL + '/meet/main/calendar/info?' + `calYear=${day.getFullYear()}&calMonth=${day.getMonth()}&calDay=${day.getDate()}`)
        //     .then(res => {
        //         setClickedDay(day);
        //         setClickedDayMeeting(res.data.mt_meetMyList);
        //     })
    }

    const navigateToMeetingRoom = (idx) => {
        navigate(`/meetingroom/${idx}`);
    }

    return (
        <div className="calendar">
            <h2 id="calendar_title">미팅 캘린더</h2>
            <div className="calendar-card">
                <Calendar
                    calendarType={"US"}
                    onChange={onChange}
                    value={value}
                    defaultValue={"dfdff"}
                    tileContent={({date, view}) => {
                        return meeting.map(day => {
                            return view === 'month' &&
                            date.getFullYear() == new Date(day.mt_date).getFullYear() &&
                            date.getMonth() == new Date(day.mt_date).getMonth() &&
                            date.getDate() == new Date(day.mt_date).getDate() ?
                                <div><span>• </span>{day.mt_name}</div> : null
                        })
                    }}
                    onClickDay={(value) => getDayMeetingInfo(new Date(value))}
                />
            </div>
            {
                !clickedDay ? '' :
                    <div className="calendar_clicked_day_meeting_card">
                        <h2>{new Date(clickedDay).getMonth() + '월' + new Date(clickedDay).getDate()}일 일정</h2>
                        <table className="clicked_day_meeting_list">
                            <thead>
                                <tr>
                                    <th>미팅 이름</th>
                                    <th>호스트</th>
                                    <th>시간</th>
                                    <th>미팅 내용</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !clickedDayMeeting.length ? '' :
                                        clickedDayMeeting.map(meet => {
                                            return (
                                                    <tr onClick={() => navigateToMeetingRoom(meet.mt_idx)}>
                                                        <td>{meet.mt_name}</td>
                                                        <td>{meet.hostname}</td>
                                                        <td>{meet.timer}</td>
                                                        <td>{meet.mt_info}</td>
                                                    </tr>
                                            )
                                        })
                                }
                            </tbody>
                        </table>
                    </div>
            }

        </div>
    )
}

export default MeetingCalendar;