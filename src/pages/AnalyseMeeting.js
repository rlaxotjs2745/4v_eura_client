import React, {useState, useEffect} from 'react';
import $ from "jquery";
import {Link, useNavigate, useLocation, json} from "react-router-dom";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../util/env";
// import queryString from "query-string";
import { Player, ControlBar } from "video-react";
import "/node_modules/video-react/dist/video-react.css";
import EuraPlayer from "../util/EuraPlayer";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
    Pie,
    PieChart, Cell
} from 'recharts';
import AllUserBarGraph from "../Components/Cards/AllUserBarGraph";
import OneUserBarGraph from "../Components/Cards/OneUserBarGraph";
import AnalysisUserList from "../Components/Cards/AnalysisUserList";
import MeetingAnalysisPieGraph from "../Components/Cards/MeetingAnalysisPieGraph";
import InviteMyAnalPieGraphCard from "../Components/Cards/InviteMyAnalPieGraphCard";



const AnalyseMeeting = () => {
    const [movieSrc, setMovieSrc] = useState('');
    const [playMovieNo, setPlayMovieNo] = useState(0);
    const [lecture, setLecture] = useState({})
    const [btmdata, setBtmdata] = useState([])
    const [piedata, setPiedata] = useState([])
    const [middata, setMiddata] = useState([])

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
        setBtmdata([
            {
                name: "00:00:05",
                Bad: -80,
                Good: 0,
                amt: 0
            },
            {
                name: "00:00:10",
                Bad: 0,
                Good: 30,
                amt: 0
            },
            {
                name: "00:00:15",
                Bad: -60,
                Good: 0,
                amt: 0
            },
            {
                name: "00:00:20",
                Bad: -50,
                Good: 0,
                amt: 0
            },
            {
                name: "00:00:25",
                Bad: 0,
                Good: 60,
                amt: 0
            },
            {
                name: "00:00:30",
                Bad: -30,
                Good: 0,
                amt: 0
            },
            {
                name: "00:00:35",
                Bad: 0,
                Good: 80,
                amt: 0
            },
            {
                name: "00:00:05",
                Bad: -80,
                Good: 0,
                amt: 0
            },
            {
                name: "00:00:10",
                Bad: 0,
                Good: 30,
                amt: 0
            },
            {
                name: "00:00:15",
                Bad: -60,
                Good: 0,
                amt: 0
            },
            {
                name: "00:00:20",
                Bad: -50,
                Good: 0,
                amt: 0
            },
            {
                name: "00:00:25",
                Bad: 0,
                Good: 60,
                amt: 0
            },
            {
                name: "00:00:30",
                Bad: -30,
                Good: 0,
                amt: 0
            },
            {
                name: "00:00:35",
                Bad: 0,
                Good: 80,
                amt: 0
            }
        ])
        // 전체 집중도 원형그래프
        setPiedata([
            { name: "Good", value: 700 },
            { name: "Bad", value: 200 },
            { name: "Camera off", value: 100 },
        ])
        // 전체 집중도 그래프
        setMiddata([
            {
                name: "00:00:05",
                Bad: -80,
                Good: 20,
                amt: 0
            },
            {
                name: "00:00:10",
                Bad: -70,
                Good: 30,
                amt: 0
            },
            {
                name: "00:00:15",
                Bad: -60,
                Good: 40,
                amt: 0
            },
            {
                name: "00:00:20",
                Bad: -50,
                Good: 50,
                amt: 0
            },
            {
                name: "00:00:25",
                Bad: -40,
                Good: 60,
                amt: 0
            },
            {
                name: "00:00:30",
                Bad: -30,
                Good: 70,
                amt: 0
            },
            {
                name: "00:00:35",
                Bad: -20,
                Good: 80,
                amt: 0
            },
            {
                name: "00:00:05",
                Bad: -80,
                Good: 20,
                amt: 0
            },
            {
                name: "00:00:10",
                Bad: -70,
                Good: 30,
                amt: 0
            },
            {
                name: "00:00:15",
                Bad: -60,
                Good: 40,
                amt: 0
            },
            {
                name: "00:00:20",
                Bad: -50,
                Good: 50,
                amt: 0
            },
            {
                name: "00:00:25",
                Bad: -40,
                Good: 60,
                amt: 0
            },
            {
                name: "00:00:30",
                Bad: -30,
                Good: 70,
                amt: 0
            },
            {
                name: "00:00:35",
                Bad: -20,
                Good: 80,
                amt: 0
            },
            {
                name: "00:00:05",
                Bad: -80,
                Good: 20,
                amt: 0
            },
            {
                name: "00:00:10",
                Bad: -70,
                Good: 30,
                amt: 0
            },
            {
                name: "00:00:15",
                Bad: -60,
                Good: 40,
                amt: 0
            },
            {
                name: "00:00:20",
                Bad: -50,
                Good: 50,
                amt: 0
            },
            {
                name: "00:00:25",
                Bad: -40,
                Good: 60,
                amt: 0
            },
            {
                name: "00:00:30",
                Bad: -30,
                Good: 70,
                amt: 0
            },
            {
                name: "00:00:35",
                Bad: -20,
                Good: 80,
                amt: 0
            },
            {
                name: "00:00:05",
                Bad: -100,
                Good: 0,
                amt: 0
            },
            {
                name: "00:00:10",
                Bad: -70,
                Good: 30,
                amt: 0
            },
            {
                name: "00:00:15",
                Bad: -60,
                Good: 40,
                amt: 0
            },
            {
                name: "00:00:20",
                Bad: -50,
                Good: 50,
                amt: 0
            },
            {
                name: "00:00:25",
                Bad: -40,
                Good: 60,
                amt: 0
            },
            {
                name: "00:00:30",
                Bad: -30,
                Good: 70,
                amt: 0
            },
            {
                name: "00:00:35",
                Bad: -20,
                Good: 80,
                amt: 0
            },
        ])

        axios.get(SERVER_URL + `/meet/result/meeting?idx_meeting=`+pathSplit, AXIOS_OPTION)
            .then(res => {
                if(res.data.result_code === 'SUCCESS'){
                    let _data = res.data.data
                    console.log(_data);
                    setLecture(_data)
                    // console.log(res)
                    // setMiddata(_data.mtAnalyMid)
                    // setBtmdata(_data.mtData0)
                    // setPiedata([
                    //     { name: "Good", value: _data.mtAnalyTop.good },
                    //     { name: "Bad", value: _data.mtAnalyTop.bad },
                    //     { name: "Camera off", value: _data.mtAnalyTop.off },
                    // ])
                    let _mfile = _data.mtMovieFiles
                    if(_mfile.length>0){setMovieSrc(_mfile[0].fileUrl)}
                    console.log('_mfile.length : '+ _mfile.length)
                }else{
                    alert(res.data.result_str)
                }
            }).catch((error)=>{
            console.log(error)
        });

        return () => {
            console.log('END')
            console.log("movieSrc1:" + movieSrc)
        }
    }, [])

    // useEffect(() => {
    //     console.log("movieSrc2:" + movieSrc)
    // }, [movieSrc])

    //
    // let movie1180 = {
    //     width:"1180px !important",
    //     height:"407px !important"
    // }
    //
    // let moviebox1180 = {
    //     width:"1180px !important",
    //     height:"407px !important",
    //     overflow:"hidden",
    //     textAlign:"center"
    // }
    // let moviebox860 = {
    //     width:"806px !important",
    //     height:"407px !important",
    //     overflow:"hidden",
    //     textAlign:"center"
    // }

    const data = [
        { name: 'Group A', value: 700 },
        { name: 'Group B', value: 200 },
        { name: 'Group C', value: 100 },
    ];
    const COLORS = ['#3377ff', '#ffc633', 'gray'];

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
                                                <span className="file__name">강의에 업로드 된 파일이 없습니다.</span>
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
                                        <span className="file__name">강의에 업로드 된 파일이 없습니다.</span>
                                    </a>
                                    : lecture.mtAttachedFiles.map(file => {
                                        return (
                                            <a download key={file.idx} href={file.fileUrl}><img src={require('../assets/image/ic_file_14.png')} alt=""/> {file.filename}</a>
                                        )
                                    })
                            }
                        </div>
                    </div>

                    {/*<AnalysisUserList lecture={lecture} />*/}
                    <InviteMyAnalPieGraphCard />
                    {/*<div className="result__one_user">*/}
                    {/*    <PieChart width={400} height={400} >*/}
                    {/*        <Pie*/}
                    {/*            data={data}*/}
                    {/*            // cx={120}*/}
                    {/*            // cy={200}*/}
                    {/*            startAngle={0}*/}
                    {/*            innerRadius={60}*/}
                    {/*            outerRadius={80}*/}
                    {/*            fill="#8884d8"*/}
                    {/*            // paddingAngle={5}*/}
                    {/*            dataKey="value"*/}
                    {/*        >*/}
                    {/*            {data.map((entry, index) => (*/}
                    {/*                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />*/}
                    {/*            ))}*/}
                    {/*            <div><img className="pieImage" src={require('../assets/image/icon_angry.png')}/></div>*/}
                    {/*        </Pie>*/}
                    {/*    </PieChart>*/}
                    {/*</div>*/}


                    <div className="result__mov" title="영상자리 (860 x 407)">
                        <Player src={movieSrc} width={860} height={407}></Player>
                    </div>

                    <AllUserBarGraph middata={middata} />
                    <div className="result__anal_timeline">

                    </div>

                    <OneUserBarGraph btmdata={btmdata} />

                </div>
            </section>
        </>
    )
}

export default AnalyseMeeting;