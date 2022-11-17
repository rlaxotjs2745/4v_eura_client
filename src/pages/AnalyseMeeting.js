import React, {useState, useEffect} from 'react';
import $ from "jquery";
import {Link, useNavigate, useLocation, json} from "react-router-dom";

import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../util/env";
import queryString from "query-string";
// import {Chart, View, Interval, Legend, Slider} from "bizcharts";
// import { Player } from 'video-react';

const AnalyseMeeting = () => {
    const profile = '../assets/image/image_profile.png'
    const graph = '../assets/image/graph.png';
    const [vidRef, setVidRef] = useState('');
    const [movieSrc, setMovieSrc] = useState('');
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

    useEffect(() => {
        setBtmdata(
            [
                {duration:0,month:'00:00:05',name:'Good',value:76},{duration:0,month:'00:00:05',item:'Bad',value:-48},{duration:5,month:'00:00:05',name:'Good',value:46},{duration:5,month:'00:00:05',item:'Bad',value:-41},{duration:10,month:'00:00:05',name:'Good',value:65},{duration:10,month:'00:00:05',item:'Bad',value:-63},{duration:15,month:'00:00:05',name:'Good',value:79},{duration:15,month:'00:00:05',item:'Bad',value:-20},{duration:20,month:'00:00:05',name:'Good',value:53},{duration:20,month:'00:00:05',item:'Bad',value:-89},{duration:25,month:'00:00:05',name:'Good',value:61},{duration:25,month:'00:00:05',item:'Bad',value:-48},{duration:30,month:'00:00:05',name:'Good',value:81},{duration:30,month:'00:00:05',item:'Bad',value:-64},{duration:35,month:'00:00:05',name:'Good',value:22},{duration:35,month:'00:00:05',item:'Bad',value:-65},{duration:40,month:'00:00:05',name:'Good',value:73},{duration:40,month:'00:00:05',item:'Bad',value:-71},{duration:45,month:'00:00:05',name:'Good',value:50},{duration:45,month:'00:00:05',item:'Bad',value:-90},{duration:50,month:'00:00:05',name:'Good',value:46},{duration:50,month:'00:00:05',item:'Bad',value:-75},{duration:55,month:'00:00:05',name:'Good',value:29},{duration:55,month:'00:00:05',item:'Bad',value:-38},{duration:60,month:'00:00:05',name:'Good',value:4},{duration:60,month:'00:00:05',item:'Bad',value:-87},{duration:65,month:'00:00:05',name:'Good',value:6},{duration:65,month:'00:00:05',item:'Bad',value:-6},{duration:70,month:'00:00:05',name:'Good',value:25},{duration:70,month:'00:00:05',item:'Bad',value:-58},{duration:75,month:'00:00:05',name:'Good',value:45},{duration:75,month:'00:00:05',item:'Bad',value:-3},{duration:80,month:'00:00:05',name:'Good',value:59},{duration:80,month:'00:00:05',item:'Bad',value:-47},{duration:85,month:'00:00:05',name:'Good',value:68},{duration:85,month:'00:00:05',item:'Bad',value:0},{duration:90,month:'00:00:05',name:'Good',value:33},{duration:90,month:'00:00:05',item:'Bad',value:-29},{duration:95,month:'00:00:05',name:'Good',value:9},{duration:95,month:'00:00:05',item:'Bad',value:-76},{duration:100,month:'00:00:05',name:'Good',value:88},{duration:100,month:'00:00:05',item:'Bad',value:-80},{duration:105,month:'00:00:05',name:'Good',value:42},{duration:105,month:'00:00:05',item:'Bad',value:-10},{duration:110,month:'00:00:05',name:'Good',value:79},{duration:110,month:'00:00:05',item:'Bad',value:-37},{duration:115,month:'00:00:05',name:'Good',value:22},{duration:115,month:'00:00:05',item:'Bad',value:-41},{duration:120,month:'00:00:05',name:'Good',value:27},{duration:120,month:'00:00:05',item:'Bad',value:-53},{duration:125,month:'00:00:05',name:'Good',value:16},{duration:125,month:'00:00:05',item:'Bad',value:-56},{duration:130,month:'00:00:05',name:'Good',value:73},{duration:130,month:'00:00:05',item:'Bad',value:-38},{duration:135,month:'00:00:05',name:'Good',value:60},{duration:135,month:'00:00:05',item:'Bad',value:-19},{duration:140,month:'00:00:05',name:'Good',value:29},{duration:140,month:'00:00:05',item:'Bad',value:-49},{duration:145,month:'00:00:05',name:'Good',value:84},{duration:145,month:'00:00:05',item:'Bad',value:-43}
            ]
        );
    },[]);

    useEffect(() => {
        axios.get(SERVER_URL + `/meet/result/meeting?idx_meeting=`+pathSplit, AXIOS_OPTION)
            .then(res => {
                if(res.data.result_code === 'SUCCESS'){
                    setLecture(res.data.data)
                    console.log(lecture)
                    setBtmdata(res.data.data.mtAnalyBtm)
                    let _mfile = res.data.data.mtMovieFiles
                    if(_mfile.length>0){
                        setMovieSrc(_mfile[0].fileUrl)
                        $('.moveFilelist .file__anchor').eq(0).addClass('is-active')
                    }
                    console.log('_mfile.length : '+ _mfile.length)
                }else{
                    alert(res.data.result_str)
                }
            }).catch((error)=>{
                console.log(error)
        });
    }, [])

    useEffect(() => {
        for(let i=0;i<$('.moveFilelist .file__anchor').length;i++){
            $('.moveFilelist .file__anchor').eq(i).removeClass('is-active')
        }
        $('.moveFilelist .file__anchor').eq(0).addClass('is-active')
        // setVidRef($('.moveFilelist .file__anchor').eq(0).attr('title'))
        // setMovieSrc($('.moveFilelist .file__anchor').eq(0).attr('src'))
        // callMovie()
        console.log(lecture)
    }, [lecture])

    useEffect(() => {
        console.log(btmdata)
    }, [btmdata])

    // const callMovie = () => {
        // $('.moveFilelist .file__anchor').each(function(){$(this).removeClass('is-active');})
        // setVidRef($('.moveFilelist .file__anchor').eq(_i-1).attr('title'))
        // setMovieSrc($('.moveFilelist .file__anchor').eq(0).attr('src'))
    // }

    useEffect(() => {
        for(let i=0;i<$('.moveFilelist .file__anchor').length;i++){
            $('.moveFilelist .file__anchor').eq(i).removeClass('is-active')
        }
        $('.moveFilelist .file__anchor').eq(0).addClass('is-active')
        console.log(movieSrc)
    }, [movieSrc])

    const colors = ['#3377ff', '#3377ff', '#ffc633', '#ffc633']
    let chartIns = null

    // // 더미 데이터용
    // useEffect(() => {
    //     setLecture(
    //         {
    //             "mtName":"인간공학개론", // 강의명
    //             "mtMeetiDate":"2022-11-11", // 강의 날짜
    //             "mtMeetiTime":"09:00 ~ 10:00", // 강의 시간
    //             "mtMeetTimer":"00:56:53", // 소요 시간
    //             "is_host":0, // 호스트 여부 - 0:참석자, 1:호스트
    //             "hostname":"나교수",
    //             // 참석자 인원수 - 참석자는 null 값
    //             "mtInviteInfo":{
    //                 "user_invite":29,
    //                 "user_total":30
    //             },
    //             "mtInviteList": [
    //                 {
    //                     "upic":"../assets/image/Ellipse 164.png", // 프로필 사진 URL
    //                     "uname":"참석자1", // 참석자명
    //                     "idx":1, // 참석자 명단용 INDEX
    //                     "value":40, // 집중도 %
    //                     "uemail":"www.naver.com" // 참석자 이메일
    //
    //                 },
    //                 {
    //                     "upic":"../assets/image/Ellipse 164.png", // 프로필 사진 URL
    //                     "uname":"참석자2", // 참석자명
    //                     "idx":2, // 참석자 명단용 INDEX
    //                     "value":61, // 집중도 %
    //                     "uemail":"www.daum.com" // 참석자 이메일
    //                 },
    //             ],
    //             // 첨부파일
    //             "mtAttachedFiles" : [
    //                 {
    //                     "idx":1, // 첨부파일 INDEX
    //                     "fileUrl":"http://api.eura.site/pic?fnm=asda.mp4", // 첨부파일 URL
    //                     "filename" : "강의 자료.pdf" // 임시 파일명
    //                 },
    //                 {
    //                     "idx":2, // 첨부파일 INDEX
    //                     "fileUrl":"http://api.eura.site/pic?fnm=asda2.mp4", // 첨부파일 URL
    //                     "filename" : "강의 자료2.pdf",
    //                 },
    //             ],
    //             // 상단 반원 그래프
    //             "mtAnalyTop": {
    //                 "bad":25,
    //                 "good":65,
    //                 "off":10
    //             },
    //             // 하단 인디케이터 - 참석자는 null 값
    //             "mtAnalyBtm":{
    //                 "duration":5, // 영상 재생 위치
    //                 "timer":"00:00:05", // 데이터 생성 시간
    //                 "value1":5, // 집중도 10 ~ -10
    //                 "value2":5 // 집중도 10 ~ -10
    //             },
    //             // 영상 파일 리스트
    //             "mtMovieFiles" : [
    //                 {
    //                     "duration": 0, // 영상 길이
    //                     "fileNo": null, // 영상 순서
    //                     "fileUrl" : "http://api.eura.site/pic?fnm=/meetmovie/euraclass1/1668066673044",
    //                     "idx":1,
    //                     "recordDt": "2022-11-10 10:22:22" // 영상 녹화 시작 시간
    //                 },
    //                 {
    //                     "duration": 0, // 영상 길이
    //                     "fileNo": null, // 영상 순서
    //                     "fileUrl" : "http://api.eura.site/pic?fnm=/meetmovie/euraclass1/1668066673044",
    //                     "idx":2,
    //                     "recordDt": "2022-11-10 10:22:22" // 영상 녹화 시작 시간
    //                 },
    //             ],
    //             // 참석자만 나오는 곳 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    //             // 오른쪽 하단 바 그래프
    //             "mtData1": {
    //                 "tcnt":73, // 현재 점수
    //                 "bad":13, // BAD
    //                 "acnt":52, // 누적 평균
    //                 "good":62, // GOOD
    //                 "off":25 // OFF
    //             },
    //             // 인디케이터
    //             "mtData0": [
    //                 {
    //                     "duration":5, // 재생위치
    //                     "timer": "00:00:05", // 기록시간
    //                     "value":5, // 집중도 10~-10
    //                 }
    //             ]
    //         },
    //     );
    // },[])
    console.log(lecture.mtInviteInfo)
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
                                        <a href="#" src={file.fileUrl} key={file.idx} className="file__anchor" title={file.filename}><span>{file.fileNo}</span></a>
                                    )
                                })
                        }
                        </dd>
                    </dl>
                    <div className="summary__graph" title="반원그래프 / 분석요약 TEXT">
                        <img src={graph}/>
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
                            {lecture.mtInviteInfo === null ?
                            <>
                                <div className="result__mov" title="영상자리 (860 x 407)">
                                    <video id="MeetMovie" controls width={1180} height={407} playsInline={true} src={movieSrc} />
                                    {/* <Player src={movieSrc} width={860} height={407}></Player> */}
                                </div>
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
                                    <video id="MeetMovie" controls width={860} height={407} playsInline={true} src={movieSrc} />
                                    {/* <Player src={movieSrc} width={860} height={407}></Player> */}
                                </div>
                                <div className="result__graph" title="그래프자리 (860 x 218)">
                                    {
                                        !btmdata || !btmdata.length ?'':
                                            // <Chart height={218} data={btmdata} padding={[40, 40, 50, 40]} autoFit onGetG2Instance={chart => { chartIns = chart; }}
                                            //        scale={{ value: { min: -100, max: 100 }, name: {
                                            //                values: ['Good'],
                                            //
                                            //            }, item: {
                                            //                values: ['Bad'],
                                            //
                                            //            } } }>
                                            //     <Interval
                                            //         adjust={[
                                            //             {
                                            //                 type: 'dodge',
                                            //                 marginRatio: 0,
                                            //                 dodgeBy:"name"
                                            //             },
                                            //         ]}
                                            //         color={['name', [colors[0], colors[1]]]}
                                            //
                                            //         position="month*value"
                                            //     />
                                            //     <Interval
                                            //         adjust={[
                                            //             {
                                            //                 type: 'dodge',
                                            //                 marginRatio: 0,
                                            //             },
                                            //         ]}
                                            //         color={['item', [colors[2], colors[3]]]}
                                            //         position="month*value"
                                            //     />
                                            //     <Legend
                                            //         custom={true}
                                            //         itemSpacing={60}
                                            //         layout="horizontal"
                                            //         position="top-left"
                                            //         flipPage={false}
                                            //         offsetX="50"
                                            //         offsetY="15"
                                            //         onChange={ev => {
                                            //             const item = ev.item;
                                            //             const value = item.value;
                                            //             const checked = !item.unchecked;
                                            //             const geoms = chartIns.geometries;
                                            //
                                            //             for (let i = 0; i < geoms.length; i++) {
                                            //                 const geom = geoms[i];
                                            //
                                            //                 if (geom.getYScale().field === value) {
                                            //                     if (checked) {
                                            //                         geom.show();
                                            //                     } else {
                                            //                         geom.hide();
                                            //                     }
                                            //                 }
                                            //             }
                                            //         }}
                                            //         items={[
                                            //             {
                                            //                 value: 'Good',
                                            //                 name: 'Good',
                                            //                 marker: {
                                            //                     symbol: 'circle',
                                            //                     style: { fill: colors[0] },
                                            //                 },
                                            //             },
                                            //             {
                                            //                 value: 'Bad',
                                            //                 name: 'Bad',
                                            //                 marker: {
                                            //                     symbol: 'circle',
                                            //                     style: { fill: colors[1] },
                                            //                 },
                                            //             },
                                            //         ]}
                                            //     />
                                            // </Chart>
                                            <></>
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
                            <video id="MeetMovie" controls width={860} height={407} playsInline={true} src={movieSrc} />
                            {/* <Player src={movieSrc} width={860} height={407}></Player> */}
                        </div>
                        <div className="result__graph" title="그래프자리 (860 x 218)">
                            {
                                !btmdata || !btmdata.length ?'':
                                    // <Chart height={218} data={btmdata} padding={[40, 40, 50, 40]} autoFit onGetG2Instance={chart => { chartIns = chart; }}
                                    //        scale={{ value: { min: -100, max: 100 }, name: {
                                    //                values: ['Good'],
                                    //
                                    //            }, item: {
                                    //                values: ['Bad'],
                                    //
                                    //            } } }>
                                    //     <Interval
                                    //         adjust={[
                                    //             {
                                    //                 type: 'dodge',
                                    //                 marginRatio: 0,
                                    //                 dodgeBy:"name"
                                    //             },
                                    //         ]}
                                    //         color={['name', [colors[0], colors[1]]]}
                                    //
                                    //         position="month*value"
                                    //     />
                                    //     <Interval
                                    //         adjust={[
                                    //             {
                                    //                 type: 'dodge',
                                    //                 marginRatio: 0,
                                    //             },
                                    //         ]}
                                    //         color={['item', [colors[2], colors[3]]]}
                                    //         position="month*value"
                                    //     />
                                    //     <Legend
                                    //         custom={true}
                                    //         itemSpacing={60}
                                    //         layout="horizontal"
                                    //         position="top-left"
                                    //         flipPage={false}
                                    //         offsetX="50"
                                    //         offsetY="15"
                                    //         onChange={ev => {
                                    //             const item = ev.item;
                                    //             const value = item.value;
                                    //             const checked = !item.unchecked;
                                    //             const geoms = chartIns.geometries;
                                    //
                                    //             for (let i = 0; i < geoms.length; i++) {
                                    //                 const geom = geoms[i];
                                    //
                                    //                 if (geom.getYScale().field === value) {
                                    //                     if (checked) {
                                    //                         geom.show();
                                    //                     } else {
                                    //                         geom.hide();
                                    //                     }
                                    //                 }
                                    //             }
                                    //         }}
                                    //         items={[
                                    //             {
                                    //                 value: 'Good',
                                    //                 name: 'Good',
                                    //                 marker: {
                                    //                     symbol: 'circle',
                                    //                     style: { fill: colors[0] },
                                    //                 },
                                    //             },
                                    //             {
                                    //                 value: 'Bad',
                                    //                 name: 'Bad',
                                    //                 marker: {
                                    //                     symbol: 'circle',
                                    //                     style: { fill: colors[1] },
                                    //                 },
                                    //             },
                                    //         ]}
                                    //     />
                                    // </Chart>
                                    <></>
                            }
                        </div>

                        <div className="result__analysis" title="분석그래프">
                            {
                                !btmdata || !btmdata.length ?'':
                                    // <Chart height={218} data={btmdata} padding={[40, 40, 50, 40]} autoFit onGetG2Instance={chart => { chartIns = chart; }}
                                    //        scale={{ value: { min: -100, max: 100 }, name: {
                                    //                values: ['Good'],
                                    //
                                    //            }, item: {
                                    //                values: ['Bad'],
                                    //
                                    //            } } }>
                                    //     <Interval
                                    //         adjust={[
                                    //             {
                                    //                 type: 'dodge',
                                    //                 marginRatio: 0,
                                    //                 dodgeBy:"name"
                                    //             },
                                    //         ]}
                                    //         color={['name', [colors[0], colors[1]]]}
                                    //
                                    //         position="month*value"
                                    //     />
                                    //     <Interval
                                    //         adjust={[
                                    //             {
                                    //                 type: 'dodge',
                                    //                 marginRatio: 0,
                                    //             },
                                    //         ]}
                                    //         color={['item', [colors[2], colors[3]]]}
                                    //         position="month*value"
                                    //     />
                                    //     <Legend
                                    //         custom={true}
                                    //         itemSpacing={60}
                                    //         layout="horizontal"
                                    //         position="top-left"
                                    //         flipPage={false}
                                    //         offsetX="50"
                                    //         offsetY="15"
                                    //         onChange={ev => {
                                    //             const item = ev.item;
                                    //             const value = item.value;
                                    //             const checked = !item.unchecked;
                                    //             const geoms = chartIns.geometries;
                                    //
                                    //             for (let i = 0; i < geoms.length; i++) {
                                    //                 const geom = geoms[i];
                                    //
                                    //                 if (geom.getYScale().field === value) {
                                    //                     if (checked) {
                                    //                         geom.show();
                                    //                     } else {
                                    //                         geom.hide();
                                    //                     }
                                    //                 }
                                    //             }
                                    //         }}
                                    //         items={[
                                    //             {
                                    //                 value: 'Good',
                                    //                 name: 'Good',
                                    //                 marker: {
                                    //                     symbol: 'circle',
                                    //                     style: { fill: colors[0] },
                                    //                 },
                                    //             },
                                    //             {
                                    //                 value: 'Bad',
                                    //                 name: 'Bad',
                                    //                 marker: {
                                    //                     symbol: 'circle',
                                    //                     style: { fill: colors[1] },
                                    //                 },
                                    //             },
                                    //         ]}
                                    //     />
                                    // </Chart>
                                    <></>
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