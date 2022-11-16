import React, {useState, useEffect} from 'react';
import $ from "jquery";
import {Link, useNavigate, useLocation, json} from "react-router-dom";

import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../util/env";
import queryString from "query-string";

const AnalyseMeeting = () => {
    const location = useLocation(); // 홈에서 넘겨준 스테이트 값
    const pathname = location.pathname; // 값 중에 pathname
    const pathSplit = pathname.split('/')[2] // pathname /로 뜯어서 2번째값
    // console.log(pathSplit); // 미팅룸 인덱스번호
    const params = {idx_meeting:pathSplit};

    const [lecture, setLecture] = useState({});
    const [fileLength, setFileLength] = useState({})



    // useEffect(() => {
    //     axios.get(SERVER_URL + `/meet/result/meeting`,{params, withCredentials:true})
    //         .then(res => {
    //             // console.log(res.data.data);
    //             setLecture(res.data)
    //             console.log(lecture);
    //             console.log(lecture.mtMeetDate)
    //         }).catch((error)=>{
    //             console.log(error)
    //     });
    //
    // }, [])

    // 더미 데이터용
    useEffect(() => {
        setLecture(
            {
                "mtName":"인간공학개론", // 강의명
                "mtMeetiDate":"2022-11-11", // 강의 날짜
                "mtMeetiTime":"09:00 ~ 10:00", // 강의 시간
                "mtMeetTimer":"00:56:53", // 소요 시간
                "is_host":0, // 호스트 여부 - 0:참석자, 1:호스트
                "hostname":"나교수",
                // 참석자 인원수 - 참석자는 null 값
                "mtInviteList": [
                    {
                        "upic":"", // 프로필 사진 URL
                        "uname":"1번참석자", // 참석자명
                        "idx":1, // 참석자 명단용 INDEX
                        "value":33, // 집중도 %
                        "usemail":"www.naver.com" // 참석자 이메일

                    },
                    {
                        "upic":"", // 프로필 사진 URL
                        "uname":"2번참석자", // 참석자명
                        "idx":2, // 참석자 명단용 INDEX
                        "value":55, // 집중도 %
                        "usemail":"www.daum.com" // 참석자 이메일
                    },
                ],
                // 첨부파일
                "mtAttachedFiles" : [
                    {
                        "idx":1, // 첨부파일 INDEX
                        "fileUrl":"http://api.eura.site/pic?fnm=asda.mp4", // 첨부파일 URL
                        "fileName" : "강의 자료.pdf" // 임시 파일명
                    },
                    {
                        "idx":2, // 첨부파일 INDEX
                        "fileUrl":"http://api.eura.site/pic?fnm=asda2.mp4", // 첨부파일 URL
                        "fileName" : "강의 자료2.pdf",
                    },
                ],
                // 상단 반원 그래프
                "mtAnalyTop": {
                    "bad":25,
                    "good":65,
                    "off":10
                },
                // 하단 인디케이터 - 참석자는 null 값
                "mtAnalyBtm":{
                    "duration":5, // 영상 재생 위치
                    "timer":"00:00:05", // 데이터 생성 시간
                    "value":5 // 집중도 10 ~ -10
                },
                // 영상 파일 리스트
                "mtMovieFiles" : [
                    {
                        "duration": 0, // 영상 길이
                        "fileNo": null, // 영상 순서
                        "fileUrl" : "http://api.eura.site/pic?fnm=/meetmovie/euraclass1/1668066673044",
                        "idx":1,
                        "recordDt": "2022-11-10 10:22:22" // 영상 녹화 시작 시간
                    },
                    {
                        "duration": 0, // 영상 길이
                        "fileNo": null, // 영상 순서
                        "fileUrl" : "http://api.eura.site/pic?fnm=/meetmovie/euraclass1/1668066673044",
                        "idx":2,
                        "recordDt": "2022-11-10 10:22:22" // 영상 녹화 시작 시간
                    },
                ],
                // 참석자만 나오는 곳 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
                // 오른쪽 하단 바 그래프
                "mtData1": {
                    "tcnt":73, // 현재 점수
                    "bad":13, // BAD
                    "acnt":52, // 누적 평균
                    "good":62, // GOOD
                    "off":25 // OFF
                },
                // 인디케이터
                "mtData0": [
                    {
                        "duration":5, // 재생위치
                        "timer": "00:00:05", // 기록시간
                        "value":5 // 집중도
                    }
                ]
            },
        );
    },[])
    console.log(lecture)
    console.log(fileLength)



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
                        <dd className="td__file">
                            <a href="#none" className="file__anchor is-active"><span>1</span></a>
                            <a href="#none" className="file__anchor"><span>2</span></a>
                            <a href="#none" className="file__anchor"><span>3</span></a>
                            <a href="#none" className="file__anchor"><span>4</span></a>
                            <a href="#none" className="file__anchor"><span>5</span></a>
                        </dd>
                    </dl>
                    <div className="summary__graph">
                        반원그래프 / 분석요약 TEXT
                    </div>
                </div>
                <div className="result__download">
                    <h4 className="result__title">첨부파일()</h4>
                    <div className="result__list">
                        {
                            !lecture.mtAttachedFiles || !lecture.mtAttachedFiles.length ?
                                <a>
                                    <span className="file__name">강의에 업로드 된 파일이 없습니다.</span>
                                </a>
                                : lecture.mtAttachedFiles.map(file => {
                                    return (
                                        // <a href={file.download}>
                                        //     <img src={require('../assets/image/ic_file_14.png')} alt=""/><span className="file__name">{file.files}</span>
                                        // </a>
                                    <a key={file.idx} href={file.fileUrl}><img src={require('../assets/image/ic_file_14.png')} alt=""/> {file.fileName}</a>
                                    )
                                })
                        }
                    </div>
                </div>


                <div className="result__user">
                    <h4 className="result__title">참석자 목록(38/40)</h4>
                    <div className="result__watch">
                        <ul>
                            <li><a href="#none">
                                <figure><img src="../assets/image/Ellipse 164.png" alt=""/></figure>
                                <div className="watch__td"><span>권민수</span><span>rnjsals12@gmail.com</span></div>
                                <div className="watch__percent is-good">62%</div>
                            </a>
                            </li>
                            <li><a href="#none">
                                <figure><img src="../assets/image/Ellipse 164.png" alt=""/></figure>
                                <div className="watch__td"><span>권민수</span><span>rnjsals12@gmail.com</span></div>
                                <div className="watch__percent is-good">62%</div>
                            </a>
                            </li>
                            <li><a href="#none">
                                <figure><img src="../assets/image/Ellipse 164.png" alt=""/></figure>
                                <div className="watch__td"><span>권민수</span><span>rnjsals12@gmail.com</span></div>
                                <div className="watch__percent is-good">62%</div>
                            </a>
                            </li>
                            <li><a href="#none">
                                <figure><img src="../assets/image/Ellipse 164.png" alt=""/></figure>
                                <div className="watch__td"><span>권민수</span><span>rnjsals12@gmail.com</span></div>
                                <div className="watch__percent is-good">62%</div>
                            </a>
                            </li>
                            <li><a href="#none">
                                <figure><img src="../assets/image/Ellipse 164.png" alt=""/></figure>
                                <div className="watch__td"><span>권민수</span><span>rnjsals12@gmail.com</span></div>
                                <div className="watch__percent is-good">62%</div>
                            </a>
                            </li>
                            <li><a href="#none">
                                <figure><img src="../assets/image/Ellipse 164.png" alt=""/></figure>
                                <div className="watch__td"><span>권민수</span><span>rnjsals12@gmail.com</span></div>
                                <div className="watch__percent is-good">62%</div>
                            </a>
                            </li>
                            <li><a href="#none">
                                <figure><img src="../assets/image/Ellipse 164.png" alt=""/></figure>
                                <div className="watch__td"><span>권민수</span><span>rnjsals12@gmail.com</span></div>
                                <div className="watch__percent is-good">62%</div>
                            </a>
                            </li>
                            <li><a href="#none">
                                <figure><img src="../assets/image/Ellipse 164.png" alt=""/></figure>
                                <div className="watch__td"><span>권민수</span><span>rnjsals12@gmail.com</span></div>
                                <div className="watch__percent is-bad">62%</div>
                            </a>
                            </li>
                            <li><a href="#none">
                                <figure><img src="../assets/image/Ellipse 164.png" alt=""/></figure>
                                <div className="watch__td"><span>권민수</span><span>rnjsals12@gmail.com</span></div>
                                <div className="watch__percent is-good">62%</div>
                            </a>
                            </li>
                            <li><a href="#none">
                                <figure><img src="../assets/image/Ellipse 164.png" alt=""/></figure>
                                <div className="watch__td"><span>권민수</span><span>rnjsals12@gmail.com</span></div>
                                <div className="watch__percent is-good">62%</div>
                            </a>
                            </li>
                            <li><a href="#none">
                                <figure><img src="../assets/image/Ellipse 164.png" alt=""/></figure>
                                <div className="watch__td"><span>권민수</span><span>rnjsals12@gmail.com</span></div>
                                <div className="watch__percent is-bad">62%</div>
                            </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="result__mov">
                    영상자리 (860 x 407)
                </div>
                <div className="result__graph">
                    그래프자리 (860 x 218)
                </div>

                <div className="result__analysis">
                    분석그래프
                </div>

            </div>
        </section>
        </>
    )
}

export default AnalyseMeeting;