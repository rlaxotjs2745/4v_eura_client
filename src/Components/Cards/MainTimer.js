import axios from "axios";

const React = require("react");
const {useState} = require("react");
const {useEffect} = require("react");



const MainTimer = ({user}) => {
    const [timer, setTimer] = useState("00:00")
    const currentTimer = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
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
                            <strong>{!user ||!user.ui_name ? '유저유저' : user.ui_name }님</strong>
                        </div>
                        <div className="board__time">{timer}</div>
                </div>
            }
        </>
    )

}

export default MainTimer;


