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
    PieChart
  } from 'recharts';

const AnalyseMeeting = () => {
    const profile = '../assets/image/image_profile.png'
    const graph = '../assets/image/graph.png';
    // const [vidRef, setVidRef] = useState('');
    const [movieSrc, setMovieSrc] = useState('');
    const [playMovieNo, setPlayMovieNo] = useState(0);
    const location = useLocation(); // 홈에서 넘겨준 스테이트 값
    const pathname = location.pathname; // 값 중에 pathname
    const pathSplit = pathname.split('/')[2] // pathname /로 뜯어서 2번째값
    // const pathSplit = 47
    // console.log(pathSplit); // 미팅룸 인덱스번호
    const params = {idx_meeting:pathSplit};
    const AXIOS_OPTION_TEMP = {
        headers: {
            "uid":"shingj@greenbros.co.kr"
        }
    };

    const [lecture, setLecture] = useState({})
    const [btmdata, setBtmdata] = useState([])
    const [piedata, setPiedata] = useState([])
    const [middata, setMiddata] = useState([])
    const colors = ['#3377ff', '#3377ff', '#ffc633', '#ffc633']
    const _colors = ['#3377ff', '#ffc633', 'gray']
    let chartIns = null

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
              }
          ])

        // 전체 집중도 원형그래프
        setPiedata([
            { name: "Good", value: 70 },
            { name: "Bad", value: 20 },
            { name: "Camera off", value: 10 },
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
              }
          ])
    
        axios.get(SERVER_URL + `/meet/result/meeting?idx_meeting=`+pathSplit, AXIOS_OPTION)
            .then(res => {
                if(res.data.result_code === 'SUCCESS'){
                    let _data = res.data.data
                    setLecture(_data)
                    // console.log(res)
                    setMiddata(_data.mtAnalyMid)
                    setBtmdata(_data.mtData0)
                    setPiedata([
                        { name: "Good", value: _data.mtAnalyTop.good },
                        { name: "Bad", value: _data.mtAnalyTop.bad },
                        { name: "Camera off", value: _data.mtAnalyTop.off },
                    ])
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
    
    // const [dur, setDuration] = useState(0)
    // const durationStat = (dur) => {
    //     setDuration(dur);
    // };

    // useEffect(() => {
    //     console.log(dur)
    // }, [dur])

    useEffect(() => {
        console.log("movieSrc2:" + movieSrc)
    }, [movieSrc])

    // console.log(lecture.mtInviteInfo)

    // alert('테스트 중입니다.')

    // <EuraPlayer ref={(ref) => (this.euraPlayer = ref)} />

    let movie1180 = {
        width:"1180px !important",
        height:"407px !important"
    }

    let moviebox1180 = {
        width:"1180px !important",
        height:"407px !important",
        overflow:"hidden",
        textAlign:"center"
    }
    let moviebox860 = {
        width:"806px !important",
        height:"407px !important",
        overflow:"hidden",
        textAlign:"center"
    }
    
    return (
        <>
            <section className="content" id="content">
                <div className="page">
                <div className="result__dash">
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
                                : lecture.mtMovieFiles.map(file => {
                                    return (
                                        <a href="#" className="file__anchor" title={file.filename}><span>{file.fileNo}</span></a>
                                    )
                                })
                        }
                        </dd>
                    </dl>
                    <div className="summary__graph" title="반원그래프 / 분석요약 TEXT">
                    <div style={{ width: "100%", height: 140 }}>
                    <ResponsiveContainer>
                    <PieChart>
                        <Pie dataKey="value" data={piedata} fill="#3377ff" label />
                    </PieChart>
                    </ResponsiveContainer>
                    </div>
                    </div>
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
                    {lecture.is_host === 0 ?
                    <>
                        {lecture.mtInviteInfo === null && lecture.mtData0 === null && lecture.mtData1 === null?
                            <>
                                <div className="result__mov" id="result__mov" title="영상자리 (1180 x 407)">
                                    {/* <EuraPlayer moveUrl={movieSrc} src={movieSrc} width={1180} height={407} videoWidth={1180} videoHeight={407} /> */}
                                    <Player src={movieSrc} width={1180} height={407} fluid="false"></Player>
                                </div>
                            </>
                            :
                            <>
                                <div className="result__user">
                                    <h4 className="result__title">분석요약</h4>

                                </div>
                                <div className="result__mov" title="영상자리 (860 x 407)">
                                    {/* <video id="MeetMovie" controls width={860} height={407} playsInline={true} src={movieSrc} /> */}
                                    <Player src={movieSrc} width={860} height={407}></Player>
                                    {/* <EuraPlayer moveUrl={movieSrc} src={movieSrc} width={860} height={407} videoWidth={860} videoHeight={407} /> */}
                                </div>
                                <div className="result__graph" title="그래프자리 (860 x 218)">
                                    {
                                        !middata || !middata.length ?'':
                                        <>
                                        <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                        width={860}
                                        height={218}
                                        data={middata}
                                        stackOffset="sign"
                                        margin={{
                                          top: 5,
                                          right: 30,
                                          left: 20,
                                          bottom: 5,
                                        }}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <ReferenceLine y={0} stroke="#000" />
                                        <Bar dataKey="Good" fill="#3377ff" stackId="stack" />
                                        <Bar dataKey="Bad" fill="#ffc633" stackId="stack" />
                                      </BarChart>
                                      </ResponsiveContainer>
                                        </>
                                    }
                                </div>
                            </>
                        }
                    </>
                    :
                    <>
                        <div className="result__user">
                            <h4 className="result__title">참석자 목록({!lecture || !lecture.mtInviteInfo ? '0' : lecture.mtInviteInfo.user_invite}/{!lecture || !lecture.mtInviteInfo ? '0' : lecture.mtInviteInfo.user_total})</h4>
                            <div className="result__watch">
                                <ul>
                                    {
                                        !lecture.mtInviteList || !lecture.mtInviteList.length
                                            ?
                                            <span className="file__name">참석자가 없습니다.</span>
                                            :
                                            lecture.mtInviteList.map(member => {
                                                return (
                                                    <li key={member.idx}>
                                                        <button>
                                                            <figure><img src={member.upic?member.upic:profile} alt=""/></figure>
                                                            <div className="watch__td"><span>{member.uname}</span><div>{member.uemail}</div></div>
                                                            {member.value > 60 ?
                                                                <div className="watch__percent is-good">{member.value}%</div>
                                                                :
                                                                <div className="watch__percent is-bad">{member.value}%</div>
                                                            }
                                                        </button>
                                                    </li>
                                                )
                                            })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="result__mov" title="영상자리 (860 x 407)">
                            {/* <video id="MeetMovie" controls width={860} height={407} playsInline={true} src={movieSrc} /> */}
                            <Player src={movieSrc} width={860} height={407}></Player>
                            {/* <EuraPlayer moveUrl={movieSrc} src={movieSrc} width={860} height={407} videoWidth={860} videoHeight={407} /> */}
                        </div>
                        <div className="result__graph" title="그래프자리 (860 x 218)">
                            {
                                !middata || !middata.length ?'':
                                <>
                                <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                        width={860}
                                        height={218}
                                        data={middata}
                                        stackOffset="sign"
                                        margin={{
                                          top: 5,
                                          right: 30,
                                          left: 20,
                                          bottom: 5,
                                        }}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <ReferenceLine y={0} stroke="#000" />
                                        <Bar dataKey="Good" fill="#3377ff" stackId="stack" />
                                        <Bar dataKey="Bad" fill="#ffc633" stackId="stack" />
                                      </BarChart>
                                      </ResponsiveContainer>
                                </>
                            }
                        </div>

                        <div className="result__analysis" title="분석그래프">
                            {
                                !btmdata || !btmdata.length ?'':
                                    <>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                        width={860}
                                        height={218}
                                        data={btmdata}
                                        stackOffset="sign"
                                        margin={{
                                          top: 5,
                                          right: 30,
                                          left: 20,
                                          bottom: 5,
                                        }}
                                      >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <ReferenceLine y={0} stroke="#000" />
                                        <Bar dataKey="Good" fill="#3377ff" stackId="stack" />
                                        <Bar dataKey="Bad" fill="#ffc633" stackId="stack" />
                                      </BarChart>
                                      </ResponsiveContainer>
                                    </>
                            }
                        </div>
                    </>
                }

            </div>
            </section>
        </>
    )
}

export default AnalyseMeeting;