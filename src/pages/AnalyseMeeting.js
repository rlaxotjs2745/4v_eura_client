import React, {useState, useEffect, useRef} from 'react';
import $ from "jquery";
import {Link, useNavigate, useLocation, json} from "react-router-dom";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../util/env";
import { Player, ControlBar, VolumeMenuButton, CurrentTimeDisplay, DurationDisplay, BigPlayButton, TimeDivider, LoadingSpinner } from 'video-react';
import "/node_modules/video-react/dist/video-react.css";
import AllUserBarGraph from "../Components/Cards/AllUserBarGraph";
import OneUserBarGraph from "../Components/Cards/OneUserBarGraph";
import AnalysisUserList from "../Components/Cards/AnalysisUserList";
import MeetingAnalysisPieGraph from "../Components/Cards/MeetingAnalysisPieGraph";
import InviteMyAnalPieGraphCard from "../Components/Cards/InviteMyAnalPieGraphCard";
import HLSSource from "../Components/Cards/HLSSource";
import { browserName, isSafari } from "react-device-detect";

const AnalyseMeeting = (props) => {
    const [movieSrc, setMovieSrc] = useState('');
    const [moviefile, setMovieFile] = useState([]);
    const [movieNo, setMevieNo] = useState(1);
    const [lecture, setLecture] = useState({});
    const [btmdata, setBtmdata] = useState([]);
    const [piedata, setPiedata] = useState([]);
    const [middata, setMiddata] = useState([]);
    const [oneUserData, setOneUserData] = useState([]);
    const [oneUserLevel, setOneUserLevel] = useState({});
    const [oneUserBool, setOneUserBool] = useState(false);
    const [oneUserResult, setOneUserResult] = useState([]);
    const [oneUserResultab, setOneUserResultab] = useState({})
    const player = useRef();
    const vLine = useRef();

    const location = useLocation(); // 홈에서 넘겨준 스테이트 값
    const pathSplit = location.pathname.split('/')[2] // pathname /로 뜯어서 2번째값
    let _mplay = false;

    useEffect(() => {
        player.current.subscribeToStateChange(handleStateChange.bind(this))
    }, [player])
  
    useEffect(() => {
        _mplay = false;
        player.current.load()
    }, [movieSrc])

    const handleStateChange = (state, prev) => {
        if(!_mplay && !!state.duration){
            _mplay = true;
            _getMeetResult(pathSplit, movieNo, Math.ceil(state.duration))
        }
        $(".v-line").css({left:$(".video-react-play-progress.video-react-slider-bar").width()})
        $(".v-box").css({left:$(".video-react-play-progress.video-react-slider-bar").width()})
    }

    const thisPlayer = (_no) => {
        setMevieNo(_no)
        setMovieSrc(moviefile[_no-1].fileUrl)
    }

    // 동영상 변경에 따른 그래프 변경
    const _getMeetResult = (_idx, _no, _duration) => {
        axios.get(SERVER_URL + `/meet/result/meeting?idx_meeting=`+_idx+`&fileno=`+_no+`&duration=`+_duration, AXIOS_OPTION)
            .then(res => {
                if(res.data.result_code === 'SUCCESS'){
                    let _data = res.data.data;
                    let _maxmid = 0;
                    if(!!_data.mtAnalyMid){
                        for(let i=0;i<_data.mtAnalyMid.length;i++){
                            let data = _data.mtAnalyMid[i]
                            if(_maxmid < parseInt(data.Good)){
                                _maxmid = parseInt(data.Good)
                            }
                            if(_maxmid < Math.abs(data.Bad)){
                                _maxmid = Math.abs(data.Bad)
                            }
                        }
                    }
                    let _maxbtm = 0;
                    if(!!_data.mtData0){
                        for(let i=0;i<_data.mtData0.length;i++){
                            let data = _data.mtData0[i]
                            if(_maxbtm < parseInt(data.good)){
                                _maxbtm = parseInt(data.good)
                            }
                            if(_maxbtm < Math.abs(data.bad)){
                                _maxbtm = Math.abs(data.bad)
                            }
                        }
                    }
                    setMiddata(_data.mtAnalyMid ? [{longP:_maxmid, longM:(_maxmid*-1)},..._data.mtAnalyMid] : []);
                    setBtmdata(_data.mtData0 ? [{longP:_maxbtm, longM:(_maxbtm*-1)},..._data.mtData0] : []);
                    $('.graph_on_seek').show();
                }else{
                    alert(res.data.result_str)
                }
            }).catch((error)=>{
            console.log(error);
        });
    }

    useEffect(() => {
        axios.get(SERVER_URL + `/meet/result/meeting?idx_meeting=${pathSplit}&fileno=1`, AXIOS_OPTION)
            .then(res => {
                if(res.data.result_code === 'SUCCESS'){
                    let _data = res.data.data;
                    setLecture(_data);
                    // console.log(res)
                    // setMiddata(_data.mtAnalyMid ? [{longP:100, longM:-100},..._data.mtAnalyMid] : []);
                    // setBtmdata(_data.mtData0 ? [{longP:100, longM:-100},..._data.mtData0] : []);
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
                    if(_mfile.length>0){
                        setMovieFile(_mfile)
                        isSafari ? setMovieSrc(_mfile[0].fileUrl) : setMovieSrc(_mfile[0].fileUrl2)
                    }
                }else{
                    alert(res.data.result_str)
                }
            }).catch((error)=>{
            console.log(error);
        });

    }, [])


    const clickUser = (idx) => {
        // if(lecture.is_host){
        //     axios.get(SERVER_URL + `/meet/result/mtinviteinfo?idx_meeting=${pathSplit}&idx_user=${idx}`, AXIOS_OPTION)
        //         .then(res => {
        //             const mtData0 = res.data.data.mtData0;
        //             const mtData1 = res.data.data.mtData1;
        //
        //             setOneUserLevel ({mtData0: [{longP:100, longM:-100}, ...mtData0.map(data => {
        //                 if(data.bad > 0){
        //                     return {...data, bad: data.bad * -1};
        //                 }
        //                 return data;
        //             })], mtData1: [
        //                         { name: "Good", value: mtData1.good },
        //                         { name: "Bad", value: mtData1.bad },
        //                         // { name: "Camera Off", value: mtData1.off },
        //                     ], mtData1ab: {...mtData1, bad: mtData1.bad * -1}
        //                 }
        //             );
        //             setOneUserData([...oneUserData, mtData1]);
        //             setOneUserBool(true);
        //         })
        // }
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
                                                    <a href="#" onClick={() => thisPlayer(file.fileNo)} className="file__anchor" title={file.filename}><span>{file.fileNo}</span></a>
                                                )
                                            })
                                    }
                                </dd>
                            </dl>
                        </div>
                        {
                            lecture.is_host === 1 ? 
                        <MeetingAnalysisPieGraph data={piedata} />
                        : "" }
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
                    {
                        isSafari ?
                        <Player ref={player}>
                            <HLSSource isVideoChild src={movieSrc} />
                            <ControlBar>
                                <VolumeMenuButton disabled />
                                <CurrentTimeDisplay disabled/>
                                <DurationDisplay disabled/>
                                <TimeDivider disabled />
                            </ControlBar>
                            <LoadingSpinner />
                            <BigPlayButton position="center" />
                        </Player>
                                :
                        <Player ref={player} src={movieSrc}>
                            <ControlBar>
                                <VolumeMenuButton disabled />
                                <CurrentTimeDisplay disabled/>
                                <DurationDisplay disabled/>
                                <TimeDivider disabled />
                            </ControlBar>
                            <LoadingSpinner />
                            <BigPlayButton position="center" />
                        </Player>
                    }
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
                    {/*{*/}
                    {/*    oneUserBool && oneUserLevel ?*/}
                    {/*                <>*/}
                    {/*                    <InviteMyAnalPieGraphCard oneUserResult={oneUserLevel.mtData1} oneUserResultab={oneUserLevel.mtData1ab} />*/}
                    {/*                    <OneUserBarGraph btmdata={oneUserLevel.mtData0} />*/}
                    {/*                </>*/}
                    {/*        :*/}
                    {/*        null*/}
                    {/*}*/}
                </div>
            </section>
        </>
    )
}

export default AnalyseMeeting;