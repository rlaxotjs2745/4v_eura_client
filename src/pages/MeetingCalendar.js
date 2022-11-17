import React, {useEffect, useState} from "react";
import Calendar from "react-calendar";
import '../Calendar.css'
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../util/env";
import {formatDate} from "react-calendar/dist/cjs/shared/dateFormatter";
import {Link, useNavigate} from "react-router-dom";
import $ from "jquery";

const MeetingCalendar = () => {

    const [meeting, setMeeting] = useState([]);
    const [clickedDay, setClickedDay] = useState('');
    const [clickedDayMeeting, setClickedDayMeeting] = useState([]);
    const [thisMonth, setThisMonth] = useState(new Date().getMonth()+1);
    const [thisYear, setThisYear] = useState(new Date().getFullYear());

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(SERVER_URL + `/meet/main/calendar?calYear=${thisYear}&calMonth=${thisMonth}`, AXIOS_OPTION)
            .then(res => {
                setMeeting(res.data.data.mt_meetMyList);
            })
    }, [thisMonth, thisYear])

    const getNow = (e) => {
        console.log(e)
    }


    const getDayMeetingInfo = (day) => {
        axios.get(SERVER_URL + '/meet/main/calendar/info?' + `calYear=${day.getFullYear()}&calMonth=${day.getMonth() + 1}&calDay=${day.getDate()}`, AXIOS_OPTION)
            .then(res => {
                setClickedDay(day);
                setClickedDayMeeting(res.data.data.mt_meetMyList);
            })
    }

    const navigateToMeetingRoom = (idx) => {
        navigate(`/meetingroom/${idx}`);
    }

    const fillTileContent = ({date, view}) => {
        return !meeting ? '' : meeting.map(day => {
            return view === 'month'
            && date.getFullYear() == new Date(day.mt_date).getFullYear()
            && date.getMonth() == new Date(day.mt_date).getMonth()
            && date.getDate() == new Date(day.mt_date).getDate() ?
                <div><span>• </span>{day && day.mt_name && day.mt_name.length > 10 ? day.mt_name.slice(0,8) + '..' : day.mt_name}</div> : null
        })
    }

    const getMonthMeetingList = (date, label) => {
        // setThisMonth(date);
        return label;
    }

    $('.react-calendar__navigation__next-button').click(() => {
        setThisMonth(thisMonth + 1);
    })

    $('.react-calendar__navigation__prev-button').click(() => {
        setThisMonth(thisMonth - 1);
    })

    $('.react-calendar__navigation__next2-button').click(() => {
        setThisYear(thisYear + 1);
    })

    $('.react-calendar__navigation__prev2-button').click(() => {
        setThisYear(thisYear - 1);
    })

    const setYearMonth = (date) => {
        console.log(date)
        setThisYear(date.getFullYear());
        setThisMonth(date.getMonth()+1);
    }




    return (
        <div className="calendar">
            <h2 id="calendar_title">미팅 캘린더</h2>
            <div className="calendar-card">
                <Calendar
                    calendarType={"US"}
                    tileContent={fillTileContent}
                    onViewChange={({activeStartDate}) => setYearMonth(activeStartDate)}
                    navigationLabel={({ date, label }) => getMonthMeetingList(date, label)}
                    onClickDay={(value) => getDayMeetingInfo(new Date(value))}
                />
            </div>
            {
                !clickedDay ||!clickedDayMeeting.length ? '' :
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