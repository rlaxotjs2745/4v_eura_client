import React, {useEffect, useState} from "react";
import axios from "axios";
import {AXIOS_FORM_DATA_OPTION, AXIOS_FORM_DATA_OPTION_NOUSER, AXIOS_OPTION, SERVER_URL} from "../util/env";
import ModifyRoomUser from "../Components/Cards/ModifyRoomUser";
import {useLocation, useNavigate} from "react-router-dom";
import $ from "jquery";
import AddMeetingUser from "../Components/Cards/AddMeetingUser";
import {getCookie} from "../util/cookie";
// import Select from 'react-select'
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const MAX_COUNT = 99;
const FILE_SIZE_MAX_LIMIT = 100 * 1024 * 1024;  // 100MB

const NewRoom = () => {



    const [value, setValue] = useState(null);
    const { pathname } = useLocation();
    const location = useLocation(); // navigate 에서 받은 스테이트값 넘겨받기위함. result_code FAIL01로 넘겨줌

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
    const [remindShowBool, setRemindShowBool] = useState(true);
    const [weekday, setWeekday] = useState([]);
    const weekdayArr = ['일','월','화','수','목','금','토']
    const [weekdayArrNew, setWeekdayArrNew] = useState([])

    useEffect(()=> {
        setWeekdayArrNew(weekday.map((value, index, array) => weekdayArr[value - 1]).join())
    }, [weekday])

    const [groupInvites, setGroupInvites] = useState([]);

    const [selectValue, setSelectValue] = useState(0);
    const [remindCount, setRemindCount] = useState(0);
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [startTime, setStartTime] = useState(new Date().getHours() + ':' + new Date().getMinutes() + ':00');
    const [endTime, setEndTime] = useState(new Date().getHours() + ':' + new Date().getMinutes() + ':00');
    const [endDate, setEndDate] = useState(dayjs(startDate).add(7, 'day'));
    const [meetingInfo, setMeetingInfo] = useState('');

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadedFilesPlus, setUploadedFilesPlus] = useState([]);
    const [delFiles, setDelFiles] = useState([]);

    const [fileLimit, setFileLimit] = useState(false);

    const [groupModal, setGroupModal] = useState('pop__detail');
    const [groupFileName, setGroupFileName] = useState('이메일이 입력된 엑셀파일을 첨부해주세요.')
    const [groupSearchUser, setGroupSearchUser] = useState([]);

    const [dt, setDt] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [dt2, setDt2] = useState(dayjs(new Date()).format('YYYY-MM-DD'));

    const [Selected1, setSelected1] = useState('00');
    const [Selected2, setSelected2] = useState('00');
    const [Selected3, setSelected3] = useState('00');
    const [Selected4, setSelected4] = useState('00');

    console.log('시작날짜 요일', weekdayArr[dayjs(startDate).day()])

    useEffect(() => {
        let curTIme = new Date();

        if(curTIme.getMinutes() % 10 !== 0){ // 현재 시간의 분을 나눈 나머지가 0이 아닐경우 (분이 10의 자리로 떨어지지 않을 경우)
            curTIme.setMinutes(curTIme.getMinutes() + (10 - curTIme.getMinutes() % 10) ); // 분을 다시 설정함, 현재
        }

        setSelected1(curTIme.getHours());
        setSelected2(curTIme.getMinutes());

        curTIme.setMinutes(curTIme.getMinutes() + 30);

        setSelected3(curTIme.getHours());
        setSelected4(curTIme.getMinutes());
    },[])


    const select1_opiton = [
        { value: "00", label: "00", idx:"00"},
        { value: "1", label: "01", idx:"01"},
        { value: "2", label: "02", idx:"02"},
        { value: "3", label: "03", idx:"03"},
        { value: "4", label: "04", idx:"04"},
        { value: "5", label: "05", idx:"05"},
        { value: "6", label: "06", idx:"06"},
        { value: "7", label: "07", idx:"07"},
        { value: "8", label: "08", idx:"08"},
        { value: "9", label: "09", idx:"09"},
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
        { value: "1", label: "01", idx:"01"},
        { value: "2", label: "02", idx:"02"},
        { value: "3", label: "03", idx:"03"},
        { value: "4", label: "04", idx:"04"},
        { value: "5", label: "05", idx:"05"},
        { value: "6", label: "06", idx:"06"},
        { value: "7", label: "07", idx:"07"},
        { value: "8", label: "08", idx:"08"},
        { value: "9", label: "09", idx:"09"},
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

    useEffect(() => {
        if(pathname.indexOf('reopen')>-1){
            setIsNew(2);
        }else if(pathname.indexOf('/newroom/')>-1){
            setIsNew(1);

        } else return;

        // setRemindShowBool(false);

            axios.get(SERVER_URL +
                `/meet/room/info?idx_meeting=${pathSplit}`,
                AXIOS_OPTION)
                .then(res => {
                    const room = res.data.data;
                    setTitle(room.mt_name);
                    setStartDate(room.mt_start_dt.split(' ')[0]);
                    setDt2(room.mt_start_dt.split(' ')[0]);
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
        // setRemindBool(!!roomInfo.mt_remind_type);
    }, [roomInfo]);



    const handleUploadFiles = (files) => {

        files.forEach(function(item, index){
            if (item.size > FILE_SIZE_MAX_LIMIT) {
                alert(`업로드 가능한 최대 용량은 100MB입니다.`)
                setFileLimit(false);
                limitExceeded = true;
            }
        });

        const uploaded = [...uploadedFiles];

        let limitExceeded = false;
        files.some((file, index) => {
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
            setGroupInvites([...groupInvites, ...csvOutput.toString().trim().replace(/\r\n/g, '$%&').split('$%&').slice(1)]);
        }

        fileReader.readAsText(chosenFile);
    }

    const deleteGroupInvites = (inv) => {
        setGroupInvites(groupInvites.filter(gInv => gInv != inv));
    }

    const excludeUser = (user, isSearch) => {
        if(!isSearch){
            if(user.email === getCookie('user_id')){
                return alert('호스트는 제거할 수 없습니다.');
            }

            setInvites(invites.filter(inv => inv.email != user.email));
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
            if(inv.email === user.email){
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

    const addSearchGroupUser = async () => {
        const newGroupInvites = groupInvites.filter(user => {
            let result = true;
            invites.forEach(inv => {
                if(inv.email === user){
                    result = false;
                }
            })
            return result;
        })

        const newInvites = [];
        for(let gUser of newGroupInvites){
            const res = await axios.get(SERVER_URL + `/meet/invite?searchTxt=${gUser}`, AXIOS_OPTION);
            if (res && res.data && res.data.data && res.data.data.mt_invites && res.data.data.mt_invites.length >= 1) {
                newInvites.push(res.data.data.mt_invites[0]);
            } else {
                newInvites.push({email: gUser, unknownUser: true});
            }
        }

        setInvites([...invites, ...newInvites]);

        handleModal();
    }


    const pressEnterKey = (e) => {
        if(e.key === 'Enter'){
            const reg_email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
            if(!reg_email.test(e.target.value)){
                return;
            }
            if(searchUser.length === 0){
                let isExist = false;
                invites.forEach(inv => {
                    if(inv.email === e.target.value){
                        isExist = true;
                    }
                })
                if(!isExist){
                    setInvites([...invites, {email: e.target.value, unknownUser: true}]);
                }
                e.target.value = '';
            } else {
                addUser(searchUser[0]);
                e.target.value = '';
            }
        }
    }

    $(document.body).on('focus', '#make_team', function () {
        $(".flow__team").addClass('on');
    });

    $(document).mouseup(function (e) {
        var LayerPopup = $("#hahhhoho");
        if (LayerPopup.has(e.target).length === 0) {
            $(".flow__team").removeClass('on');
            // LayerPopup.removeClass("open");
        }
    });

    // document.querySelector("body").addEventListener("click", function(e) {
    //     if(e.target.className === e.currentTarget.querySelector(".flow__team").className) {
    //         console.log("correct")
    //     } else {
    //         console.log("wrong")
    //         $(".flow__team").removeClass('on');
    //     }
    // })
    // $(document.body).on('blur', '.flow__team', function () {
    //     $(".flow__team").slideUp();
    // });

    const remindChange = () => {
        if (!remindBool) {
            if (roomInfo.mt_remind_type) {
                setSelectValue(roomInfo.mt_remind_type);
            } else {
                if (!selectValue) {
                    setSelectValue(1)
                }
            }
        } else {
            setSelectValue(0);

        }

        setRemindBool(!remindBool);

        setWeekdayArrNew([]) // 배열 초기화
        setWeekday([]) // 배열 초기화
    }

    const getWeekDay = (num) => {
        let bool = false;
        weekday.forEach(d => {
            if(d === num){
                bool = true;
            }
        })

        if(!bool){
            setWeekday([...new Set([...weekday, num])]);
        } else {
            setWeekday(weekday.filter(d => d !== num));
        }
    }

    const handleChange = (e) => {
        setSelectValue(parseInt(e.target.value))
    };

    const makeTitle = (e) => {
        setTitle(e.target.value);
    }

    const makeDate = (newValue) => {
        setStartDate(newValue);
    }

    useEffect(()=> {
        if(selectValue === 1) {
            setEndDate(dayjs(startDate).add(7, 'day'));
        } else if (selectValue === 2) {
            setEndDate(dayjs(startDate).add(7, 'week'));
        } else if (selectValue === 3) {
            setEndDate(dayjs(startDate).add(14, 'week'));
        } else if (selectValue === 4) {
            setEndDate(dayjs(startDate).add(7, 'month'));
        }
    },[startDate])

    const makeEndDate = (e) => {
        setEndDate(e);

    }

    const makeMeetingInfo = (e) => {
        setMeetingInfo(e.target.value);
    }


    const handleSubmit = () => {
        console.log(remindCount)
        if($('#make_new').val() == ''){
            return alert('미팅 이름을 입력해주세요.')
        }

        if($('#make_date').val() == ''){
            return alert('미팅 일자가 입력되지 않았습니다.')
        }

        if(Selected1 < new Date().getHours() && startDate === dayjs(new Date()).format('YYYY-MM-DD')){
            return alert('미팅 시작 시간은 현재 시간 이전일 수 없습니다.');
        }

        // 오늘 날짜와 같고, 현재시간이랑 같거나 낮고, 현재 분 보다 낮을때
        if( Selected1 <= new Date().getHours() && Selected2 < new Date().getMinutes() && startDate === dayjs(new Date()).format('YYYY-MM-DD')){
            return alert('미팅 시작 시간은 현재 시간 이전일 수 없습니다.');
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
        formData.append('mt_start_dt',  `${dayjs(startDate).format('YYYY-MM-DD')} ${Selected1}:${Selected2}:00`);
        formData.append('mt_end_dt',   `${dayjs(startDate).format('YYYY-MM-DD')} ${Selected3}:${Selected4}:00`);
        formData.append('mt_info', meetingInfo);
        formData.append('mt_invite_email', [...invites.map(inv => inv.email), ...groupInvites].join());
        for (let i = 0; i < uploadedFiles.length; i++) {
            formData.append("file", uploadedFiles[i]);
        }

        if(remindBool){
            formData.append('mt_remind_type', parseInt(selectValue));
            formData.append('mt_remind_count', remindCount);
            if(selectValue == 2){
                formData.append('mt_remind_week', weekday.join());
            }
            if(selectValue == 3){
                formData.append('mt_remind_week', weekday.join());
            }
            formData.append('mt_remind_end', dayjs(endDate).format('YYYY-MM-DD'));
        } else {
            formData.append('mt_remind_type', 0);
        }

        if(location.state !== null && location.state.resultCode === 'FAIL01') {
            formData.append('mt_status', 1);
        } // 공개하기 때 result_code FAIL01 받을경우 수정하기 페이지로 이동하는데, 이때 navigate로 스테이터스 값을 지정해서 보내줌. 그 값이 있으면 mt_status값을 전달 하게 하기 위함.


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
                // console.log(i);
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

    $('#shade').click(() => {
        handleModal();
    })

    const openModal = () => {
        if($('#make_new').val() == ''){
            return alert('미팅 이름을 입력해주세요.')
        }

        if($('#make_date').val() == ''){
            return alert('미팅 일자가 입력되지 않았습니다.')
        }

        if(Selected1 < new Date().getHours() && startDate === dayjs(new Date()).format('YYYY-MM-DD')){
            return alert('미팅 시작 시간은 현재 시간 이전일 수 없습니다.');
        }

        // 오늘 날짜와 같고, 현재시간이랑 같거나 낮고, 현재 분 보다 낮을때
        if( Selected1 <= new Date().getHours() && Selected2 < new Date().getMinutes() && startDate === dayjs(new Date()).format('YYYY-MM-DD')){
            return alert('미팅 시작 시간은 현재 시간 이전일 수 없습니다.');
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
        formData.append('mt_start_dt',  `${startDate} ${Selected1}:${Selected2}:00`);
        formData.append('mt_end_dt',   `${startDate} ${Selected3}:${Selected4}:00`);
        formData.append('mt_info', meetingInfo);
        formData.append('mt_invite_email', [...invites.map(inv => inv.email), ...groupInvites].join());
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
            // console.log('되풀이 미팅 체크 안된것으로 봄')
            formData.append('mt_remind_type', 0);
        }

        if(location.state !== null && location.state.resultCode === 'FAIL01') {
            formData.append('mt_status', 1);
        } // 공개 실패시

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
                // console.log(i);
            }
            axios.post(SERVER_URL + '/meet/modify', formData, AXIOS_OPTION)
                .then(res => {
                    if(res.data.result_code === 'SUCCESS'){
                        $('#popup__notice').addClass('is-on');
                        $('#shade2').addClass('is-on');
                    }else{
                        alert(res.data.result_str);
                    }
                }).catch(res => console.log(res))
        }


    }

    const modalClose = () => {
        $('#popup__notice').removeClass('is-on');
        $('#shade2').removeClass('is-on');
        alert('미팅룸을 비공개상태로 수정하였습니다.');
        navigate('/');
    }

    $('#shade2').off().on('click', () => {
        $('#popup__notice').removeClass('is-on');
        $('#shade2').removeClass('is-on');
        alert('미팅룸을 비공개상태로 수정하였습니다.');
        navigate('/');
    })

    const changeMeetingStatus2 = () => {
        axios.put(SERVER_URL + '/meet/room/open', {"idx_meeting": window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}, AXIOS_OPTION)
            .then(res => {
                if(res.data.result_code === "SUCCESS"){
                    $('#popup__notice').removeClass('is-on');
                    $('#shade2').removeClass('is-on');
                    alert('미팅룸을 공개하였습니다.');
                    navigate('/');

                } else if (res.data.result_code === "FAIL01"){
                    // 재개설 하기 에서 공개하기가 실패할 경우 수정하기 화면으로 이동하기 위함
                    navigate(`/newroom/${pathSplit}`, {state:{'resultCode':'FAIL01'}})
                }
            }).catch(err => {
            console.log(err);
        });

    }

    const [maxDate, setMaxDate] = useState('')

    useEffect(()=> {
        if(selectValue === 1) {
            setEndDate(dayjs(startDate).add(7, 'day'));
            setMaxDate(dayjs(startDate).add(30, 'day'))
        } else if (selectValue === 2) {
            setEndDate(dayjs(startDate).add(7, 'week'));
            setMaxDate(dayjs(startDate).add(12, 'week'))
        } else if (selectValue === 3) {
            setEndDate(dayjs(startDate).add(14, 'week'));
            setMaxDate(dayjs(startDate).add(24, 'week'))
        } else if (selectValue === 4) {
            setEndDate(dayjs(startDate).add(7, 'month'));
            setMaxDate(dayjs(startDate).add(12, 'month'))
        }
    },[selectValue])

    useEffect(()=> {
        if(selectValue === 1) {
            setRemindCount(dayjs(endDate).diff(startDate, 'day'))
            setMaxDate(dayjs(startDate).add(30, 'day'))
        } else if (selectValue === 2) {
            setRemindCount(dayjs(endDate).diff(startDate, 'week'))
            setMaxDate(dayjs(startDate).add(12, 'week'))
        } else if (selectValue === 3) {
            setRemindCount(dayjs(endDate).diff(startDate, 'week')/2)
            setMaxDate(dayjs(startDate).add(24, 'week'))
        } else if (selectValue === 4) {
            setRemindCount(dayjs(endDate).diff(startDate, 'month'))
            setMaxDate(dayjs(startDate).add(12, 'month'))
        }
    }, [endDate, startDate])

    // console.log(dayjs(endDate).diff(startDate, 'day'), '는 뭔가요')
    // console.log(dayjs(endDate).day(), '는 무슨요일')
    // console.log('몇일차이', dayjs(endDate).diff(startDate, 'day'))
    // console.log('remount카운트 몇개', remindCount)

    const [dayCount, setdayCount] = useState(0)

    function getDayCountBetweenDates(startDate, endDate, days) {
        let date = new Date(startDate);
        let count = 0;

        while (date <= endDate) {
            if (days.includes(date.getDay())) {
                count++;
            }
            date.setDate(date.getDate() + 1);
        }

        return count;
    }

    const startDate2 = new Date(startDate); // 1월 1일
    const endDate2 = dayjs(endDate); // 1월 31일
    const days = weekday; // 금요일

    startDate2.setDate(startDate2.getDate() + 1);

    useEffect(()=> {
        setdayCount(getDayCountBetweenDates(startDate2, endDate2, days));
        // console.log(getDayCountBetweenDates(startDate2, endDate2, [1,3]))
    },[weekday, endDate, startDate])

    console.log(dayCount)




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

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    id="make_date"
                                    className="text under-scope width-flexble"
                                    label="Basic example"
                                    value={startDate}
                                    minDate={dayjs(dt)}
                                    // maxDate={}
                                    inputFormat="YYYY-MM-DD"
                                    mask={"____-__-__"}
                                    onChange={makeDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
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
                        {
                            !remindShowBool ? '' :
                                <div className="checkbox type__square">
                                    <input type="checkbox" className="checkbox" id="remind_bool" onChange={remindChange} defaultValue={remindBool}/>
                                    <label htmlFor="remind_bool">되풀이 미팅</label>
                                    <strong>
                                        {remindBool && remindShowBool ?
                                            <>
                                            {
                                                selectValue === 1 ? `매일, ${dayjs(endDate).format('YYYY년 MM월 DD일')}까지, ${dayjs(endDate).diff(startDate, 'day')}개 되풀이 항목` :
                                                    selectValue === 2 ? `매주 ${weekdayArrNew}, ${dayjs(endDate).format('YYYY년 MM월 DD일')}까지, ${dayjs(endDate).diff(startDate, 'week')}개 되풀이 항목` :
                                                        selectValue === 3 ? `매 2주마다, ${weekdayArrNew} ${dayjs(endDate).format('YYYY년 MM월 DD일')}까지, ${(dayjs(endDate).diff(startDate, 'week'))/2}개 되풀이 항목` :
                                                            selectValue === 4 ? `매월, ${dayjs(endDate).format('YYYY년 MM월 DD일')}까지, ${dayjs(endDate).diff(startDate, 'month')}개 되풀이 항목` : ''
                                            }
                                        </> : ''
                                        }
                                    </strong>
                                </div>
                        }
                        {remindBool && remindShowBool ?
                            <div id="remind_meeting">
                                <dl className="inline__type">
                                    <dt><label htmlFor="room_repeat">반복 주기</label></dt>
                                    <dd>
                                        <select onChange={handleChange} name="" id="room_repeat" className="make-select" defaultValue={selectValue}>
                                            <option value="1">매일</option>
                                            <option value="2">매주</option>
                                            <option value="3">격주</option>
                                            <option value="4">매월</option>
                                        </select>
                                    </dd>
                                    {/*<dt><label htmlFor="room_repeat2">반복 횟수</label></dt>*/}
                                    <dd>
                                        {
                                            selectValue === 1 ? ''
                                                : selectValue === 2 ? ''
                                                    : selectValue === 3 ? ''
                                                        : selectValue === 4 ? ''
                                                            // <>
                                                            //     <select name="" id="room_repeat2" onChange={selectRemindCount} className="make-select">
                                                            //         <option value="1">1</option>
                                                            //         <option value="2">2</option>
                                                            //         <option value="3">3</option>
                                                            //         <option value="4">4</option>
                                                            //         <option value="5">5</option>
                                                            //     </select>년
                                                            // </>
                                                : ''
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
                                        </> :
                                        selectValue === 3 ?
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
                                            </>
                                        : null
                                }
                                <hr />
                                <dl className="inline__type">
                                    <dt><label htmlFor="종료 날짜">종료 날짜</label></dt>
                                    <dd>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                id="meeting_end_date"
                                                className="text under-scope"
                                                // label="Basic example"
                                                value={endDate}
                                                minDate={dayjs(startDate).add(7, 'day')}
                                                mask={"____-__-__"}
                                                maxDate={maxDate}
                                                inputFormat="YYYY-MM-DD"
                                                onChange={makeEndDate}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        {/*<input id="meeting_end_date" type="date" onChange={makeEndDate} min={dt2} className="text under-scope" />*/}
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
                        {/*<label htmlFor="make_team">참석자 추가</label>*/}
                        <label>참석자 추가</label>
                        <div className="list__count"><a onClick={() => window.open('https://file.eura.site/upload/EURA_%EB%AF%B8%ED%8C%85_%EC%B0%B8%EC%84%9D%EC%9E%90_%EB%8B%A8%EC%B2%B4_%EC%B6%94%EA%B0%80_%EC%96%91%EC%8B%9D.csv')} className="btn btn__download">엑셀 양식 다운로드</a></div>
                        <div className="flow_box input__inline">
                            <input type="hidden"/>
                            <input id="make_team" type="text" autoComplete="off" className="text" placeholder="이메일 또는 이름을 입력해 참석자를 추가하세요." onChange={searchInviteUserList} onKeyPress={pressEnterKey}/>
                            <div onClick={handleModal} className="btn btn__team js-modal-alert">
                                <img src="../assets/image/ic_participant_14.png" alt="" />단체추가하기
                            </div>
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
                        <div style={{display:"inline-block"}}>첨부파일<input className="sr-only" type="file" name="file_upload" id="fileUpload" multiple accept=".pdf, .hwp, .txt, .zip, .docx, .pptx, .xlsx, .png, .jpeg, .jpg, .tiff, .mp4, .avi, .gif, .mkv" onChange={handleFileEvent} disabled={fileLimit}/><label style={{marginLeft:"10px"}} htmlFor="fileUpload"><span  className="btn btn__download"><img src={require('../assets/image/ic_attachment_14.png')} alt="" />파일 업로드</span></label></div>

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
                        {isNew === 2 ?
                            <a onClick={openModal} className="btn btn__able">
                                재개설
                            </a>
                            :
                            <div onClick={handleSubmit} className="btn btn__able">저장</div>
                        }




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
                                        groupInvites.map(inv => <li>{inv}<div className="btn btn__delete" onClick={() => deleteGroupInvites(inv)}>
                                            <img src={require('../assets/image/ic_cancle-circle_18.png')} alt="삭제"/>
                                        </div></li>)
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

            <div id="popup__notice" className="pop__detail">
                <div onClick={modalClose} className="btn__close js-modal-close"><img src={require('../assets/image/ic_close_24.png')} alt=""/></div>
                <div className="popup__cnt">
                    <div className="pop__message">
                        <img src={require('../assets/image/ic_warning_80.png')} alt=""/>
                        <div id="mt_status_2">
                            <strong>재개설 된 미팅룸을 공개하시겠습니까?</strong>
                            <span>미팅을 공개하면 초대한 참석자들에게 메일이 발송됩니다.</span>
                        </div>
                    </div>
                    <div className="btn__group">
                        <button onClick={changeMeetingStatus2} className="btn btn__able btn__s">예</button>
                        <button onClick={modalClose} className="btn btn__normal btn__s js-modal-close">아니오</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NewRoom;