import React, {useState, useEffect} from 'react';
import axios from "axios";
import MainTimer from "../Components/Cards/MainTimer";
import MainSchedule from "../Components/Cards/MainSchedule";
import MainMyMeetingRoom from "../Components/Cards/MainMyMeetingRoom";
import {Link, useNavigate} from "react-router-dom";
import {SERVER_URL, AXIOS_OPTION, REACT_APP_SDK} from "../util/env";
import $ from "jquery";

const Home = ({curSort, setCurSort, curLastSort, setCurLastSort}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [schedule, setSchedule] = useState([]);
    const [meeting, setMeeting] = useState({});
    const [lastMeeting, setLastMeeting] = useState([]);
    const [curMeeting, setCurMeeting] = useState(false)
    const [curEvent, setCurEvent] = useState(true);
    const [tcurPage, settCurPage] = useState(1);
    const [tcurLastPage, settCurLastPage] = useState(1);
    const [tcurSort, settCurSort] = useState(curSort);
    const [tcurLastSort, settCurLastSort] = useState(curLastSort);
    const [morePageBool, setMorePageBool] = useState(true);
    const [moreLastPageBool, setMoreLastPageBool] = useState(true);


    const allSort = [
        { value: '2', label: '미팅 시간 순'},
        { value: '1', label: '미팅 생성 순' },
        { value: '3', label: '비공개 미팅 순'},
        { value: '4', label: '취소된 미팅 순'}
    ];
    useEffect(() => {
        modalClose();
        getMain();
        getMainList();
        getMainEndList();
        $('#shade2').removeClass('is-on');
    }, []);


    const pageSort = (where, sort) => {
        let endPoint;
        let resMtd;
        if(where == 'lastMeetSort'){
            endPoint = `/meet/main/endlist?pageSort=${sort}&currentPage=1`;
            resMtd = (res) => setLastMeeting(res);
        } else {
            endPoint = `/meet/main/list?pageSort=${sort}&currentPage=1`;
            resMtd = (res) => setMeeting(res);
        }
        axios.get(SERVER_URL + endPoint, AXIOS_OPTION)
            .then(res => {
                resMtd(res.data.data);
                if(where == 'lastMeetSort'){
                    settCurLastSort(sort);
                    setCurLastSort(sort);
                    settCurLastPage(1);
                    sortLastMouseOut();
                    setMoreLastPageBool(true);
                } else {
                    settCurSort(sort);
                    setCurSort(sort);
                    settCurPage(1);
                    sortMouseOut();
                    setMorePageBool(true);
                }
            })
    }

    const modalOpen = (meet) => {
        setCurMeeting(meet);
        if(meet.mt_status == 0){
            $('#mt_status_0').show();
        } else {
            $('#mt_status_2').show();
        }
        $('#popup__notice').show();
        $('#shade').addClass('is-on');
    }

    const modalClose = () => {
        $('#mt_status_0').hide();
        $('#mt_status_2').hide();
        $('#popup__notice').hide();
        $('#shade').removeClass('is-on');
    }

    const modalFailOpen = () => {
        modalClose();
        $('#popup__fail').addClass('is-on')
        $('#shade2').addClass('is-on');
    }

    const modalFailclose = () => {
        $('#popup__fail').removeClass('is-on')
        $('#shade2').removeClass('is-on');
    }

    $('#shade2').off().on('click', function (){
        $('#popup__fail').removeClass('is-on')
        $('#shade2').removeClass('is-on');
    })

    const openFailNavi = () => {
        let meet = curMeeting;
        $('#popup__fail').removeClass('is-on')
        $('#shade2').removeClass('is-on');
        navigate(`/newroom/${meet.mt_idx}`, {state:{'resultCode':'FAIL01'}})
    }

    const changeMeetingStatus = () => {

        let meet = curMeeting;
        let newMeeting = [];
        if(meet.mt_status === 0){
            axios.put(SERVER_URL + '/meet/room/open', {"idx_meeting": meet.mt_idx}, AXIOS_OPTION)
                .then(res => {
                    if(res.data.result_code === "SUCCESS"){
                        meet.mt_status = 1;
                        newMeeting.push(meet);
                        for(let cur of meeting.mt_meetMyList){
                            if(cur.mt_idx !== meet.mt_idx){
                                newMeeting.push(cur);
                            }
                        }
                        // setMeeting({...meeting, mt_meetMyList: newMeeting});

                        modalClose();
                        getMain();
                    } else if (res.data.result_code === "FAIL01"){
                        modalFailOpen()
                    }
                }).catch(err => {
                console.log(err);
            });

        } else if(meet.mt_status === 2) {
            navigate(`/newroom/${meet.mt_idx}`);
        }
    }

    const navigateToMeetingRoom = (meet, isLast) => {
        if(isLast === 1){
            navigate(`/analyse/${meet}`, {state:meet});
        } else if(curEvent){
            navigate(`/meetingroom/${meet}`);
        }
    }

    const mouseOver = () => {
        setCurEvent(false);
    }

    const mouseOut = () => {
        setCurEvent(true);
    }

    const getMeetMore = (when) => {
        if(when === 'now'){
            axios.get(SERVER_URL + `/meet/main/list?currentPage=${tcurPage+1}&pageSort=${tcurSort}`, AXIOS_OPTION)
                .then(res => {
                    if(!res.data || !res.data.data || !res.data.data.mt_meetMyList || res.data.data.mt_meetMyList.length === 0 || (meeting.mt_meetMyList.length+res.data.data.mt_meetMyList.length) >= res.data.data.mt_meetMyListCount){
                        setMorePageBool(false);
                    }
                    setMeeting({...meeting, mt_meetMyList: [...meeting.mt_meetMyList, ...res.data.data.mt_meetMyList]});
                    settCurPage(tcurPage+1);
                })
        } else if(when === 'last'){
            axios.get(SERVER_URL + `/meet/main/endlist?currentPage=${tcurLastPage+1}&pageSort=${tcurLastSort}`, AXIOS_OPTION)
                .then(res => {
                    if(!res.data || !res.data.data || !res.data.data.mt_meetEndMyList || res.data.data.mt_meetEndMyList.length === 0 || (lastMeeting.mt_meetEndMyList.length+res.data.data.mt_meetEndMyList.length) >= res.data.data.mt_meetMyListCount){
                        setMoreLastPageBool(false);
                    }
                    setLastMeeting({...lastMeeting, mt_meetEndMyList: [...lastMeeting.mt_meetEndMyList, ...res.data.data.mt_meetEndMyList]});
                    settCurLastPage(tcurLastPage +1);
                })
        }
    }

    const sortMouseOver = () => {
        $('#cur_meet_sort').removeClass('meet_sort_select_hide')
    }

    const sortLastMouseOver = () => {
        $('#last_meet_sort').removeClass('meet_sort_select_hide')
    }

    const sortMouseOut = () => {
        $('#cur_meet_sort').addClass('meet_sort_select_hide')
    }

    const sortLastMouseOut = () => {
        $('#last_meet_sort').addClass('meet_sort_select_hide')
    }



    async function getMain() {
        axios.get(SERVER_URL + '/meet/main', AXIOS_OPTION)
        .then(res => {
            setUser(res.data.data);
            setSchedule(res.data.data.mt_meetShort);
            return () => {
                console.log("cleanup1");
            }
        })

    };
    async function getMainList() {
        axios.get(SERVER_URL + `/meet/main/list?currentPage=1&pageSort=${tcurSort}`, AXIOS_OPTION)
        .then(res => {
            if(!res.data || !res.data.data || !res.data.data.mt_meetMyList || res.data.data.mt_meetMyList.length === 0 || 8 > res.data.data.mt_meetMyListCount){
                setMorePageBool(false);
            }
            setMeeting(res.data.data);
            return () => {
                console.log("cleanup2");
            }
        })
    };
    async function getMainEndList() {
        axios.get(SERVER_URL + `/meet/main/endlist?currentPage=1&pageSort=${tcurLastSort}`, AXIOS_OPTION)
        .then(res => {
            if(!res.data || !res.data.data || !res.data.data.mt_meetEndMyList || res.data.data.mt_meetEndMyList.length === 0 || 8 > res.data.data.mt_meetMyListCount){
                setMoreLastPageBool(false);
            }
            setLastMeeting(res.data.data);
            return () => {
                console.log("cleanup3");
            }
        })
    };

    $('#shade').click(() => {
        modalClose();
    })


    return (
        <>
            <div className="page">
                <div className="eura_down_link">EURA를 사용하기 위해 파일 설치가 필요해요. <a download href={REACT_APP_SDK}>설치 파일 다운로드</a></div>
                <MainTimer user={user} />

                <MainSchedule schedule={schedule} />

                <div className="main__meetingroom">
                    <h3><img src={require('../assets/image/ic_video.png')} alt=""/> 나의 미팅룸 <em>{  !meeting ||
                    !meeting.mt_meetMyListCount ? 0 : meeting.mt_meetMyListCount}</em>
                        <Link to="/newroom" className="btn btn__make"><img src={require('../assets/image/ic_plus.png')} alt=""/>새 미팅룸 만들기</Link>
                        <div className="sorting" onMouseOver={sortMouseOver} onMouseOut={sortMouseOut}>
                            <div className="meet_sort_select">
                                <span>{allSort.filter(sort => sort.value == tcurSort)[0].label}</span>
                                <div id="cur_meet_sort" className="meet_sort_select__anchor meet_sort_select_hide">
                                    <ul>
                                        {
                                            allSort.filter(aSort => aSort.value != tcurSort).map(sort => <li onClick={() => pageSort('curSort', sort.value)}>{sort.label}</li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </h3>
                    <div className="boxing">
                        {
                            !meeting ||
                            !meeting.mt_meetMyList ||
                            !meeting.mt_meetMyList.length ?
                            <div className="boxing">
                                <div className="msg__nodata">
                                    <span>미팅 일정이 없습니다.</span>
                                </div>
                            </div>
                                :
                            meeting.mt_meetMyList.map((room, idx) => {
                                return (
                                    <MainMyMeetingRoom key={idx} room={room} modalOpen={modalOpen} isLast={0} navigateToMeetingRoom={navigateToMeetingRoom} mouseOver={mouseOver} mouseOut={mouseOut} />
                                )
                            })
                        }
                    </div>
                    {
                        !meeting ||
                        !meeting.mt_meetMyList || meeting.mt_meetMyList.length === 0 || meeting.mt_meetMyListCount === meeting.mt_meetMyList.length ||
                        !morePageBool ? '' :
                            <div className="btn__group">
                                <button onClick={() => getMeetMore('now')} className="btn btn__more">더 보기</button>
                            </div>
                    }
                </div>

                <div className="main__history">
                    <h3><img src="" alt=""/><img src={require('../assets/image/ic_last.png')} alt=""/> 지난 미팅 <em>{lastMeeting && lastMeeting.mt_meetMyListCount ? lastMeeting.mt_meetMyListCount : 0}</em>
                        <div className="sorting" onMouseOver={sortLastMouseOver} onMouseOut={sortLastMouseOut}>
                            <div className="meet_sort_select">
                                <span>{allSort.filter(sort => sort.value == tcurLastSort)[0].label}</span>
                                <div id="last_meet_sort" className="meet_sort_select__anchor meet_sort_select_hide">
                                    <ul>
                                        {
                                            allSort.filter(aSort => aSort.value != tcurLastSort).map(sort => <li onClick={() => pageSort('lastMeetSort', sort.value)}>{sort.label}</li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </h3>
                    <div className="boxing ">
                        {
                            !lastMeeting ||
                            !lastMeeting.mt_meetEndMyList || !lastMeeting.mt_meetEndMyList.length ?
                                <div className="boxing">
                                    <div className="msg__nodata">
                                        <span>지난 미팅 일정이 없습니다.</span>
                                    </div>
                                </div>
                                :
                                    lastMeeting.mt_meetEndMyList.map((room, idx) => {
                                        return (
                                            <MainMyMeetingRoom key={idx} room={room} modalOpen={modalOpen} isLast={1} navigateToMeetingRoom={navigateToMeetingRoom} mouseOver={mouseOver} mouseOut={mouseOut} />
                                    )
                                })
                        }
                        {
                            !lastMeeting ||
                            !lastMeeting.mt_meetEndMyList ||
                            lastMeeting.mt_meetMyListCount === 0 || lastMeeting.mt_meetMyListCount === lastMeeting.mt_meetEndMyList.length ||
                            !moreLastPageBool ? '' :
                                <div className="btn__group">
                                    <button onClick={() => getMeetMore('last')} className="btn btn__more">더 보기</button>
                                </div>
                        }
                    </div>
                </div>
                    <div id="popup__notice" className="pop__detail is-on">
                        <div onClick={modalClose} className="btn__close js-modal-close"><img src={require('../assets/image/ic_close_24.png')} alt=""/></div>
                        <div className="popup__cnt">
                            <div className="pop__message">
                                <img src={require('../assets/image/ic_warning_80.png')} alt=""/>
                                <div id="mt_status_0">
                                    <strong>미팅룸을 공개하면 다시 비공개로 설정할 수 없습니다. <br/>
                                        미팅룸을 공개 하시겠습니까?</strong>
                                    <span>미팅을 공개하면 초대한 참석자들에게 메일이 발송됩니다.</span>
                                </div>
                                <div id="mt_status_2">
                                    <strong>미팅룸을 재개설 하시겠습니까?</strong>
                                    <span>미팅을 재개설하면 초대한 참석자들에게 메일이 발송됩니다.</span>
                                </div>
                            </div>
                            <div className="btn__group">
                                <button onClick={changeMeetingStatus} className="btn btn__able btn__s">예</button>
                                <button onClick={modalClose} className="btn btn__normal btn__s js-modal-close">아니오</button>
                            </div>
                        </div>
                    </div>

                <div id="popup__fail" className="pop__detail">
                    <div onClick={modalFailclose} className="btn__close js-modal-close"><img src={require('../assets/image/ic_close_24.png')} alt=""/></div>
                    <div className="popup__cnt">
                        <div className="pop__message">
                            <img src={require('../assets/image/ic_warning_80.png')} alt=""/>
                            <div>
                                <strong>미팅일정이 현재시간보다 이전시간으로 설정되어 있습니다. <br/>미팅룸 일정을 수정해주세요!</strong>
                                <span>미팅을 재개설하면 초대한 참석자들에게 메일이 발송됩니다.</span>
                            </div>
                        </div>
                        <div className="btn__group">
                            <button onClick={modalFailclose} className="btn btn__normal btn__s js-modal-close">취소</button>
                            <button onClick={openFailNavi} className="btn btn__able btn__s">미팅 수정</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;