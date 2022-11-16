import React, {useState, useEffect} from 'react';
import $ from "jquery";
import {Link, useNavigate, useLocation} from "react-router-dom";

import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../util/env";
import queryString from "query-string";

import qs from "qs";



const AnalyseMeeting = () => {
    const location = useLocation(); // 홈에서 넘겨준 스테이트 값
    const pathname = location.pathname; // 값 중에 pathname
    const pathSplit = pathname.split('/')[2] // pathname /로 뜯어서 2번째값
    console.log(pathSplit); // 미팅룸 인덱스번호


    const params = {idx_meeting:pathSplit};

    useEffect(() => {

        axios.get(SERVER_URL + `/meet/result/meeting`,{params, withCredentials:true})
            .then(res => {
                console.log('잘 갔어요')
                console.log(res.data.data);
            }).catch((error)=>{
                console.log(error)
        });

    }, [])



    return (
        <>
            <section className="content" id="content">
            <div className="page">
                <div className="result__dash">
                    <h3>‘인간공학개론’ 미팅 분석 결과</h3>
                    <dl>
                        <dt>호스트 이름</dt>
                        <dd>강채연</dd>
                        <dt>날짜</dt>
                        <dd>2022. 08. 11</dd>
                        <dt>시간</dt>
                        <dd>09:00 - 10:00</dd>
                        <dt>소요 시간</dt>
                        <dd>01:28:33</dd>
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
                    <h4 className="result__title">첨부파일(4)</h4>
                    <div className="result__list">
                        <a href="#none"><img src="../assets/image/ic_file_14.png" alt=""/> 1주차_인간공학의 개요_ppt.pdf</a>
                        <a href="#none"><img src="../assets/image/ic_file_14.png" alt=""/> 2주차_인간공학을 위한 인간이해_ppt.pdf</a>
                        <a href="#none"><img src="../assets/image/ic_file_14.png" alt=""/> 3주차_인간의 감각과 그 구조_ppt.pdf</a>
                        <a href="#none"><img src="../assets/image/ic_file_14.png" alt=""/> 4주차_인간의 형태와 운동기능_ppt.pdf</a>
                        <a href="#none"><img src="../assets/image/ic_file_14.png" alt=""/> 1주차_인간공학의 개요_ppt.pdf</a>
                        <a href="#none"><img src="../assets/image/ic_file_14.png" alt=""/> 2주차_인간공학을 위한 인간이해_ppt.pdf</a>
                        <a href="#none"><img src="../assets/image/ic_file_14.png" alt=""/> 3주차_인간의 감각과 그 구조_ppt.pdf</a>
                        <a href="#none"><img src="../assets/image/ic_file_14.png" alt=""/> 4주차_인간의 형태와 운동기능_ppt.pdf</a>
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