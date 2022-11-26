import React, {useState, useEffect} from 'react';
import $ from "jquery";
import {Link, useNavigate, useLocation, json} from "react-router-dom";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../util/env";
import { Player, ControlBar, VolumeMenuButton, CurrentTimeDisplay, DurationDisplay } from 'video-react';
import "/node_modules/video-react/dist/video-react.css";
import AllUserBarGraph from "../Components/Cards/AllUserBarGraph";
import OneUserBarGraph from "../Components/Cards/OneUserBarGraph";
import AnalysisUserList from "../Components/Cards/AnalysisUserList";
import MeetingAnalysisPieGraph from "../Components/Cards/MeetingAnalysisPieGraph";
import InviteMyAnalPieGraphCard from "../Components/Cards/InviteMyAnalPieGraphCard";
import HLSSource from "../Components/Cards/HLSSource";



const AnalyseMeeting = () => {
    const [movieSrc, setMovieSrc] = useState('');
    const [lecture, setLecture] = useState({});
    const [btmdata, setBtmdata] = useState([]);
    const [piedata, setPiedata] = useState([]);
    const [middata, setMiddata] = useState([]);
    const [oneUserData, setOneUserData] = useState([]);
    const [oneUserLevel, setOneUserLevel] = useState({});
    const [oneUserBool, setOneUserBool] = useState(false);
    const [oneUserResult, setOneUserResult] = useState([]);
    const [oneUserResultab, setOneUserResultab] = useState({})
    const [player, setPlayer] = useState({});

    const location = useLocation(); // 홈에서 넘겨준 스테이트 값
    const pathSplit = location.pathname.split('/')[2] // pathname /로 뜯어서 2번째값


    // const params = {idx_meeting:pathSplit};
    // const AXIOS_OPTION_TEMP = {
    //     headers: {
    //         "uid":"shingj@greenbros.co.kr"
    //     }
    // };

    useEffect(() => {
        // 개인 집중도 그래프
        // setBtmdata([
        //     {
        //         name: "00:00:05",
        //         Bad: -80,
        //         Good: 0,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:10",
        //         Bad: 0,
        //         Good: 30,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:15",
        //         Bad: -60,
        //         Good: 0,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:20",
        //         Bad: -50,
        //         Good: 0,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:25",
        //         Bad: 0,
        //         Good: 60,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:30",
        //         Bad: -30,
        //         Good: 0,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:35",
        //         Bad: 0,
        //         Good: 80,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:05",
        //         Bad: -80,
        //         Good: 0,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:10",
        //         Bad: 0,
        //         Good: 30,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:15",
        //         Bad: -60,
        //         Good: 0,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:20",
        //         Bad: -50,
        //         Good: 0,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:25",
        //         Bad: 0,
        //         Good: 60,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:30",
        //         Bad: -30,
        //         Good: 0,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:35",
        //         Bad: 0,
        //         Good: 80,
        //         amt: 0
        //     }
        // ])
        // // 전체 집중도 원형그래프
        // setPiedata([
        //     { name: "Good", value: 700 },
        //     { name: "Bad", value: 200 },
        //     { name: "Camera off", value: 100 },
        // ])
        // // 전체 집중도 그래프
        // setMiddata([
        //     {
        //         name: "00:00:05",
        //         Bad: -80,
        //         Good: 20,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:10",
        //         Bad: -70,
        //         Good: 30,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:15",
        //         Bad: -60,
        //         Good: 40,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:20",
        //         Bad: -50,
        //         Good: 50,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:25",
        //         Bad: -40,
        //         Good: 60,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:30",
        //         Bad: -30,
        //         Good: 70,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:35",
        //         Bad: -20,
        //         Good: 80,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:05",
        //         Bad: -80,
        //         Good: 20,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:10",
        //         Bad: -70,
        //         Good: 30,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:15",
        //         Bad: -60,
        //         Good: 40,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:20",
        //         Bad: -50,
        //         Good: 50,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:25",
        //         Bad: -40,
        //         Good: 60,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:30",
        //         Bad: -30,
        //         Good: 70,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:35",
        //         Bad: -20,
        //         Good: 80,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:05",
        //         Bad: -80,
        //         Good: 20,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:10",
        //         Bad: -70,
        //         Good: 30,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:15",
        //         Bad: -60,
        //         Good: 40,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:20",
        //         Bad: -50,
        //         Good: 50,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:25",
        //         Bad: -40,
        //         Good: 60,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:30",
        //         Bad: -30,
        //         Good: 70,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:35",
        //         Bad: -20,
        //         Good: 80,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:05",
        //         Bad: -100,
        //         Good: 0,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:10",
        //         Bad: -70,
        //         Good: 30,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:15",
        //         Bad: -60,
        //         Good: 40,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:20",
        //         Bad: -50,
        //         Good: 50,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:25",
        //         Bad: -40,
        //         Good: 60,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:30",
        //         Bad: -30,
        //         Good: 70,
        //         amt: 0
        //     },
        //     {
        //         name: "00:00:35",
        //         Bad: -20,
        //         Good: 80,
        //         amt: 0
        //     },
        // ])

        axios.get(SERVER_URL + `/meet/result/meeting?idx_meeting=${pathSplit}`, AXIOS_OPTION)
            .then(res => {
                if(res.data.result_code === 'SUCCESS'){
                    let _data = res.data.data;
                    setLecture(_data);
                    // console.log(res)
                    setMiddata(_data.mtAnalyMid ? [{longP:100, longM:-100},..._data.mtAnalyMid] : []);
                    setBtmdata(_data.mtData0 ? [{longP:100, longM:-100},..._data.mtData0] : []);
                    setPiedata([
                        { name: "Good", value: _data.mtAnalyTop.good },
                        { name: "Bad", value: _data.mtAnalyTop.bad },
                        { name: "Camera off", value: _data.mtAnalyTop.off },
                    ])
                    setOneUserResult(_data.mtData1 ? [
                        { name: "Good", value: _data.mtData1.good },
                        { name: "Bad", value: _data.mtData1.bad },
                        { name: "Camera Off", value: _data.mtData1.off },
                    ]
                        : []);
                    setOneUserResultab(_data.mtData1 ? _data.mtData1 : {});



                    let _mfile = _data.mtMovieFiles;
                    if(_mfile.length>0){setMovieSrc(_mfile[0].fileUrl)};
                }else{
                    alert(res.data.result_str)
                }
            }).catch((error)=>{
            console.log(error);
        });
    }, [])



    const clickUser = (idx) => {
        if(lecture.is_host){
            axios.get(SERVER_URL + `/meet/result/mtinviteinfo?idx_meeting=${pathSplit}&idx_user=${idx}`, AXIOS_OPTION)
                .then(res => {
                    const mtData0 = res.data.data.mtData0;
                    const mtData1 = res.data.data.mtData1;

                    setOneUserLevel ({mtData0: [{longP:100, longM:-100}, ...mtData0.map(data => {
                        if(data.bad > 0){
                            return {...data, bad: data.bad * -1};
                        }
                        return data;
                    })], mtData1: [
                                { name: "Good", value: mtData1.good },
                                { name: "Bad", value: mtData1.bad },
                                { name: "Camera Off", value: mtData1.off },
                            ], mtData1ab: {...mtData1, bad: mtData1.bad * -1}
                        }
                    );
                    setOneUserData([...oneUserData, mtData1]);
                    setOneUserBool(true);
                })
        }
    }


    return (
        <>
            <section className="content" id="content">
                <div className="page">
                    <div className="result__dash">
                        <div>
                            <h3>{lecture.mtName} 미팅 분석 결과</h3>
                            <dl>
                                <dt>호스트 이름</dt>
                                <dd>{lecture.hostname}</dd>
                                <dt>날짜</dt>
                                <dd>{lecture.mtMeetiDate}</dd>
                                <dt>시간</dt>
                                <dd>{lecture.mtMeetiTime}</dd>
                                <dt>소요 시간</dt>
                                <dd>{lecture.mtMeetTimer}</dd>
                                <dt className="th__file">저장된 파일</dt>
                                <dd className="td__file moveFilelist">
                                    {
                                        !lecture.mtMovieFiles || !lecture.mtMovieFiles.length ?
                                            <a>
                                                <span className="file__name">미팅에 업로드 된 파일이 없습니다.</span>
                                            </a>
                                            :
                                            lecture.mtMovieFiles.map(file => {
                                                return (
                                                    <a href="#" className="file__anchor" title={file.filename}><span>{file.fileNo}</span></a>
                                                )
                                            })
                                    }
                                </dd>
                            </dl>
                        </div>
                        <MeetingAnalysisPieGraph data={piedata} />
                    </div>
                    <div className="result__download">
                        <h4 className="result__title">첨부파일({!lecture || !lecture.mtAttachedFiles ? '0' : [...lecture.mtAttachedFiles].length})</h4>
                        <div className="result__list">
                            {
                                !lecture.mtAttachedFiles || !lecture.mtAttachedFiles.length ?
                                    <a>
                                        <span className="file__name">미팅에 업로드 된 파일이 없습니다.</span>
                                    </a>
                                    : lecture.mtAttachedFiles.map(file => {
                                        return (
                                            <a download key={file.idx} href={file.fileUrl}><img src={require('../assets/image/ic_file_14.png')} alt=""/> {file.filename}</a>
                                        )
                                    })
                            }
                        </div>
                    </div>
                    <AnalysisUserList lecture={lecture} clickUser={clickUser} isHost={lecture.is_host} />


                    <div className="result__mov" title="영상자리 (860 x 407)">
                        <Player>
                           {/*<HLSSource isVideoChild src={movieSrc} />*/}
                            <source src="http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4" />
                            <ControlBar>
                                <VolumeMenuButton disabled />
                                <CurrentTimeDisplay disabled/>
                                <DurationDisplay disabled/>
                            </ControlBar>
                        </Player>
                    </div>

                    {
                        lecture.is_host ?
                            null
                            :
                            <InviteMyAnalPieGraphCard oneUserResult={oneUserResult} oneUserResultab={oneUserResultab} />
                    }

                    {
                        lecture.is_host ?
                        <AllUserBarGraph middata={middata} />
                        :
                        <OneUserBarGraph btmdata={btmdata} />
                    }
                    {
                        oneUserBool && oneUserLevel ?
                                    <>
                                        <InviteMyAnalPieGraphCard oneUserResult={oneUserLevel.mtData1} oneUserResultab={oneUserLevel.mtData1ab} />
                                        <OneUserBarGraph btmdata={oneUserLevel.mtData0} />
                                    </>
                            :
                            null
                    }
                </div>
            </section>
        </>
    )
}

export default AnalyseMeeting;