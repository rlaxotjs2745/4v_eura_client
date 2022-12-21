import React, {useEffect, useState, useLayoutEffect, useReducer, useCallback} from "react";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../util/env";
import ModifyRoomUser from "../Components/Cards/ModifyRoomUser";
import {useLocation, useNavigate} from "react-router-dom";
import $ from "jquery";
import AddMeetingUser from "../Components/Cards/AddMeetingUser";
import {getCookie} from "../util/cookie";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const MAX_COUNT = 99;
const FILE_SIZE_MAX_LIMIT = 100 * 1024 * 1024;  // 100MB

const NewRoom = () => {
    const { pathname } = useLocation();
    const location = useLocation(); // navigate 에서 받은 스테이트값 넘겨받기위함. result_code FAIL01로 넘겨줌
    const navigate = useNavigate();
    const fileReader = new FileReader();

    const pathSplit = Number(pathname.split('/')[2]) // 수정, 재개설 시 미팅 인덱스

    const [roomInfo, setRoomInfo] = useState({}); // 방 전체 정보
    const [title, setTitle] = useState(''); // 방 제목
    const [meetingInfo, setMeetingInfo] = useState(''); // 미팅 설명

    const [isNew, setIsNew] = useState(0); // 새로운 채팅 개설일 경우

    const [invites, setInvites] = useState([]); // 현재 참석자
    const [invCount, setInvCount] = useState(''); // 현재 참석자 수
    const [delUser, setDelUser] = useState(''); // 기존 참석자에서 제거된 명단
    const [searchUser, setSearchUser] = useState([]); // 검색을 통해 보여지는 명단
    const [groupInvites, setGroupInvites] = useState([]); // 단체 참석자 추가

    const [remindBool, setRemindBool] = useState(false); // 되풀이 미팅
    const [remindShowBool, setRemindShowBool] = useState(true); // 되풀이 미팅
    const [remindCount, setRemindCount] = useState(0); // 되풀이 미팅 횟수
    const [remindCountEffect, setRemindCountEffect] = useState(0); // 되풀이 미팅 더미용 useEffect 용

    const [startDate, setStartDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [startTime, setStartTime] = useState(new Date().getHours() + ':' + new Date().getMinutes() + ':00');
    const [endTime, setEndTime] = useState(new Date().getHours() + ':' + new Date().getMinutes() + ':00');
    const [endDate, setEndDate] = useState(dayjs(startDate).add(7, 'day'));
    const [selectValue, setSelectValue] = useState(0);
    const [Selected1, setSelected1] = useState('00');
    const [Selected2, setSelected2] = useState('00');
    const [Selected3, setSelected3] = useState('00');
    const [Selected4, setSelected4] = useState('00');
    const [maxDate, setMaxDate] = useState('')
    const [weekday, setWeekday] = useState([]);
    const [weekday22, setWeekday22] = useState([]);
    const [weekdayMinus1, setWeekdayMinus1] = useState([])
    const [weekdayMinus2, setWeekdayMinus2] = useState([])

    const [weekdayArrNew, setWeekdayArrNew] = useState([])
    const [weekdayArrNew2, setWeekdayArrNew2] = useState([])
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadedFilesPlus, setUploadedFilesPlus] = useState([]);
    const [delFiles, setDelFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);

    const [groupModal, setGroupModal] = useState('pop__detail');
    const [groupFileName, setGroupFileName] = useState('이메일이 입력된 엑셀파일을 첨부해주세요.')
    const [groupSearchUser, setGroupSearchUser] = useState([]);

    const [dt, setDt] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [dt2, setDt2] = useState(dayjs(new Date()).format('YYYY-MM-DD'));

    const [radioChecked, setRadioChecked] = useState(true)
    const [radioChecked2, setRadioChecked2] = useState(false)
    const [prevRoom, setPrevRoom] = useState({});
    const [prevInvites, setPrevInvites] = useState({});

    const [modifyBool, setModifyBool] = useState(false);

    const [validationStartTime, setValidationStartTime] = useState(new Date())

    const [roomStatus, setRoomState] = useState(false)
    const [rendered, setRendered] = useState(0);

    const [startDateChange, setStartDateChange] = useState(false)

    useEffect(() => {
        let curTIme = new Date();

        if(curTIme.getMinutes() % 10 !== 0){ // 현재 시간의 분을 나눈 나머지가 0이 아닐경우 (분이 10의 자리로 떨어지지 않을 경우)
            curTIme.setMinutes(curTIme.getMinutes() + (10 - curTIme.getMinutes() % 10) ); // 분을 다시 설정함, 현재
        }

        setSelected1(dayjs(curTIme).format('HH'))
        setSelected2(dayjs(curTIme).format('mm'));

        curTIme.setMinutes(curTIme.getMinutes() + 30);

        setSelected3(dayjs(curTIme).format('HH'))
        setSelected4(dayjs(curTIme).format('mm'));

        if(pathname.indexOf('reopen')>-1){
            setIsNew(2);
            setRoomState(true)
        }else if(pathname.indexOf('/newroom/')>-1){
            setIsNew(1);

        } else return;

        axios.get(SERVER_URL +
            `/meet/room/info?idx_meeting=${pathSplit}`,
            AXIOS_OPTION)
            .then(res => {
                const room = res.data.data;
                setTitle(room.mt_name);
                setStartDate(dayjs(new Date(room.mt_start_dt.split(' ')[0])).format('YYYY-MM-DD'));
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
                setValidationStartTime(room.mt_start_dt)
                if(room.mt_status === 0) {
                    setRoomState(true)
                }
                if(room.mt_remind_week !== null) {
                    setWeekday(room.mt_remind_week.split(','));
                }
                setPrevRoom({...room, mt_remind_week :room.mt_remind_week !== null ? room.mt_remind_week.split(',').sort() : null});
                setRendered(1);
            })
        axios.get(SERVER_URL +
            `/meet/room/invite?idx_meeting=${pathSplit}`,
            AXIOS_OPTION)
            .then(res => {
                setInvCount(res.data.data.mt_invites.length);
                setInvites(res.data.data.mt_invites);
                setPrevInvites({...res.data.data, mt_invites: res.data.data.mt_invites.sort((a,b) =>  a.email > b.email)});
            })

    },[])

    useEffect(()=> {
        if(selectValue === 1) {
            setEndDate(dayjs(startDate).add(6, 'day'));
        } else if (selectValue === 2) {
            setEndDate(dayjs(startDate).add(7, 'week'));
        } else if (selectValue === 3) {
            setEndDate(dayjs(startDate).add(14, 'week'));
        } else if (selectValue === 4) {
            setEndDate(dayjs(startDate).add(6, 'month'));
            if(dayjs(startDate).format('DD') === '31') {
                setEndDate(dayjs(startDate).add(10, 'month'));
            }
        }

        if(selectValue === 4 && dayjs(startDate).format('DD') === '31' && monthCount === 6) {
            setEndDate(dayjs(startDate).add(11, 'month'));
        } else if (selectValue === 4 && dayjs(startDate).format('DD') === '31') {
            setEndDate(dayjs(startDate).add(10, 'month'));
        }
    },[startDate])



    useEffect(()=> {

        setWeekdayArrNew(weekday.sort().map((value, index, array) => weekdayArr[value - 1]).join())
        setWeekdayArrNew2(weekday22.filter(number => number !== 0).sort().map((value, index, array) => weekdayArr22[value - 1]).join())

        setWeekdayMinus1(weekday.map(day => day - 1))
        setWeekdayMinus2(weekday22.map(day => day - 1))

    }, [weekday, selectValue, weekday22])


    useEffect(()=> {
        if(selectValue === 1) {
            setEndDate(dayjs(startDate).add(6, 'day'));
            setMaxDate(dayjs(startDate).add(29, 'day'))
        } else if (selectValue === 2) {
            setEndDate(dayjs(startDate).add(6, 'week'));
            setMaxDate(dayjs(startDate).add(11, 'week'))
        } else if (selectValue === 3) {
            setEndDate(dayjs(startDate).add(12, 'week'));
            setMaxDate(dayjs(startDate).add(23, 'week'))
        } else if (selectValue === 4) {
            setEndDate(dayjs(startDate).add(6, 'month'));
            setMaxDate(dayjs(startDate).add(11, 'month'))
        }
    },[selectValue])

    useEffect(()=> {
        if(selectValue === 1) {
            setRemindCount(dayjs(endDate).diff(startDate, 'day') + 1)
            setMaxDate(dayjs(startDate).add(29, 'day'))
        } else if (selectValue === 2) {
            setRemindCount(dayjs(endDate).diff(startDate, 'week') + 1)
            setMaxDate(dayjs(startDate).add(11, 'week'))
        } else if (selectValue === 3) {
            setRemindCount(Math.floor(dayjs(endDate).diff(startDate, 'week')/2) + 1)
            setMaxDate(dayjs(startDate).add(23, 'week'))
        } else if (selectValue === 4) {
            setMaxDate(dayjs(startDate).add(11, 'month'))
        }

    }, [endDate, startDate])


    const remindCountEffectAfter = new Date(remindCountEffect); // useEffect 안에 if문이 해당 값이 변경 되고 나서 실행하게 하기 위해 더미로 넣음. 꼭 필요함.

    useLayoutEffect(()=> {
        if (selectValue === 4 && radioChecked) {
            setRemindCount(monthCount)
            // console.log('종료 날짜 체크 된거 실행중')
        }
        if (selectValue === 4 && radioChecked2) {
            setRemindCount(dayjs(endDate).diff(startDate, 'month') + 1);
            // console.log('요일 기준 체크 된거 실행중')
        }
    }, [radioChecked, radioChecked2, remindCountEffectAfter])





    const weekdayArr = ['일','월','화','수','목','금','토']
    const weekdayArr22 = ['일','월','화','수','목','금','토']

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

    const by_date_option = [
        { value: "01", label: "1", idx:"01"},
        { value: "02", label: "2", idx:"02"},
        { value: "03", label: "3", idx:"03"},
        { value: "04", label: "4", idx:"04"},
        { value: "05", label: "5", idx:"05"},
        { value: "06", label: "6", idx:"06"},
        { value: "07", label: "7", idx:"07"},
        { value: "08", label: "8", idx:"08"},
        { value: "09", label: "9", idx:"09"},
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
        { value: "24", label: "24", idx:"24"},
        { value: "25", label: "25", idx:"25"},
        { value: "26", label: "26", idx:"26"},
        { value: "27", label: "27", idx:"27"},
        { value: "28", label: "28", idx:"28"},
        { value: "29", label: "29", idx:"29"},
        { value: "30", label: "30", idx:"30"},
        { value: "31", label: "31", idx:"31"},
    ];

    const by_day_of_week_option = [
        { value: "1", label: "첫 번째", idx:"00"},
        { value: "2", label: "두 번째", idx:"01"},
        { value: "3", label: "세 번째", idx:"02"},
        { value: "4", label: "네 번째", idx:"03"},
        { value: "5", label: "마지막", idx:"04"},
    ];

    const by_day_of_week_option2 = [
        { value: "1", label: "일요일", idx:"00"},
        { value: "2", label: "월요일", idx:"01"},
        { value: "3", label: "화요일", idx:"02"},
        { value: "4", label: "수요일", idx:"03"},
        { value: "5", label: "목요일", idx:"04"},
        { value: "6", label: "금요일", idx:"05"},
        { value: "7", label: "토요일", idx:"06"},
    ];


    const handleSelect1 = (e) => {
        setSelected1(e.target.value)
        compareDateTime();
    };

    const handleSelect2 = (e) => {
        setSelected2(e.target.value);
        compareDateTime();
    };

    const handleSelect3 = (e) => {
        setSelected3(e.target.value);
        compareDateTime();
    };

    const handleSelect4 = (e) => {
        setSelected4(e.target.value);
        compareDateTime();
    };





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
        while( indexNumber === indexNumber.previousSibling ) {
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
        while( indexNumber === indexNumber.previousSibling ) {
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
        setGroupInvites(groupInvites.filter(gInv => gInv !== inv));
    }

    const excludeUser = (user, isSearch) => {
        if(!isSearch){
            if(user.email === getCookie('user_id')){
                return alert('호스트는 제거할 수 없습니다.');
            }
            const newUserList = invites.filter(inv => inv.email !== user.email);
            setInvites(newUserList);
            compareInvites(newUserList)
            if(delUser === ''){
                setDelUser(user.email);
            } else {
                setDelUser(delUser + ',' + user.email);
            }
        } else {
            setGroupSearchUser(groupSearchUser.filter(inv => inv.email !== user.email));
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

        compareInvites([...invites, user]);

            let targetIdx;
        searchUser.forEach((us, idx) => {
            if(us.idx === user.idx){
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

        compareInvites([...invites, ...newInvites]);

        setInvites([...invites, ...newInvites]);

        handleModal();
    }

    const compareInvites = (arr) => {
        if(modifyBool === true || isNew === 2){
            return;
        }
        let compareBool = false;
        const compareInv = arr.sort((a,b) => a.email > b.email);
        // if(compareInv.length !== prevInvites.mt_invites.length){
        if(compareInv.length !== prevInvites.mt_invites){
            compareBool = true;
        } else {
            for(let i = 0; i < compareInv.length; i++){
                if(compareInv[i].email !== prevInvites.mt_invites[i].email){
                    compareBool = true;
                    break;
                }
            }
        }
        setModifyBool(compareBool);
    }

    const compareDateTime = () => {
        if(modifyBool === true || isNew === 2 || rendered === 0){
            return;
        }
        let compareBool = false;

        if(!prevRoom.mt_start_dt && !prevRoom.mt_end_dt && !!Selected1 && !!Selected2 && !!Selected3 && !!Selected4){
            compareBool = true;
        }

        if(!!prevRoom.mt_start_dt && !!prevRoom.mt_end_dt){
            if(
                Selected1 !== prevRoom.mt_start_dt.split(' ')[1].split(':')[0] ||
                Selected2 !== prevRoom.mt_start_dt.split(' ')[1].split(':')[1] ||
                Selected3 !== prevRoom.mt_end_dt.split(' ')[1].split(':')[0] ||
                Selected4 !== prevRoom.mt_end_dt.split(' ')[1].split(':')[1]
            ){
                compareBool = true;
            }

            if(prevRoom.mt_start_dt.split(' ')[0] !==  dayjs(new Date(startDate)).format('YYYY-MM-DD')){ // 맨 먼저 저장되는
                compareBool = true;
            }
        }

        if(prevRoom.mt_remind_type !== selectValue){
            compareBool = true;
        }
        setModifyBool(compareBool);
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
                    compareInvites([...invites, {email: e.target.value, unknownUser: true}]);
                }
                e.target.value = '';
            } else {
                addUser(searchUser[0]);
                e.target.value = '';
            }
        }
    }

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


    const handleChange = (e) => {
        setSelectValue(parseInt(e.target.value))
        compareDateTime();
    };

    const makeTitle = (e) => {
        setTitle(e.target.value);
    }

    const makeDate = (newValue) => {
        setStartDate(newValue);
        compareDateTime();
        setStartDateChange(true)
    }

    const makeEndDate = (e) => {
        setEndDate(e);
        compareDateTime();
        setRemindCountEffect(e)
    }

    const makeMeetingInfo = (e) => {
        setMeetingInfo(e.target.value);
    }

    const handleSubmit = () => {

        if($('#make_new').val() === ''){
            return alert('미팅 이름을 입력해주세요.')
        }

        if($('#make_date').val() === ''){
            return alert('미팅 일자가 입력되지 않았습니다.')
        }
        const tenMinutesAgo = new Date();
        tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

        if(isNew === 0) {
            if(Selected1 < new Date().getHours() && startDate === dayjs(new Date()).format('YYYY-MM-DD')){
                return alert('미팅 시작 시간은 현재 시간 이전일 수 없습니다.');
            }
            // 오늘 날짜와 같고, 현재시간이랑 같거나 낮고, 현재 분 보다 낮을때
            if( Selected1 <= new Date().getHours() && Selected2 < new Date().getMinutes() && startDate === dayjs(new Date()).format('YYYY-MM-DD')){
                return alert('미팅 시작 시간은 현재 시간 이전일 수 없습니다.');
            }
        }

        // 비공개상태로 시간이 지난 이후 공개하기를 하려고 할때 이전시간인 경우 유효성 검사 체크
        if(location.state !== null && location.state.resultCode === 'FAIL01') {
            if(dayjs(startDate).format('YYYY-MM-DD') < dayjs(new Date()).format('YYYY-MM-DD')) {
                return alert('미팅 시작 날짜는 오늘 날짜 이전일 수 없습니다.');
            }

            if(new Date(`${dayjs(startDate).format('YYYY-MM-DD')} ${Selected1}:${Selected2}:00`) < new Date(new Date().getTime())){
                return alert('미팅 시작 시간은 현재 시간 이전일 수 없습니다.');
            }
        }

        if(new Date(endTime) <= new Date(startTime)){
            return alert('미팅 종료 시간은 시작 시간보다 이를 수 없습니다.');
        }

        if($('#make_time1').val() === ''){
            return alert('미팅 시작 시간이 입력되지 않았습니다.')
        }

        if($('#make_time2').val() === ''){
            return alert('미팅 종료 시간이 입력되지 않았습니다.')
        }

        if($('#make_room').val() === ''){
            return alert('미팅 정보가 입력되지 않았습니다.');
        }


        const formData = new FormData();
        formData.append('mt_name', title);
        formData.append('mt_start_dt',  `${dayjs(startDate).format('YYYY-MM-DD')} ${Selected1}:${Selected2}:00`);
        formData.append('mt_end_dt',   `${dayjs(startDate).format('YYYY-MM-DD')} ${Selected3}:${Selected4}:00`);
        formData.append('mt_info', meetingInfo);
        formData.append('mt_invite_email', invites.map(inv => inv.email).join());
        for (let i = 0; i < uploadedFiles.length; i++) {
            formData.append("file", uploadedFiles[i]);
        }

        if(remindBool){
            formData.append('mt_remind_type', parseInt(selectValue));
            formData.append('mt_remind_count', remindCount);
            if(selectValue === 2){
                formData.append('mt_remind_week', weekday.join());
            }
            if(selectValue === 3){
                formData.append('mt_remind_week', weekday22.filter(number => number !== 0).join());
            }
            if(selectValue === 4 ) {
                formData.append('mt_remind_monthType', radioSelectType)
            }
            if(selectValue === 4 && radioChecked){
                formData.append('mt_remind_monthDay', radioSelectedValue1);
            }
            if(selectValue === 4 && radioChecked2){
                formData.append('mt_remind_sequence', parseInt(radioSelectedValue2));
                formData.append('mt_remind_week', parseInt(radioSelectedValue3));
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
                }).catch()
        } else {
            formData.append('idx_meeting', window.location.pathname.split('/')[window.location.pathname.split('/').length-1]);
            if(uploadedFilesPlus.length > 0 ) {
                formData.append('ori_file', uploadedFilesPlus.map((value, index, array)=>{return value.idx}))
            }            if(delFiles.length > 0){
                formData.append('file_del', delFiles.join());
            }
            if(delUser.length > 0){
                formData.append('invite_del', delUser);
            }
            // for(let i of formData){
                // console.log(i);
            // }
            axios.post(SERVER_URL + '/meet/modify', formData, AXIOS_OPTION)
                .then(res => {
                    if(res.data.result_code === 'SUCCESS'){
                        alert('미팅룸을 수정했습니다.');
                        $('#shade3').removeClass('is-on');
                        navigate('/');
                    }else{
                        alert(res.data.result_str);
                    }
                }).catch()
        }
    }

    const openConfirmModal = () => {
        if($('#make_new').val() === ''){
            return alert('미팅 이름을 입력해주세요.')
        }

        if($('#make_date').val() === ''){
            return alert('미팅 일자가 입력되지 않았습니다.')
        }
        const tenMinutesAgo = new Date();
        tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);

        if(isNew === 0) {
            if(Selected1 < new Date().getHours() && startDate === dayjs(new Date()).format('YYYY-MM-DD')){
                return alert('미팅 시작 시간은 현재 시간 이전일 수 없습니다.');
            }
            // 오늘 날짜와 같고, 현재시간이랑 같거나 낮고, 현재 분 보다 낮을때
            if( Selected1 <= new Date().getHours() && Selected2 < new Date().getMinutes() && startDate === dayjs(new Date()).format('YYYY-MM-DD')){
                return alert('미팅 시작 시간은 현재 시간 이전일 수 없습니다.');
            }
        }

        if(setStartDateChange === true && dayjs(startDate).format('YYYY-MM-DD') < dayjs(new Date()).format('YYYY-MM-DD')) {
            return alert('미팅 시작 날짜는 오늘 날짜 이전일 수 없습니다.')
        }

        if(new Date(endTime) <= new Date(startTime)){
            return alert('미팅 종료 시간은 시작 시간보다 이를 수 없습니다.');
        }

        if($('#make_time1').val() === ''){
            return alert('미팅 시작 시간이 입력되지 않았습니다.')
        }

        if($('#make_time2').val() === ''){
            return alert('미팅 종료 시간이 입력되지 않았습니다.')
        }

        if($('#make_room').val() === ''){
            return alert('미팅 정보가 입력되지 않았습니다.');
        }


        $('#popup__notice').addClass('is-on');
        $('#shade3').addClass('is-on');
    }

    const openModal = () => {
        if($('#make_new').val() === ''){
            return alert('미팅 이름을 입력해주세요.')
        }

        if($('#make_date').val() === ''){
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

        if($('#make_time1').val() === ''){
            return alert('미팅 시작 시간이 입력되지 않았습니다.')
        }

        if($('#make_time2').val() === ''){
            return alert('미팅 종료 시간이 입력되지 않았습니다.')
        }

        if($('#make_room').val() === ''){
            return alert('미팅 정보가 입력되지 않았습니다.');
        }

        const formData = new FormData();
        formData.append('mt_name', title);
        formData.append('mt_start_dt',  `${dayjs(startDate).format('YYYY-MM-DD')} ${Selected1}:${Selected2}:00`);
        formData.append('mt_end_dt',   `${dayjs(startDate).format('YYYY-MM-DD')} ${Selected3}:${Selected4}:00`);
        formData.append('mt_info', meetingInfo);
        formData.append('mt_invite_email', invites.map(inv => inv.email).join());
        for (let i = 0; i < uploadedFiles.length; i++) {
            formData.append("file", uploadedFiles[i]);
        }
        if(remindBool){
            formData.append('mt_remind_type', parseInt(selectValue));
            formData.append('mt_remind_count', remindCount);
            if(selectValue === 2){
                formData.append('mt_remind_week', weekday.join());
            }
            if(selectValue === 3){
                formData.append('mt_remind_week', weekday22.filter(number => number !== 0).join());
            }
            if(selectValue === 4 ) {
                formData.append('mt_remind_monthType', radioSelectType)
            }
            if(selectValue === 4 && radioChecked){
                formData.append('mt_remind_monthDay', radioSelectedValue1);
            }
            if(selectValue === 4 && radioChecked2){
                formData.append('mt_remind_sequence', parseInt(radioSelectedValue2));
                formData.append('mt_remind_week', parseInt(radioSelectedValue3));
            }
            formData.append('mt_remind_end', dayjs(endDate).format('YYYY-MM-DD'));
        } else {
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
            if(uploadedFilesPlus.length > 0 ) {
                formData.append('ori_file', uploadedFilesPlus.map((value, index, array)=>{return value.idx}))
            }
            if(delFiles.length > 0){
                formData.append('file_del', delFiles.join());
            }
            if(delUser.length > 0){
                formData.append('invite_del', delUser);
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
        if(isNew === 2){
            alert('미팅룸을 비공개상태로 수정하였습니다.');
            navigate('/');
        }
    }

    const modalClose2 = () => {
        $('#popup__notice').removeClass('is-on');
        $('#shade3').removeClass('is-on');
    }

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

    $('#shade').click(() => {
        handleModal();
    })

    $('#shade2').off().on('click', () => {
        $('#popup__notice').removeClass('is-on');
        $('#shade2').removeClass('is-on');
        alert('미팅룸을 비공개상태로 수정하였습니다.');
        navigate('/');
    })

    const startDate2 = new Date(startDate);
    const endDate2 = new Date(endDate);
    endDate2.setDate(endDate2.getDate() + 1);
    const days = weekdayMinus1;
    const days2 = weekdayMinus2;

    const getDayCountBetweenDates = (startDate, endDate, days) => {
        let date = new Date(startDate);
        let count = 0;

        while (date <= endDate) {
            if (days.includes(date.getDay())) {
                count++;
            }
            date.setDate(date.getDate() + 1);
        }

        if (days.includes(date.getDay())) {
            count++;
        }

        return count;
    }

    const getWeekdayCountBetweenDates = (startDate, endDate, days) => {
        let date = new Date(startDate);
        let count = 0;
        let skipWeek = false;

        while (date <= endDate -1) {
            if (skipWeek) {
                date.setDate(date.getDate() + 1);
                skipWeek = !skipWeek;
            }

            if (days.includes(date.getDay())) {
                count++;
            }

            if (date.getDay() === 0) { // 일요일인 경우
                date.setDate(date.getDate() + 7); // date2의
                skipWeek = !skipWeek; // skipWeek의 값을 반전시킵니다.
            } else if (!skipWeek) {
                date.setDate(date.getDate() + 1);
            }
        }

        if (days.includes(date.getDay())) {
            count++;
        }

        return count;
    };



    const [selected, setSelected] = useState([]);
    const [selected22, setSelected22] = useState([]);
    const [dayCount, setdayCount] = useState(0)
    const [weekCount, setWeekCount] = useState(0)
    const [todayWeekday, setTodayWeekday] = useState(null);
    const [todayWeekday22, setTodayWeekday22] = useState(null);

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekdays22 = ['일', '월', '화', '수', '목', '금', '토'];

    useEffect(()=> {
        setdayCount(getDayCountBetweenDates(startDate2, endDate2, days));
        setWeekCount(getWeekdayCountBetweenDates(startDate, endDate, days2))
    },[weekdayMinus1, weekdayMinus2, endDate2, startDate2, startDate, endDate, Selected1, Selected2, Selected3, Selected4])


    useEffect(() => {

        const today = new Date();
        const index = weekdays.indexOf(todayWeekday);
        const index22 = weekdays22.indexOf(todayWeekday22);

        if(selectValue === 4 || selectValue === 1) {
            setWeekdayArrNew([]) // 배열 초기화
            setWeekday([]) // 배열 초기화
            setWeekdayArrNew2([]) // 배열 초기화
            setWeekday22([]) // 배열 초기화
        }

        if(selectValue === 2) {
            setWeekdayArrNew2([]) // 배열 초기화
            setWeekday22([]) // 배열 초기화
        }

        setTodayWeekday(weekdays[today.getDay()]);
        setWeekDay(index + 1);

        if(selectValue === 3) {
            setWeekdayArrNew([]) // 배열 초기화
            setWeekday([]) // 배열 초기화
        }

        setTodayWeekday22(weekdays22[today.getDay()]);
        setWeekDay22(index22 + 1);

        // 되풀이미팅 반복주기 변경시 매월 값 현재 날짜 값으로 초기화
        const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        setRadioSelectedValue(dayjs(today).format('DD'))
        setRadioSelectedValue2(Math.min(5, Math.ceil(((new Date() - firstDay) / 86400000 + firstDay.getDay()) / 7))); // 5이상인 번째 ex)6주 나오면 5번째로 바꿔주기
        setRadioSelectedValue3(new Date().getDay() + 1);

    }, [selectValue]);

    useEffect(()=> {

    },[setSelectValue])

    function setWeekDay(day) {
        if (!weekday.includes(day)) {
            setWeekday([...weekday, day]);
            setSelected([...weekday, day]);
        }
    }

    const getWeekDay = day => {
        let bool = false;
        weekday.forEach(d => {
            if (d === day) {
                bool = true;
            }
        });

        if (!bool) {
            setWeekday([...new Set([...weekday, day])]);
            setSelected([...new Set([...selected, day])]);
        } else {
            setWeekday(weekday.filter(d => d !== day));
            setSelected(selected.filter((option) => option !== day));
        }
    };


    function setWeekDay22(day) {
        if (!weekday22.includes(day)) {
            setWeekday22([...weekday22, day]);
            setSelected22([...weekday22, day]);
        }
    }

    const getWeekDay22 = day => {
        let bool = false;
        weekday22.forEach(d => {
            if (d === day) {
                bool = true;
            }
        });

        if (!bool) {
            setWeekday22([...new Set([...weekday22, day])]);
            setSelected22([...new Set([...selected22, day])]);
        } else {
            setWeekday22(weekday22.filter(d => d !== day));
            setSelected22(selected22.filter((option) => option !== day));
        }
    };


    const [radioSelectType, setRadioSelectType] = useState(1)
    const [radioSelectedValue1, setRadioSelectedValue] = useState(1)
    const [radioSelectedValue2, setRadioSelectedValue2] = useState(1)
    const [radioSelectedValue3, setRadioSelectedValue3] = useState(1)


    const radioSelectHandle = () => {
        setRadioChecked(true)
        setRadioChecked2(false)
        setRadioSelectType(1)
    }

    const radioSelectHandle2 = () => {
        setRadioChecked2(true)
        setRadioChecked(false)
        setRadioSelectType(2)
    }

    const radioSelected1 = (e) => {
        setRadioSelectedValue(e.target.value);
    };

    const radioSelected2 = (e) => {
        setRadioSelectedValue2(e.target.value);
    };

    const radioSelected3 = (e) => {
        setRadioSelectedValue3(e.target.value);
    };

    function countSpecificDates(startDate, endDate, specificDates) {
        const dates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            dates.push(currentDate);
            currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        } // 시작 날짜와 종료 날짜 사이에 있는 날짜를 전부 dates 배열에 담는다.


        let count = 0;

        // dates 배열에서 각 요소를 하나씩 꺼내서 date 변수에 담아서 반복문 실행
        for (let date of dates) {
            // date 변수의 값의 날짜가 인자값으로 받은 문자열 값을 정수형으로 반환한 값과 일치 할 경우 개수를 반환한다.
            if (date.getDate() === Number(specificDates)) {
                count += 1;
            }
        }

        // 찾은 특정 날짜의 개수를 반환한다.
        return count;
    }

    const [monthCount, setMonthCount] = useState(0)
    const [monthCount2, setMonthCount2] = useState(0)

    useEffect(()=>{
        setMonthCount(countSpecificDates(startDate, endDate, radioSelectedValue1))
        setMonthCount2(getNthWeekNthDay(startDate, endDate, week11, dayOfWeek11))
    }, [radioSelectedValue1, startDate, endDate, Selected1, Selected2, Selected3, Selected4])

    const week11 = radioSelectedValue2   ; // n번째 주
    const dayOfWeek11 = radioSelectedValue3 - 1; // n요일



    function getNthWeekNthDay(startDate, endDate, week, dayOfWeek) {
        let nthDay = 0;
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            if (currentDate.getDay() === dayOfWeek && currentDate.getDate() >= week * 7 - 6 && currentDate.getDate() <= week * 7) {
                nthDay++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        if (currentDate.getDay() === dayOfWeek && currentDate.getDate() >= week * 7 - 6 && currentDate.getDate() <= week * 7) {
            nthDay++;
        }
        return nthDay;
    } // 사용할 함수

    useEffect(()=> {
        compareDateTime()
    },[startDate, Selected1, Selected2, Selected3, Selected4])

    useEffect(()=> {
        if(roomStatus === true) {
            setModifyBool(false);
        }
    }, []);



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
                        <input type="text" className="text" id="make_new" maxLength="100" onChange={makeTitle} placeholder="미팅 이름을 입력해주세요." defaultValue={isNew === 0 ? '' : roomInfo.mt_name}/>
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
                                                selectValue === 1 ? `매일, ${dayjs(endDate).format('YYYY년 MM월 DD일')}까지, ${dayjs(endDate).diff(startDate, 'day') + 1}개 되풀이 항목` :
                                                    selectValue === 2 ? `매주 ${weekdayArrNew} ${dayjs(endDate).format('YYYY년 MM월 DD일')}까지, ${dayCount}개 되풀이 항목` :
                                                        selectValue === 3 ? `매 2주 ${weekdayArrNew2} 마다 ${dayjs(endDate).format('YYYY년 MM월 DD일')}까지, ${weekCount}개 되풀이 항목` :
                                                            selectValue === 4 && radioChecked ?
                                                                `매월, ${dayjs(endDate).format('YYYY년 MM월 DD일')}까지, ${monthCount}개 되풀이 항목` :
                                                                selectValue === 4 && radioChecked2 && week11 !== '5' ?
                                                                    `매월, ${dayjs(endDate).format('YYYY년 MM월 DD일')}까지, ${monthCount2}개 되풀이 항목` :
                                                                    selectValue === 4 && radioChecked2 && week11 === '5' ?
                                                                        `매월2, ${dayjs(endDate).format('YYYY년 MM월 DD일')}까지, ${dayjs(endDate).diff(startDate, 'month') + 1}개 되풀이 항목` : ''
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
                                    <dd>
                                        {
                                            selectValue === 1 ? ''
                                                : selectValue === 2 ? ''
                                                    : selectValue === 3 ? ''
                                                        : selectValue === 4 ? ''
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
                                                {weekdays.map((weekday, index) => (
                                                    <div className="checkbox type__square" key={weekday}>
                                                        <input
                                                            type="checkbox"
                                                            name="weekday"
                                                            className="checkbox checkDisabledCheck"
                                                            id={`week_${index + 1}`}
                                                            value={index}
                                                            onChange={() => getWeekDay(index + 1)}
                                                            defaultChecked={todayWeekday === weekday}
                                                            disabled={selected.length < 2 && selected.includes(index + 1)}
                                                        />
                                                        <label htmlFor={`week_${index + 1}`}>{weekday}</label>
                                                    </div>
                                                ))}
                                                </dd>
                                            </dl>
                                        </> : null
                                }
                                {
                                    selectValue === 3 ?
                                        <>
                                            <hr />
                                            <dl className="inline__type">
                                                 <dt><label htmlFor="월">반복 요일</label></dt>
                                                <dd>
                                                    {weekdays22.map((weekday22, index22) => (
                                                        <div className="checkbox type__square" key={weekday22}>
                                                            <input
                                                                type="checkbox"
                                                                name="weekday"
                                                                className="checkbox checkDisabledCheck"
                                                                id={`week22_${index22 + 1}`}
                                                                value={index22}
                                                                onChange={() => getWeekDay22(index22 + 1)}
                                                                defaultChecked={todayWeekday22 === weekday22}
                                                                disabled={selected22.filter(number => number !== 0).length < 2 && selected22.includes(index22 + 1)}
                                                            />
                                                            <label htmlFor={`week22_${index22 + 1}`}>{weekday22}</label>
                                                        </div>
                                                    ))}
                                                </dd>
                                            </dl>
                                        </>
                                    : null
                                }
                                <hr />
                                { selectValue === 4 ?
                                    <>
                                        <div className="input_flex">
                                            <input type="radio" id="byDate" name="byCheck" checked={radioChecked} onChange={radioSelectHandle} />
                                            <dl className="inline__type">
                                                <dt><label htmlFor="byDate">날짜 기준</label></dt>
                                                <dd>
                                                    <select className="make-select" onChange={radioSelected1} value={radioSelectedValue1}  disabled={radioChecked2}>
                                                        {by_date_option.map((item) => (
                                                            <option value={item.value} key={item.idx}>
                                                                {item.label}
                                                            </option>
                                                        ))}
                                                    </select> 일
                                                </dd>
                                            </dl>
                                        </div>
                                        <hr/>
                                        <div className="input_flex">
                                            <input type="radio" id="byDayOfWeek" name="byCheck" checked={radioChecked2} onChange={radioSelectHandle2}/>
                                            <dl className="inline__type">
                                                <dt><label htmlFor="byDayOfWeek">요일 기준</label></dt>
                                                <dd>
                                                    <select className="make-select" onChange={radioSelected2} value={radioSelectedValue2} disabled={radioChecked}>
                                                        {by_day_of_week_option.map((item) => (
                                                            <option value={item.value} key={item.idx}>
                                                                {item.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <select className="make-select" onChange={radioSelected3} value={radioSelectedValue3} disabled={radioChecked}>
                                                        {by_day_of_week_option2.map((item) => (
                                                            <option value={item.value} key={item.idx}>
                                                                {item.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </dd>
                                            </dl>
                                        </div>
                                        <hr/>
                                    </>
                                    : null

                                }
                                <dl className="inline__type">
                                    <dt><label htmlFor="종료 날짜">종료 날짜</label></dt>
                                    <dd>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                id="meeting_end_date"
                                                className="text under-scope"
                                                // label="Basic example"
                                                value={endDate}
                                                minDate={dayjs(startDate)}
                                                mask={"____-__-__"}
                                                maxDate={maxDate}
                                                inputFormat="YYYY-MM-DD"
                                                onChange={makeEndDate}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </dd>
                                </dl>
                            </div>
                            :
                            null
                        }

                    </div>

                    <div className="input__group">
                        <label htmlFor="make_room">미팅 정보</label>
                        <textarea name="" id="make_room" cols="10" rows="3" placeholder="미팅정보를 입력해주세요." maxLength="3000" onChange={makeMeetingInfo} value={meetingInfo}></textarea>
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
                            isNew === 0 ?
                            <div onClick={handleSubmit} className="btn btn__able">저장</div>
                                :
                            <div onClick={modifyBool ? openConfirmModal : handleSubmit} className="btn btn__able">저장</div>
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
                {
                    isNew === 2 ?
                        <>
                            <div onClick={modalClose} className="btn__close js-modal-close">
                                <img src={require('../assets/image/ic_close_24.png')} alt=""/>
                            </div>
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
                        </>
                    :
                        <>
                            <div onClick={modalClose2} className="btn__close js-modal-close">
                                <img src={require('../assets/image/ic_close_24.png')} alt=""/>
                            </div>
                            <div className="popup__cnt">
                                <div className="pop__message">
                                    <img src={require('../assets/image/ic_warning_80.png')} alt=""/>
                                    <div id="mt_status_2">
                                        <strong>미팅 일정 또는 참석자 명단에 수정사항이 있습니다.</strong>
                                        <span>참석자에게 메일을 발송하시겠습니까?</span>
                                    </div>
                                </div>
                                <div className="btn__group">
                                    <button onClick={modalClose2} className="btn btn__normal btn__s js-modal-close">수정취소</button>
                                    <button onClick={handleSubmit} className="btn btn__able btn__s">메일발송</button>
                                </div>
                            </div>
                        </>
                }
            </div>

        </div>
    )
}

export default NewRoom;