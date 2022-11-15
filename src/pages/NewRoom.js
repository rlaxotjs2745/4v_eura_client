import React, {useEffect, useState} from "react";
import axios from "axios";
import {AXIOS_FORM_DATA_OPTION, AXIOS_OPTION, SERVER_URL} from "../util/env";
import ModifyRoomUser from "../Components/Cards/ModifyRoomUser";
import {useNavigate} from "react-router-dom";
import $ from "jquery";
import AddMeetingUser from "../Components/Cards/AddMeetingUser";
import {upload} from "@testing-library/user-event/dist/upload";

const MAX_COUNT = 5;

const NewRoom = () => {

    const navigate = useNavigate();

    const [roomInfo, setRoomInfo] = useState({});
    const [isNew, setIsNew] = useState(true);
    const [invites, setInvites] = useState([]);
    const [invCount, setInvCount] = useState('');
    const [delUser, setDelUser] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const [remindBool, setRemindBool] = useState(false);
    const [weekday, setWeekday] = useState([]);

    const [selectValue, setSelectValue] = useState(1);
    const [remindCount, setRemindCount] = useState(0);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [meetingInfo, setMeetingInfo] = useState('');

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);

    // const chosenFiles = Array.prototype.slice.call(e.target.files)

    const handleUploadFiles = files => {
        const uploaded = [...uploadedFiles];
        let limitExceeded = false;
        files.some((file) => {
            if(uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                // uploaded.length === MAX_COUNT ? setFileLimit(true) : setFileLimit(false)
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


    // const handleFileDeleteEvent = (e) => {
    //     const newRe = uploadedFiles.filter((it)=> it.name !== e);
    //     setUploadedFiles(newRe)
    //     console.log(uploadedFiles)
    // };
    const handleFileDeleteEvent = (e) => {
        let uploaded = [...uploadedFiles]
        let indexNumber = e.target.parentNode.parentNode
        let i = 0;
        while( indexNumber = indexNumber.previousSibling ) {
            if( indexNumber.nodeType === 1 ) {
                i++;
            }
        }
        const index2 = i

        setUploadedFiles(uploaded.filter((i , index) => index !== index2))
        setFileLimit(false)
    }


    useEffect(() => {
        if(window.location.pathname.split('/')[window.location.pathname.split('/').length-1] !== 'newroom'){ //수정하기
            if(roomInfo.mt_remind_type !== 0){
                setRemindBool(!remindBool);
            }
            axios.get(SERVER_URL +
                `/meet/room/info?idx_meeting=${window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}`,
                AXIOS_OPTION)
                .then(res => {
                    setRoomInfo(res.data.data);
                    setIsNew(false);
                    if(res.data.data.mt_remind_type !== 0){
                        // setRemindBool(!remindBool);
                    }
                })
            axios.get(SERVER_URL +
                `/meet/room/invite?idx_meeting=${window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}`,
                AXIOS_OPTION)
                .then(res => {
                    setInvCount(res.data.data.mt_invites.length);
                    setInvites(res.data.data.mt_invites);
                })
        }
    }, [])

    useEffect(() => {
        console.log(invites);
    }, [invites]);


    const searchInviteUserList = (e) => {
        let searchWord = e.target.value;
        axios.get(SERVER_URL +
            `/meet/invite?searchTxt=${searchWord}`,
            AXIOS_OPTION)
            .then(res => {
                setSearchUser(res.data.data.mt_invites);
            })
    }

    const excludeUser = (user) => {
        let targetIdx;
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
    }


    const addUser = (user) => {
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

    $(document.body).on('click', '#make_team', function () {
        $(".flow__team").slideDown();
    });
    $(document.body).on('mouseleave', '.flow__team', function () {
        $(".flow__team").slideUp();
    });

    const remindChange = (e) => {
        setRemindBool(!remindBool);
        e.target.checked = !remindBool;
    }

    const getWeekDay = (num) => {
        setWeekday([...new Set([...weekday, num])]);
    }

    const handleChange = (e) => {
        // console.log(e.target.value);
        if (e.target.value == 1) {
            setSelectValue(1)
        } else if (e.target.value == 2) {
            setSelectValue(2)
        } else if (e.target.value == 3) {
            setSelectValue(3)
        } else if (e.target.value == 4) {
            setSelectValue(4)
        }
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

        if($('#make_new').value == ''){
            return alert('미팅 이름을 입력해주세요.')
        }

        if($('#make_date').value == ''){
            return alert('미팅 일자가 입력되지 않았습니다.')
        }

        if($('#make_time1').value == ''){
            return alert('미팅 시작 시간이 입력되지 않았습니다.')
        }

        if($('#make_time2').value == ''){
            return alert('미팅 종료 시간이 입력되지 않았습니다.')
        }

        if($('#make_room').value == ''){
            return alert('미팅 정보가 입력되지 않았습니다.');
        }

        const formData = new FormData();
        formData.append('mt_name', title);
        formData.append('mt_start_dt', `${startDate} ${startTime}`);
        formData.append('mt_end_dt', `${startDate} ${endTime}`);
        formData.append('mt_info', meetingInfo);
        formData.append('mt_invite_email', invites.map(inv => inv.email).join());
        if(remindBool){
            formData.append('mt_remind_type', selectValue);
            formData.append('mt_remind_count', remindCount);
            formData.append('mt_remind_week', weekday.join());
            formData.append('mt_remind_end', endDate);
        } else {
            formData.append('mt_remind_type', 0);
        }
        formData.append('file', uploadedFiles);
        if(isNew) {
            axios.post(SERVER_URL + '/meet/create', formData, AXIOS_FORM_DATA_OPTION)
                .then(res => {
                    console.log(res)
                    console.log(res.data.result_code)
                    if(res.data.result_code == 'SUCCESS'){
                        alert('미팅룸을 생성했습니다.');
                        navigate('/');
                    }
                })
        } else {
            formData.append('idx_meeting', window.location.pathname.split('/')[window.location.pathname.split('/').length-1]);
            axios.post(SERVER_URL + '/meet/modify', formData, AXIOS_FORM_DATA_OPTION)
                .then(res => {
                    if(res.data.result_code == 'SUCCESS'){
                        alert('미팅룸을 수정했습니다.');
                        navigate('/');
                    }
                })
        }
    }

    return (
        <div className="room">
            <h2>
                {
                    isNew ? '새 미팅룸 만들기' : '미팅룸 수정하기'
                }
            </h2>

            <div className="room__box">
                <div className="input__group ">
                    <label htmlFor="make_new">미팅 이름</label>
                    <input type="text" className="text" id="make_new" onChange={makeTitle} placeholder="미팅 이름을 입력해주세요." defaultValue={isNew ? '' : roomInfo.mt_name}/>
                    <hr />
                        <label htmlFor="make_date"><img src="../assets/image/ic_calendar_24.png" alt="" /></label>
                        <input id="make_date" type="date" className="text under-scope width-flexble"
                               onChange={makeDate}
                               defaultValue={isNew ? '' : roomInfo.mt_start_dt.split(' ')[0]}
                        />
                            <label htmlFor="make_time" className="input__time"><img src="../assets/image/ic_time_24.png" alt="" /></label>
                            <input id="make_time1" type="time"
                                   pattern="[0-9]{2}:[0-9]{2}"
                                   className="text under-scope width-flexble"
                                   onChange={makeTime1}
                                   defaultValue={isNew ? '' : roomInfo.mt_start_dt.split(' ')[1]}
                            />
                                <span className="bar">-</span>
                                <input id="make_time2" type="time" className="text under-scope width-flexble"
                                       onChange={makeTime2}
                                       defaultValue={isNew ? '' : roomInfo.mt_end_dt.split(' ')[1]}
                                />

                                <hr />
                                    <div className="checkbox type__square">
                                        <input type="checkbox" className="checkbox" id="remind_bool" onChange={remindChange} checked={remindBool}/>
                                        <label htmlFor="remind_bool">되풀이 미팅</label>
                                    </div>
                    {remindBool ?
                        <div id="remind_meeting">
                            <dl className="inline__type">
                                <dt><label htmlFor="room_repeat">반복 주기</label></dt>
                                <dd>
                                    <select onChange={handleChange} name="" id="room_repeat" className="make-select">
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
                                    <select name="" id="room_repeat2" onChange={selectRemindCount} className="make-select">
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
                                        : null
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
                                                    <label htmlFor="월">월</label>
                                                </div>
                                                <div className="checkbox type__square">
                                                    <input type="checkbox" className="checkbox" id="week_3"onChange={() => getWeekDay(3)} />
                                                    <label htmlFor="화">화</label>
                                                </div>
                                                <div className="checkbox type__square">
                                                    <input type="checkbox" className="checkbox" id="week_4" onChange={() => getWeekDay(4)} />
                                                    <label htmlFor="수">수</label>
                                                </div>
                                                <div className="checkbox type__square">
                                                    <input type="checkbox" className="checkbox" id="week_5"onChange={() => getWeekDay(5)} />
                                                    <label htmlFor="목">목</label>
                                                </div>
                                                <div className="checkbox type__square">
                                                    <input type="checkbox" className="checkbox" id="week_6" onChange={() => getWeekDay(6)} />
                                                    <label htmlFor="금">금</label>
                                                </div>
                                                <div className="checkbox type__square">
                                                    <input type="checkbox" className="checkbox" id="week_7" onChange={() => getWeekDay(7)} />
                                                    <label htmlFor="토">토</label>
                                                </div>
                                                <div className="checkbox type__square">
                                                    <input type="checkbox" className="checkbox" id="week_1" onChange={() => getWeekDay(1)} />
                                                    <label htmlFor="일">일</label>
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
                    <textarea name="" id="make_room" cols="10" rows="3" placeholder="미팅정보를 입력해주세요." onChange={makeMeetingInfo} defaultValue={isNew ? '' : roomInfo.mt_info}></textarea>
                </div>

                <div className="input__group">
                    <label htmlFor="">참석자 명단</label>
                    <div className="list__count">총 {!invites || !invites.length ? 0 : invites.length}명</div>
                    <div className="list__guest">
                        <ul>
                            {
                                !invites || !invites.length ? '' :
                                    invites.map((inv) => {
                                        return <ModifyRoomUser user={inv} excludeUser={excludeUser}/>
                                    })
                            }
                        </ul>
                    </div>
                </div>

                <div className="input__group" id="hahhhoho">
                    <label htmlFor="make_team">참석자 추가</label>
                    {/*<div className="list__count"><a href="#none" className="btn btn__download">엑셀 양식 다운로드</a></div>*/}
                    <div className="flow_box input__inline">
                        <input id="make_team" type="text" className="text" placeholder="이메일 또는 이름을 입력해 참석자를 추가하세요." onChange={searchInviteUserList} />
                            {/*<a href="#popup__team" className="btn btn__team js-modal-alert">*/}
                            {/*    <img src="../assets/image/ic_participant_14.png" alt="" />단체추가하기*/}
                            {/*</a>*/}
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
                                     <button onClick={handleFileDeleteEvent} className="btn btn__delete"><img src={require('../assets/image/ic_cancle-circle_18.png')} alt="삭제"/></button>
                                 </li>
                             ))}
                         </ul>
                    </div>
                </div>
            </div>

            <div className="btn__box">
                <div className="btn__group">
                    {
                        isNew ?
                        <div onClick={() => navigate('/')} className="btn btn__normal">취소</div>
                        :
                        <div onClick={() => navigate(`/meetingroom/${window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}`)} className="btn btn__normal">취소</div>
                    }
                    <div onClick={handleSubmit} className="btn btn__able">저장</div>
                </div>
            </div>

            <div id="popup__team" className="pop__detail ">
                <div className="popup__cnt">
                    <div className="pop__message">
                        <h3>참석자 단체 등록하기</h3>
                        <div className="pop__body">
                            <div className="upload__box ">
                                <input className="upload-name" value="이메일이 입력된 엑셀파일을 첨부해주세요." disabled />
                                    <label htmlFor="ex_filename"><img src="../assets/image/ic_attachment_24.png" alt=""/></label>
                                    <input type="file" id="ex_filename" className="upload-hidden"/>
                            </div>
                            <div className="upload__list">

                            </div>
                        </div>
                    </div>
                    <div className="btn__group align__right">
                        <a href="#none" className="btn btn__normal btn__s">취소</a>
                        <a href="#none" className="btn btn__able btn__s js-modal-close">완료</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NewRoom;