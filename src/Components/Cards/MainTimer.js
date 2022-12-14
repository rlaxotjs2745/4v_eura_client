import axios from "axios";

const React = require("react");
const {useState} = require("react");
const {useEffect} = require("react");



const MainTimer = ({user}) => {
    const [timer, setTimer] = useState("00:00");
    const [day, setDay] = useState("")

    const weekdayArr = ['일','월','화','수','목','금','토']

    const currentTimer = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const dateNum = date.getDate();
        const weekday = date.getDay();
        setDay(`${year}년 ${month}월 ${dateNum}일 (${weekdayArr[weekday]})`);

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        // const seconds = String(date.getSeconds()).padStart(2, "0");
        setTimer(`${hours}:${minutes}`);
    }

    const startTimer = () => {
        setInterval(currentTimer, 1000);
    }
    startTimer();


    return (
        <>
            {!user ? <div className="main__board"></div> :
                <div className="main__board">
                        <div className="board__user">
                            <figure><img src={!user || !user.ui_pic ? require('../../assets/image/image_profile.png') : user.ui_pic} alt=""/></figure>
                            <span>안녕하세요</span>
                            <strong>{!user ||!user.ui_name ? '' : user.ui_name + '님' }</strong>
                        </div>
                    <div className="board__time_box">
                        <div className="board__time">{timer}</div>
                        <div className="board__date ">{day}</div>
                    </div>
                </div>
            }
        </>
    )

}

export default MainTimer;


