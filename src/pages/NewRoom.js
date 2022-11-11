import React, {useEffect, useState} from "react";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../util/env";
import ModifyRoomUser from "../Components/Cards/ModifyRoomUser";
import {useNavigate} from "react-router-dom";
import $ from "jquery";
import AddMeetingUser from "../Components/Cards/AddMeetingUser";
import {upload} from "@testing-library/user-event/dist/upload";

const MAX_COUNT = 5;

const NewRoom = () => {

    const navigate = useNavigate();

    const [roomInfo, setRoomInfo] = useState('');
    const [isNew, setIsNew] = useState(true);
    const [invites, setInvites] = useState('');
    const [invCount, setInvCount] = useState('');
    const [delUser, setDelUser] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const [remindBool, setRemindBool] = useState(false);

    const [selectValue, setSelectValue] = useState(1)

    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false)

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

        setUploadedFiles(uploaded.filter((_ , index) => index !== index2))
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
                    setRoomInfo(res.data);
                    setIsNew(false);
                    if(res.data.mt_remind_type !== 0){
                        // setRemindBool(!remindBool);
                    }
                })
            axios.get(SERVER_URL +
                `/meet/room/invite?idx_meeting=${window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}`,
                AXIOS_OPTION)
                .then(res => {
                    setInvCount(res.data.mt_invites.length);
                    setInvites(res.data.mt_invites);
                })
        }
// 더미
        setRoomInfo({
            mt_ishost: '1', //0 게스트 1 호스트
            mt_name: '경제학',
            mt_hostname: '김태선',
            mt_start_dt: '2022-11-09 15:00:00',
            mt_end_dt: '2022-12-13 12:00:00',
            mt_remind_type: 1, //되풀이 미팅 타입 0 없음 1 매일 2 주 3 월 4 년
            mt_remind_count: 0, //되풀이 미팅 주기 0 없음, 1이상 주기별
            mt_remind_week: null,
            mt_remind_end: null,
            mt_info: '경제적으로 밥먹기, 화장실에서 돈을 모으지 못하지만 기분좋은 쌀국수에 소스가 말린 채 월드컵 경기장에서 국민체조를 즐기는 것',
            mt_status: 2, // 0 비공개 1 공개 2 취소 3 삭제
            mt_live: 0, // 라이브여부
            mt_files: [
                {
                    idx: 1,
                    files: 'filepath/filename'
                }
            ]
        })
        setIsNew(false);

        let dummyInvites = [
            {
                idx: 1,
                is_live: 0,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            },{
                idx: 2,
                is_live: 1,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            },{
                idx: 3,
                is_live: 1,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            },{
                idx: 4,
                is_live: 1,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            },{
                idx: 5,
                is_live: 0,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            }];
        let dummySearchUser = [
            {
                idx: 6,
                is_live: 0,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            },{
                idx: 7,
                is_live: 1,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            },{
                idx: 8,
                is_live: 1,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            },{
                idx: 9,
                is_live: 1,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            },{
                idx: 10,
                is_live: 0,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            },{
                idx: 11,
                is_live: 0,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            },{
                idx: 12,
                is_live: 0,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            },{
                idx: 13,
                is_live: 0,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            },{
                idx: 14,
                is_live: 0,
                uname: '제갈춘재',
                email: 'chun@chun.com'
            }];
        setInvites(dummyInvites)
        setSearchUser(dummySearchUser)
