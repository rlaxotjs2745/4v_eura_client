import React, {useEffect, useState} from "react";
import axios from "axios";
import {AXIOS_FORM_DATA_OPTION, AXIOS_FORM_DATA_OPTION_NOUSER, AXIOS_OPTION, SERVER_URL} from "../util/env";
import ModifyRoomUser from "../Components/Cards/ModifyRoomUser";
import {useLocation, useNavigate} from "react-router-dom";
import $ from "jquery";
import AddMeetingUser from "../Components/Cards/AddMeetingUser";
import {getCookie} from "../util/cookie";
import Select from 'react-select'


const MAX_COUNT = 99;

const NewRoom = () => {

    const { pathname } = useLocation();
    const pathSplit = Number(pathname.split('/')[2])
    const navigate = useNavigate();
    const fileReader = new FileReader();

    const [roomInfo, setRoomInfo] = useState({});
    const [isNew, setIsNew] = useState(0);
    const [invites, setInvites] = useState([]);
    const [invCount, setInvCount] = useState('');
    const [delUser, setDelUser] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const [remindBool, setRemindBool] = useState(false);
    const [weekday, setWeekday] = useState([]);

    const [selectValue, setSelectValue] = useState(1);
    const [remindCount, setRemindCount] = useState(0);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString().replaceAll('. ' , '-').slice(0,new Date().toLocaleDateString().length -3));
    const [startTime, setStartTime] = useState(new Date().getHours() + ':' + new Date().getMinutes() + ':00');
    const [endTime, setEndTime] = useState(new Date().getHours() + ':' + new Date().getMinutes() + ':00');
    const [endDate, setEndDate] = useState('');
    const [meetingInfo, setMeetingInfo] = useState('');

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadedFilesPlus, setUploadedFilesPlus] = useState([]);
    const [delFiles, setDelFiles] = useState([]);

    const [fileLimit, setFileLimit] = useState(false);

    const [groupModal, setGroupModal] = useState('pop__detail');
    const [groupFileName, setGroupFileName] = useState('이메일이 입력된 엑셀파일을 첨부해주세요.')
    const [groupSearchUser, setGroupSearchUser] = useState([]);

    const [Selected1, setSelected1] = useState('');
    const [Selected2, setSelected2] = useState('');
    const [Selected3, setSelected3] = useState('');
    const [Selected4, setSelected4] = useState('');

    const select1_opiton = [
        { value: "00", label: "00", idx:"00"},
        { value: "01", label: "01", idx:"01"},
        { value: "02", label: "02", idx:"02"},
        { value: "03", label: "03", idx:"03"},
        { value: "04", label: "04", idx:"04"},
        { value: "05", label: "05", idx:"05"},
        { value: "06", label: "06", idx:"06"},
        { value: "07", label: "07", idx:"07"},
        { value: "08", label: "08", idx:"08"},
        { value: "09", label: "09", idx:"09"},
        { value: "10", label: "10", idx:"10"},
        { value: "11", label: "11", idx:"11"},
        { value: "12", label: "12", idx:"12"},
        { value: "13", label: "13", idx:"13"},
        { value: "14", label: "14", idx:"14"},
        { value: "15", label: "15", idx:"15"},
        { value: "16", label: "16", idx:"16"},
        { value: "17", label: "17", idx:"17"},
        { value: "18", label: "18", idx:"18"},
        { value: "19", label: "19", idx:"19"},
        { value: "20", label: "20", idx:"20"},
        { value: "21", label: "21", idx:"21"},
        { value: "22", label: "22", idx:"22"},
        { value: "23", label: "23", idx:"23"},
    ];

    const select2_opiton = [
        { value: "00", label: "00", idx:"00"},
        { value: "10", label: "10", idx:"01"},
        { value: "20", label: "20", idx:"02"},
        { value: "30", label: "30", idx:"03"},
        { value: "40", label: "40", idx:"04"},
        { value: "50", label: "50", idx:"05"},
    ];

    const select3_opiton = [
        { value: "00", label: "00", idx:"00"},
        { value: "01", label: "01", idx:"01"},
        { value: "02", label: "02", idx:"02"},
        { value: "03", label: "03", idx:"03"},
        { value: "04", label: "04", idx:"04"},
        { value: "05", label: "05", idx:"05"},
        { value: "06", label: "06", idx:"06"},
        { value: "07", label: "07", idx:"07"},
        { value: "08", label: "08", idx:"08"},
        { value: "09", label: "09", idx:"09"},
        { value: "10", label: "10", idx:"10"},
        { value: "11", label: "11", idx:"11"},
        { value: "12", label: "12", idx:"12"},
        { value: "13", label: "13", idx:"13"},
        { value: "14", label: "14", idx:"14"},
        { value: "15", label: "15", idx:"15"},
        { value: "16", label: "16", idx:"16"},
        { value: "17", label: "17", idx:"17"},
        { value: "18", label: "18", idx:"18"},
        { value: "19", label: "19", idx:"19"},
        { value: "20", label: "20", idx:"20"},
        { value: "21", label: "21", idx:"21"},
        { value: "22", label: "22", idx:"22"},
        { value: "23", label: "23", idx:"23"},
    ];

    const select4_opiton = [
        { value: "00", label: "00", idx:"00"},
        { value: "10", label: "10", idx:"01"},
        { value: "20", label: "20", idx:"02"},
        { value: "30", label: "30", idx:"03"},
        { value: "40", label: "40", idx:"04"},
        { value: "50", label: "50", idx:"05"},
    ];

    const handleSelect1 = (e) => {
        setSelected1(e.target.value);
    };
    const handleSelect2 = (e) => {
        setSelected2(e.target.value);
    };
    const handleSelect3 = (e) => {
        setSelected3(e.target.value);
    };
    const handleSelect4 = (e) => {
        setSelected4(e.target.value);
    };

    // const chosenFiles = Array.prototype.slice.call(e.target.files)
    useEffect(() => {
        if(pathname.indexOf('reopen')>-1){
        // if(window.location.pathname.split('/')[window.location.pathname.split('/').length-2] === 'reopen'){
            setIsNew(2);
        }else if(pathname.indexOf('/newroom/')>-1){
            setIsNew(1);
        }
            axios.get(SERVER_URL +
                `/meet/room/info?idx_meeting=${pathSplit}`,
                AXIOS_OPTION)
                .then(res => {
                    // console.log(res.data.data)
                    const room = res.data.data;
                    console.log(room)
                    setTitle(room.mt_name);
                    setStartDate(room.mt_start_dt.split(' ')[0]);
                    setStartTime(room.mt_start_dt.split(' ')[1]);
                    setEndTime(room.mt_end_dt.split(' ')[1]);
                    setSelectValue(room.mt_remind_type);
                    setRemindCount(room.mt_remind_count);
                    setEndDate(room.mt_end_dt.split(' ')[0]);
                    setMeetingInfo(room.mt_info);
                    setRoomInfo(room);
                    setUploadedFilesPlus(room.mt_files);
                    setSelected1(room.mt_start_dt.split(' ')[1].split(':')[0])
                    setSelected2(room.mt_start_dt.split(' ')[1].split(':')[1])
                    setSelected3(room.mt_end_dt.split(' ')[1].split(':')[0])
                    setSelected4(room.mt_end_dt.split(' ')[1].split(':')[1])

                    if(room.mt_remind_type !== 0){
                        setRemindBool(true);
                    }

                    if(room.mt_remind_week !== null) {
                        setWeekday(room.mt_remind_week.split(','));
                    }
                })
            axios.get(SERVER_URL +
                `/meet/room/invite?idx_meeting=${pathSplit}`,
                AXIOS_OPTION)
                .then(res => {
                    setInvCount(res.data.data.mt_invites.length);
                    setInvites(res.data.data.mt_invites);
                })

    }, [])

    useEffect(() => {
        setRemindBool(!!roomInfo.mt_remind_type);
    }, [roomInfo]);


    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if(uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                uploaded.length === MAX_COUNT ? setFileLimit(true) : setFileLimit(false)
                if(uploaded.length > MAX_COUNT) {
                    alert(`파일은 최대 ${MAX_COUNT}개 까지 첨부할 수 있습니다.`)
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)
    }

    const handleFileEvent =  (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles)
    }

    const handleModal = (e) => {
        if(e) e.preventDefault()
        if(groupModal === 'pop__detail'){
            setGroupModal('pop__detail is-on');
            $('#shade').addClass('is-on');
        } else {
            setGroupModal('pop__detail');
            $('#shade').removeClass('is-on');
        }
    }


    const handleFileDeleteEvent = (e) => {
        let uploaded = [...uploadedFiles]
        let indexNumber = e.target.parentNode.parentNode
        let i = 0;
        while( indexNumber = indexNumber.previousSibling ) {
            if( indexNumber.nodeType === 1 ) {
                i++;
            }
        }
        let index2 = i
        setUploadedFiles(uploaded.filter((i , index) => index !== index2))
        setFileLimit(false)
    }

    const handleFileDeleteEvent2 = (e) => {
        let uploaded = [...uploadedFilesPlus]
        // console.log(uploaded)
        let indexNumber = e.target.parentNode.parentNode
        let i = 0;
        while( indexNumber = indexNumber.previousSibling ) {
            if( indexNumber.nodeType === 1 ) {
                i++;
            }
        }
        let index2 = i
        setUploadedFilesPlus(uploaded.filter((i , index) => {
            if(index === index2){
                setDelFiles([...delFiles ,i.idx])
            }
            return index !== index2
        }))
        setFileLimit(false)
    }



    const searchInviteUserList = (e) => {
        let searchWord = e.target.value;
        axios.get(SERVER_URL +
            `/meet/invite?searchTxt=${searchWord}`,
            AXIOS_OPTION)
            .then(res => {
                setSearchUser(res.data.data.mt_invites);
            })
    }

    const getGroupFile = (e) => {
        const chosenFile = e.target.files[0];
        setGroupFileName(chosenFile && chosenFile.name ? chosenFile.name : '이메일이 입력된 엑셀파일을 첨부해주세요.');
        fileReader.onload = (eve) => {
            const csvOutput = eve.target.result;
            axios.get(SERVER_URL +
                `/meet/invite?searchTxt=${csvOutput.toString().trim().replace(/\r\n/g, '$%&').split('$%&').slice(1).join(',')}`,
                AXIOS_OPTION)
                .then(res => {
                    console.log(res);
                    setGroupSearchUser(res.data.data.mt_invites);
                })
        }

        fileReader.readAsText(chosenFile);
    }

    const excludeUser = (user, isSearch) => {
        if(!isSearch){
            let targetIdx;
            if(user.email === getCookie('user_id')){
                return alert('호스트는 제거할 수 없습니다.');
            }

            invites.forEach((inv, idx) => {
                if(inv.idx === user.idx) {
                    targetIdx = idx;
                }
            })

            setInvites([...invites.slice(0, targetIdx), ...invites.slice(targetIdx+1)]);
            if(delUser === ''){
                setDelUser(user.email);
            } else {
                setDelUser(delUser + ',' + user.email);
            }
        } else {
            setGroupSearchUser(groupSearchUser.filter(inv => inv.email != user.email));
        }
    }


    const addUser = (user) => {
        if(user.email === getCookie('user_id')){
            return;
        }

        let isExist = false;
        invites.forEach(inv => {
            if(inv.idx === user.idx){
                isExist = true;
            }
        })
        if(isExist){
            return;
        }
        setInvites([...invites, user]);
        let targetIdx;
        searchUser.forEach((us, idx) => {
            if(us.idx == user.idx){
                targetIdx = idx;
            }
        })
        setSearchUser([...searchUser.slice(0, targetIdx), ...searchUser.slice(targetIdx+1)]);
    }

    const addSearchGroupUser = () => {
        setInvites([...invites, ...groupSearchUser.filter(user => {
            let result = true;
            invites.forEach(inv => {
                if(inv.email === user.email){
                    result = false;
                }
            })
            return result;
        })]);
        handleModal();
    }

    $(document.body).on('click', '#make_team', function () {
        $(".flow__team").slideDown();
    });
    $(document.body).on('mouseleave', '.flow__team', function () {
        $(".flow__team").slideUp();
    });

    const remindChange = (e) => {
        setRemindBool(!remindBool);
        // e.target.checked = !remindBool;
    }

    const getWeekDay = (num) => {
        setWeekday([...new Set([...weekday, num])]);
    }

    const handleChange = (e) => {
        setSelectValue(parseInt(e.target.value))
    };

    const makeTitle = (e) => {
        setTitle(e.target.value);
    }

    const makeDate = (e) => {
        setStartDate(e.target.value);
    }

    const makeTime1 = (e) => {
        setStartTime(e.target.value);
    }

    const makeTime2 = (e) => {
        setEndTime(e.target.value);
    }

    const makeEndDate = (e) => {
        setEndDate(e.target.value);
    }

    const makeMeetingInfo = (e) => {
        setMeetingInfo(e.target.value);
    }

    const selectRemindCount = (e) => {
        setRemindCount(parseInt(e.target.value));
    }

    const handleSubmit = () => {

        if($('#make_new').val() == ''){
            return alert('미팅 이름을 입력해주세요.')
        }

        if($('#make_date').val() == ''){
            return alert('미팅 일자가 입력되지 않았습니다.')
        }

        if(new Date(endTime) <= new Date(startTime)){
            return alert('미팅 종료 시간은 시작 시간보다 이를 수 없습니다.');
        }

        if($('#make_time1').val() == ''){
            return alert('미팅 시작 시간이 입력되지 않았습니다.')
        }

        if($('#make_time2').val() == ''){
            return alert('미팅 종료 시간이 입력되지 않았습니다.')
        }

        if($('#make_room').val() == ''){
            return alert('미팅 정보가 입력되지 않았습니다.');
        }

        const formData = new FormData();
        formData.append('mt_name', title);
        formData.append('mt_start_dt',  startTime.length > 7 ? `${startDate} ${Selected1}:${Selected2}` : `${startDate} ${Selected1}:${Selected2}:00`);
        formData.append('mt_end_dt',   endTime.length > 7 ? `${startDate} ${Selected3}:${Selected4}` : `${startDate} ${Selected3}:${Selected4}:00`);
        formData.append('mt_info', meetingInfo);
        formData.append('mt_invite_email', invites.map(inv => inv.email).join());
        for (let i = 0; i < uploadedFiles.length; i++) {
            formData.append("file", uploadedFiles[i]);
        }
        if(remindBool){
            formData.append('mt_remind_type', parseInt(selectValue));
            formData.append('mt_remind_count', remindCount);
            if(selectValue == 2){
                formData.append('mt_remind_week', weekday.join());
            }
            formData.append('mt_remind_end', endDate);
        } else {
            formData.append('mt_remind_type', 0);
        }

        // formData.append('file', uploadedFiles);

        if(isNew === 0) {
            axios.post(SERVER_URL + '/meet/create', formData, AXIOS_OPTION)
                .then(res => {
                    if(res.data.result_code === 'SUCCESS'){
                        alert('미팅룸을 생성했습니다.');
                        navigate('/');
                    }else{
                        alert(res.data.result_str);
                    }
                }).catch(res => console.log(res))
        } else {
            formData.append('idx_meeting', window.location.pathname.split('/')[window.location.pathname.split('/').length-1]);
            if(delFiles.length > 0){
                formData.append('file_del', delFiles.join());
            }
            if(delUser.length > 0){
                formData.append('invite_del', delUser);
            }
            for(let i of formData){
                console.log(i);
            }
            axios.post(SERVER_URL + '/meet/modify', formData, AXIOS_OPTION)
                .then(res => {
                    if(res.data.result_code === 'SUCCESS'){
                        alert('미팅룸을 수정했습니다.');
                        navigate('/');
                    }else{
                        alert(res.data.result_str);
                    }
                }).catch(res => console.log(res))
        }
    }



    return (
        <div className="room">
            <h2>
                {
                    isNew === 0 ? '새 미팅룸 만들기' : isNew === 1 ?  '미팅룸 수정하기' : '미팅룸 재개설하기'
                }
            </h2>
            <form encType="multipart/form-data">
                <div className="room__box">
                    <div className="input__group ">
                        <label htmlFor="make_new">미팅 이름</label>
                        <input type="text" className="text" id="make_new" onChange={makeTitle} placeholder="미팅 이름을 입력해주세요." defaultValue={isNew === 0 ? '' : roomInfo.mt_name}/>
                        <hr />
                        <div className="flex_box">
                            <label htmlFor="make_date"><img src="../assets/image/ic_calendar_24.png" alt="" /></label>

                            <input id="make_date" type="date" className="text under-scope width-flexble"
                                   onChange={makeDate}
                                   value={startDate}
                            />
                            <label htmlFor="make_time" className="input__time"><img src="../assets/image/ic_time_24.png" alt="" /></label>
                            <div className="flex_time">
                                <div className="relative">
                                    <select onChange={handleSelect1} value={Selected1}>
                                        {select1_opiton.map((item) => (
                                            <option value={item.value} key={item.idx}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                    시
                                    <select onChange={handleSelect2} value={Selected2}>
                                        {select2_opiton.map((item) => (
                                            <option value={item.value} key={item.idx}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                    분
                                </div>
                                <span className="bar">-</span>
                                <div className="relative">
                                    <select onChange={handleSelect3} value={Selected3}>
                                        {select3_opiton.map((item) => (
                                            <option value={item.value} key={item.idx}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                    시
                                    <select onChange={handleSelect4} value={Selected4}>
                                        {select4_opiton.map((item) => (
                                            <option value={item.value} key={item.idx}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                    분
                                </div>
                            </div>
                            {/*<input id="make_time1" type="time"*/}
                            {/*       pattern="[0-9]{2}:[0-9]{2}"*/}
                            {/*       className="text under-scope width-flexble"*/}
                            {/*       onChange={makeTime1}*/}
                            {/*       value={startTime}*/}
                            {/*/>*/}
                            {/*<input id="make_time2" type="time" className="text under-scope width-flexble"*/}
                            {/*       onChange={makeTime2}*/}
                            {/*       value={endTime}*/}
                            {/*/>*/}
                        </div>
                        <hr />
                        <div className="checkbox type__square">
                            <input type="checkbox" className="checkbox" id="remind_bool" onChange={remindChange} defaultValue={remindBool}/>
                            <label htmlFor="remind_bool">되풀이 미팅</label>
                        </div>
                        {remindBool ?
                            <div id="remind_meeting">
                                <dl className="inline__type">
                                    <dt><label htmlFor="room_repeat">반복 주기</label></dt>
                                    <dd>
                                        <select onChange={handleChange} name="" id="room_repeat" className="make-select" defaultValue={selectValue}>
                                            <option value="1">매일</option>
                                            <option value="2">주</option>
                                            <option value="3">월</option>
                                            <option value="4">년</option>
                                        </select>
                                    </dd>
                                    <dt><label htmlFor="room_repeat2">반복 횟수</label></dt>
                                    <dd>
                                        {
                                            selectValue === 1 ?
                                                <select name="" id="room_repeat2" onChange={selectRemindCount} className="make-select" defaultValue={weekday}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                    <option value="16">16</option>
                                                    <option value="17">17</option>
                                                    <option value="18">18</option>
                                                    <option value="19">19</option>
                                                    <option value="20">20</option>
                                                    <option value="21">21</option>
                                                    <option value="22">22</option>
                                                    <option value="23">23</option>
                                                    <option value="24">24</option>
                                                    <option value="25">25</option>
                                                    <option value="26">26</option>
                                                    <option value="27">27</option>
                                                    <option value="28">28</option>
                                                    <option value="29">29</option>
                                                    <option value="30">30</option>
                                                </select>
                                                :
                                                <select name="" id="room_repeat2" onChange={selectRemindCount} className="make-select">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>

                                        }
                                        {
                                            selectValue === 1 ? '일'
                                                : selectValue === 2 ? '주'
                                                    : selectValue === 3 ? '개월'
                                                        : selectValue === 4 ? '년'
                                                            : '일'
                                        }
                                    </dd>
                                </dl>
                                {
                                    selectValue === 2 ?
                                        <>
                                            <hr />
                                            <dl className="inline__type">
                                                <dt><label htmlFor="월">반복 요일</label></dt>
                                                <dd>
                                                    <div className="checkbox type__square">
                                                        <input type="checkbox" className="checkbox" id="week_2" onChange={() => getWeekDay(2)} />
                                                        <label htmlFor="week_2">월</label>
                                                    </div>
                                                    <div className="checkbox type__square">
                                                        <input type="checkbox" className="checkbox" id="week_3"onChange={() => getWeekDay(3)} />
                                                        <label htmlFor="week_3">화</label>
                                                    </div>
                                                    <div className="checkbox type__square">
                                                        <input type="checkbox" className="checkbox" id="week_4" onChange={() => getWeekDay(4)} />
                                                        <label htmlFor="week_4">수</label>
                                                    </div>
                                                    <div className="checkbox type__square">
                                                        <input type="checkbox" className="checkbox" id="week_5"onChange={() => getWeekDay(5)} />
                                                        <label htmlFor="week_5">목</label>
                                                    </div>
                                                    <div className="checkbox type__square">
                                                        <input type="checkbox" className="checkbox" id="week_6" onChange={() => getWeekDay(6)} />
                                                        <label htmlFor="week_6">금</label>
                                                    </div>
                                                    <div className="checkbox type__square">
                                                        <input type="checkbox" className="checkbox" id="week_7" onChange={() => getWeekDay(7)} />
                                                        <label htmlFor="week_7">토</label>
                                                    </div>
                                                    <div className="checkbox type__square">
                                                        <input type="checkbox" className="checkbox" id="week_1" onChange={() => getWeekDay(1)} />
                                                        <label htmlFor="week_1">일</label>
                                                    </div>
                                                </dd>
                                            </dl>
                                        </> : null
                                }
                                <hr />
                                <dl className="inline__type">
                                    <dt><label htmlFor="종료 날짜">종료 날짜</label></dt>
                                    <dd>
                                        <input id="meeting_end_date" type="date" onChange={makeEndDate} className="text under-scope" />
                                    </dd>
                                </dl>
                            </div>
                            :
                            null
                        }

                    </div>

                    <div className="input__group">
                        <label htmlFor="make_room">미팅 정보</label>
                        <textarea name="" id="make_room" cols="10" rows="3" placeholder="미팅정보를 입력해주세요." onChange={makeMeetingInfo} value={meetingInfo}></textarea>
                    </div>

                    <div className="input__group">
                        <label htmlFor="">참석자 명단</label>
                        <div className="list__count">총 {!invites || !invites.length ? 0 : invites.length}명</div>
                        <div className="list__guest">
                            <ul>
                                {
                                    !invites || !invites.length ? '' :
                                        invites.map((inv) => {
                                            return <ModifyRoomUser user={inv} isSearch={0} excludeUser={excludeUser}/>
                                        })
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="input__group" id="hahhhoho">
                        <label htmlFor="make_team">참석자 추가</label>
                        <div className="list__count"><a href="https://eura-server.s3.ap-northeast-2.amazonaws.com/upload/EURA_%EB%AF%B8%ED%8C%85_%EC%B0%B8%EC%84[…]B2%B4_%EC%B6%94%EA%B0%80_%EC%96%91%EC%8B%9D.csv" className="btn btn__download">엑셀 양식 다운로드</a></div>
                        <div className="flow_box input__inline">
                            <input id="make_team" type="text" className="text" placeholder="이메일 또는 이름을 입력해 참석자를 추가하세요." onChange={searchInviteUserList} />
                            <button onClick={handleModal} className="btn btn__team js-modal-alert">
                                <img src="../assets/image/ic_participant_14.png" alt="" />단체추가하기
                            </button>
                        </div>
                        <div className="flow__team">
                            <ul>
                                {
                                    !searchUser || !searchUser.length ? '' :
                                        searchUser.map(user => {
                                            return <AddMeetingUser user={user} addUser={addUser}/>
                                        })
                                }
                            </ul>
                        </div>

                    </div>

                    <div className="input__group">
                        <div style={{display:"inline-block"}}>첨부파일<input className="sr-only" type="file" name="file_upload" id="fileUpload" multiple accept="application/pdf, image/*" onChange={handleFileEvent} disabled={fileLimit}/><label style={{marginLeft:"10px"}} htmlFor="fileUpload"><span  className="btn btn__download"><img src={require('../assets/image/ic_attachment_14.png')} alt="" />파일 업로드</span></label></div>


                        <div className="list__upload">
                            <ul>
                                {uploadedFiles.map(file =>(
                                    <li>
                                        <a href="#none">
                                            <img src={require('../assets/image/ic_file_14.png')} alt="" /><span className="file__name">{file.name}</span><em
                                            className="file__size">{file.size + 'KB'}</em>
                                        </a>
                                        <button type="button" onClick={handleFileDeleteEvent} className="btn btn__delete"><img src={require('../assets/image/ic_cancle-circle_18.png')} alt="삭제"/></button>
                                    </li>
                                ))}
                                {uploadedFilesPlus.map(file =>(
                                    <li>
                                        <a href={file.download} download>
                                            <img src={require('../assets/image/ic_file_14.png')} alt="" /><span className="file__name">{file.files}</span><em
                                            className="file__size">{file.fileSize + 'KB'}</em>
                                        </a>
                                        <button type="button" onClick={handleFileDeleteEvent2} className="btn btn__delete"><img src={require('../assets/image/ic_cancle-circle_18.png')} alt="삭제"/></button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="btn__box">
                    <div className="btn__group">
                        {
                            isNew === 0 ?
                                <div onClick={() => navigate('/')} className="btn btn__normal">취소</div>
                                :
                                <div onClick={() => navigate(`/meetingroom/${window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}`)} className="btn btn__normal">취소</div>
                        }
                        <div onClick={handleSubmit} className="btn btn__able">{isNew === 2 ? '재개설' : '저장'}</div>
                    </div>
                </div>
            </form>
            <div id="popup__team" className={groupModal}>
                <div className="popup__cnt">
                    <div className="pop__message">
                        <h3>참석자 단체 등록하기</h3>
                        <div className="pop__body">
                            <div className="upload__box ">
                                <input className="upload-name" value={groupFileName} disabled />
                                <label htmlFor="ex_filename"><img src="../assets/image/ic_attachment_24.png" alt=""/></label>
                                <input type="file" accept=".csv" id="ex_filename" onChange={getGroupFile} className="upload-hidden"/>
                            </div>
                            <div className="upload__list">
                                <ul>
                                    {
                                        !groupSearchUser || !groupSearchUser.length ? '' :
                                            groupSearchUser.map(user => {
                                                return <ModifyRoomUser user={user} isSearch={1} excludeUser={excludeUser}/>
                                            })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="btn__group align__right">
                        <button onClick={handleModal} className="btn btn__normal btn__s">취소</button>
                        <button onClick={addSearchGroupUser} className="btn btn__able btn__s js-modal-close">완료</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NewRoom;