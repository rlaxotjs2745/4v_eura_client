const React = require("react");
const {useState} = require("react");




const MainTimer = (user) => {

    const [timer, setTimer] = useState("00:00")
    const currentTimer = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        setTimer(`${hours}:${minutes}:${seconds}`);
    }

    const startTimer = () => {
        setInterval(currentTimer, 1000);
    }
    startTimer();

    return (
        <div className="main__board">
            <div className="board__user">
                <figure><img src={user.ui_pic ? user.ui_pic : require('../../assets/image/image_profile.png')} alt=""/></figure>
                <span>안녕하세요</span>
                <strong>{user.ui_name ?  user.ui_name : '유저유저'}님</strong>
            </div>
            <div className="board__time">{timer}</div>
        </div>
    )

}

export default MainTimer;