//더미
    }, [])


    const searchInviteUserList = (e) => {
        let searchWord = e.target.value;
        axios.get(SERVER_URL +
            `/meet/invite?searchTxt=${searchWord}`,
            AXIOS_OPTION)
            .then(res => {
                setSearchUser(res.data.mt_invites);
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
        setInvites([...invites, user]);
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
                    <input type="text" className="text" id="make_new" placeholder="미팅 이름을 입력해주세요." defaultValue={isNew ? '' : roomInfo.mt_name}/>
                    <hr />
                        <label htmlFor="make_date"><img src="../assets/image/ic_calendar_24.png" alt="" /></label>
                        <input id="make_date" type="date" className="text under-scope width-flexble"
                               // defaultValue={isNew ? '' : roomInfo.mt_start_dt.split(' ')[0]}
                        />
                            <label htmlFor="make_time" className="input__time"><img src="../assets/image/ic_time_24.png" alt="" /></label>
                            <input id="make_time" type="time"
                                   pattern="[0-9]{2}:[0-9]{2}"
                                   className="text under-scope width-flexble"
                                   // defaultValue={isNew ? '' : roomInfo.mt_start_dt.split(' ')[1]}
                            />
                                <span className="bar">-</span>
                                <input id="make_time" type="time" className="text under-scope width-flexble"
                                       // defaultValue={isNew ? '' : roomInfo.mt_end_dt.split(' ')[1]}
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
                                    <select name="" id="room_repeat2" className="make-select">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                    {
                                        selectValue === 1 ? '일'
                                        : selectValue === 2 ? '주'
                                        : selectValue === 3 ? '월'
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
                                                    <input type="checkbox" className="checkbox" id="월"/>
                                                    <label htmlFor="월">월</label>
                                                </div>
                                                <div className="checkbox type__square">
                                                    <input type="checkbox" className="checkbox" id="화"/>
                                                    <label htmlFor="화">화</label>
                                                </div>
                                                <div className="checkbox type__square">
                                                    <input type="checkbox" className="checkbox" id="수"/>
                                                    <label htmlFor="수">수</label>
                                                </div>
                                                <div className="checkbox type__square">
                                                    <input type="checkbox" className="checkbox" id="목"/>
                                                    <label htmlFor="목">목</label>
                                                </div>
                                                <div className="checkbox type__square">
                                                    <input type="checkbox" className="checkbox" id="금"/>
                                                    <label htmlFor="금">금</label>
                                                </div>
                                                <div className="checkbox type__square">
                                                    <input type="checkbox" className="checkbox" id="토"/>
                                                    <label htmlFor="토">토</label>
                                                </div>
                                                <div className="checkbox type__square">
                                                    <input type="checkbox" className="checkbox" id="일"/>
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
                                    <input id="종료 날짜" type="date" className="text under-scope" />
                                </dd>
                            </dl>
                        </div>
                        :
                        null
                    }

                </div>

                <div className="input__group">
                    <label htmlFor="make_room">미팅 정보</label>
                    <textarea name="" id="make_room" cols="10" rows="3" placeholder="미팅정보를 입력해주세요." defaultValue={isNew ? '' : roomInfo.mt_info}></textarea>
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
                    <div className="list__count"><a href="#none" className="btn btn__download">엑셀 양식 다운로드</a></div>
                    <div className="flow_box input__inline">
                        <input id="make_team" type="text" className="text" placeholder="이메일 또는 이름을 입력해 참석자를 추가하세요." onChange={searchInviteUserList} />
                            <a href="#popup__team" className="btn btn__team js-modal-alert">
                                <img src="../assets/image/ic_participant_14.png" alt="" />단체추가하기
                            </a>
                    </div>
                    <div className="flow__team">
                        <ul>
                            {
                                !searchUser || !searchUser.length ? '' :
                                    searchUser.map(user => {
                                        return <AddMeetingUser user={user} addUser={addUser}/>
                                    })
                            }
                            {/*<li><a href="#none">*/}
                            {/*    <figure><img*/}
                            {/*        src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"*/}
                            {/*        alt=""/></figure>*/}
                            {/*    <span className="team__user">권민수*/}
                            {/*     <em>rnjsals12@gmail.com</em></span>*/}
                            {/*    <div className="checkbox type__square">*/}
                            {/*        <input type="checkbox" className="checkbox" id="team-1" name="user"/>*/}
                            {/*        <label htmlFor="team-1"></label>*/}
                            {/*    </div>*/}
                            {/*</a></li>*/}
                            {/*<li><a href="#none">*/}
                            {/*    <figure><img*/}
                            {/*        src="https://images.unsplash.com/photo-1487735829822-4aa5382f8ed4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=fd78248154392ee88a2a8da254058508"*/}
                            {/*        alt=""/></figure>*/}
                            {/*    <span className="team__user">권민수*/}
                            {/*     <em>rnjsals12@gmail.com</em></span>*/}
                            {/*    <div className="checkbox type__square">*/}
                            {/*        <input type="checkbox" className="checkbox" id="team-2" name="user"/>*/}
                            {/*        <label htmlFor="team-2"></label>*/}
                            {/*    </div>*/}
                            {/*</a></li>*/}
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
                             {/*<li>*/}
                             {/*    <a href="#none">*/}
                             {/*    <img src="../assets/image/ic_file_14.png" alt=""/><span class="file__name">1주차_인간공학의 개요_ppt.pdf</span><em class="file__size">230KB</em>*/}
                             {/*    </a>*/}
                             {/*    <a href="#none" class="btn btn__delete"><img src={require('../assets/image/ic_cancle-circle_18.png')} alt="삭제"/></a>*/}
                             {/*</li>*/}
                             {/*<li>*/}
                             {/*    <a href="#none">*/}
                             {/*        <img src="../assets/image/ic_file_14.png" alt=""/><span class="file__name">2주차_인간공학을 위한 인간이해_ppt.pdf</span><em class="file__size">680KB</em>*/}
                             {/*    </a>*/}
                             {/*    <a href="#none" class="btn btn__delete"><img src={require('../assets/image/ic_cancle-circle_18.png')} alt="삭제"/></a>*/}
                             {/*</li>*/}
                             {/*<li>*/}
                             {/*    <a href="#none">*/}
                             {/*        <img src="../assets/image/ic_file_14.png" alt=""/><span class="file__name">3주차_인간의 감각과 그 구조_ppt.pdf</span><em class="file__size">558KB</em>*/}
                             {/*    </a>*/}
                             {/*    <a href="#none" class="btn btn__delete"><img src={require('../assets/image/ic_cancle-circle_18.png')} alt="삭제"/></a>*/}
                             {/*</li>*/}
                             {/*<li>*/}
                             {/*    <a href="#none">*/}
                             {/*        <img src="../assets/image/ic_file_14.png" alt=""/><span class="file__name">4주차_인간의 형태와 운동기능_ppt.pdf</span><em class="file__size">680KB</em>*/}
                             {/*    </a>*/}
                             {/*    <a href="#none" class="btn btn__delete"><img src={require('../assets/image/ic_cancle-circle_18.png')} alt="삭제"/></a>*/}
                             {/*</li>*/}
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
                        <div onClick={() => navigate(`/meetingroom/${window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}`)} className="btn btn__normal">최소</div>
                    }
                    <a href="room_setting.html" className="btn btn__able">저장</a>
                </div>
            </div>

            <div id="popup__team" className="pop__detail ">
                {/*<a href="#none" className="btn__close js-modal-close"><img src="../assets/image/ic_close_24.png" alt=""></a>*/}
                <div className="popup__cnt">
                    <div className="pop__message">
                        <h3>참석자 단체 등록하기</h3>
                        <div className="pop__body">
                            <div className="upload__box ">
                                <input className="upload-name" value="이메일이 입력된 엑셀파일을 첨부해주세요." disabled />
                                    <label htmlFor="ex_filename"><img src="../assets/image/ic_attachment_24.png" alt=""/></label>
                                    <input type="file" id="ex_filename" className="upload-hidden"/>
                            </div>
                            {/*<div className="upload__count">총 52명</div>*/}
                            <div className="upload__list">
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
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