import React, {useState} from 'react';

const Home = ({user}) => {

    const [timer, setTimer] = useState("00:00")
    const currentTimer = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        setTimer(`${hours}:${minutes}:${seconds}`)
    }

    const startTimer = () => {
        setInterval(currentTimer, 1000)
    }
    startTimer()

    return (
        <>
            <div className="page">
                <div className="main__board">
                    <div className="board__user">
                        <figure><img src={require('../assets/image/image_profile.png')} alt=""/></figure>
                        <span>안녕하세요</span>
                        <strong>강채연님</strong>
                    </div>
                    <div className="board__time">{timer}</div>
                </div>
                <div className="main__schedule">
                    <h2>다음일정</h2>
                    <ul>
                        {/*<!--<li><strong>다음 일정이 없습니다.</strong></li>-->*/}
                        <li><a href="#none"><strong>연구참여 주간회의</strong> <em>9:00 - 11:00</em></a></li>
                        <li><a href="#none"><strong>공업논리 및 논술</strong> <em>12:00 - 13:00</em></a></li>
                        <li><a href="#none"><strong>전자공학 응용실험</strong> <em>14:00 - 16:00</em></a></li>
                    </ul>
                    <a href="#none" className="btn btn__calendar">
                        <img src={require('../assets/image/ic_arrow_light_circle_24.png')} alt=""/>
                            캘린더 보기
                    </a>
                </div>
                <div className="main__meetingroom">
                    <h3><img src={require('../assets/image/ic_video.png')} alt=""/> 나의 미팅룸 <em>(9)</em>
                        <a href="#none" className="btn btn__make"><img src={require('../assets/image/ic_plus.png')} alt=""/>새 미팅룸
                            만들기</a>
                        <div className="sorting">
                            <select name="" id="">
                                <option value="">최신순</option>
                                <option value="">미팅 시간 순</option>
                                <option value="">비공개 미팅 순</option>
                                <option value="">취소된 미팅 순</option>
                            </select>
                        </div>
                    </h3>
                    <div className="boxing">
                        <div className="box">
                            <div className="box__badge"><span className="type__live">LIVE</span></div>
                            <div className="box__title">연구참여 주간회의</div>
                            <dl className="type__host">
                                <dt>호스트 이름</dt>
                                <dd>박성하</dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 08</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>9:00 - 11:00</dd>
                            </dl>
                        </div>
                        <div className="box">
                            <div className="box__badge"><span className="type__ready">3:00뒤 시작</span></div>
                            <div className="box__title">공업논리 및 논술</div>
                            <dl className="type__host">
                                <dt>호스트 이름</dt>
                                <dd>박길수</dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 08</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>12:00 - 13:00</dd>
                            </dl>
                        </div>
                        <div className="box is-before">
                            <div className="box__badge"><span className="type__private">비공개</span></div>
                            <div className="box__setup"><a href="#popup__notice"
                                                           className="btn btn__setting js-modal-alert">공개하기</a></div>
                            <div className="box__title">인간공학개론</div>
                            <dl className="type__host">
                                <dt>호스트 이름</dt>
                                <dd><img src="../assets/image/ic_host.png" alt=""/>강채연</dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 08</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>9:00 - 11:00</dd>
                            </dl>
                        </div>
                        <div className="box">
                            <div className="box__badge"><span className="type__ready">3:00뒤 시작</span></div>
                            <div className="box__title">전자공학 응용실험</div>
                            <dl className="type__host">
                                <dt>호스트 이름</dt>
                                <dd>박길수</dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 08</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>12:00 - 13:00</dd>
                            </dl>
                        </div>
                        <div className="box">
                            <div className="box__badge"><span className="type__dday">D-3</span></div>
                            <div className="box__title">UX/UI 디자인</div>
                            <dl className="type__host">
                                <dt>호스트 이름</dt>
                                <dd>서가희</dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 12</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>10:00 - 12:00</dd>
                            </dl>
                        </div>
                        <div className="box">
                            <div className="box__badge"><span className="type__dday">D-3</span></div>
                            <div className="box__title">반도체 센서공학</div>
                            <dl className="type__host">
                                <dt>호스트 이름</dt>
                                <dd>이유정</dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 12</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>14:00 - 15:00</dd>
                            </dl>
                        </div>
                        <div className="box">
                            <div className="box__badge"><span className="type__dday">D-4</span></div>
                            <div className="box__title">전기설비공학</div>
                            <dl className="type__host">
                                <dt>호스트 이름</dt>
                                <dd>홍현수</dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 13</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>14:00 - 15:00</dd>
                            </dl>
                        </div>
                        <div className="box is-cancel">
                            <div className="box__badge"><span className="type__cancel">취소된 미팅</span></div>
                            <div className="box__setup"><a href="#none" className="btn btn__setting">재개설 하기</a></div>
                            <div className="box__title">공학기초설계</div>
                            <dl className="type__host">
                                <dt>호스트 이름</dt>
                                <dd><img src="../assets/image/ic_host.png" alt=""/>강채연</dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 13</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>14:00 - 15:00</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="btn__group">
                        <a href="#none" className="btn btn__more">더 보기</a>
                    </div>
                </div>
                <div className="main__history">
                    <h3><img src="" alt=""/><img src={require('../assets/image/ic_last.png')} alt=""/> 지난 미팅 <em>(2)</em>
                        <div className="sorting">
                            <select name="" id="">
                                <option value="">최신순</option>
                                <option value="">미팅 시간 순</option>
                                <option value="">비공개 미팅 순</option>
                                <option value="">취소된 미팅 순</option>
                            </select>
                        </div>
                    </h3>
                    <div className="boxing">
                        <div className="box">
                            <div className="box__badge"><span className="type__ready">3:00뒤 시작</span></div>
                            <div className="box__setup"><a href="#none" className="btn btn__setting">공개하기</a></div>
                            <div className="box__title">공업교육론</div>
                            <dl className="type__host">
                                <dt>호스트 이름</dt>
                                <dd><img src={require('../assets/image/ic_host.png')} alt=""/>강채연</dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 03</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>9:00 - 11:00</dd>
                            </dl>
                        </div>
                        <div className="box">
                            <div className="box__badge"><span className="type__ready">3:00뒤 시작</span></div>
                            <div className="box__title">전력전자공학</div>
                            <dl className="">
                                <dt>호스트 이름</dt>
                                <dd>김춘배</dd>
                            </dl>
                            <dl className="">
                                <dt>참여도 82%</dt>
                                <dd>
                                    <div className="graph"><span className="graph__gage"></span>
                                    </div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 04</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>9:00 - 11:00</dd>
                            </dl>
                        </div>
                        <div className="box">
                            <div className="box__badge"><span className="type__private">미참석</span></div>
                            <div className="box__setup"><a href="#none" className="btn btn__setting">공개하기</a></div>
                            <div className="box__title">인간공학개론</div>
                            <dl className="">
                                <dt>호스트 이름</dt>
                                <dd>홍현수</dd>
                            </dl>
                            <dl className="">
                                <dt>참여도 0%</dt>
                                <dd>
                                    <div className="graph"><span className="graph__gage" ></span></div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>날짜</dt>
                                <dd>2022. 08. 08</dd>
                            </dl>
                            <dl>
                                <dt>시간</dt>
                                <dd>9:00 - 11:00</dd>
                            </dl>
                        </div>
                    </div>
                </div>

                <div id="popup__notice" className="pop__detail">
                    <a href="#none" className="btn__close js-modal-close"><img src="../assets/image/ic_close_24.png"
                                                                               alt=""/></a>
                    <div className="popup__cnt">
                        <div className="pop__message">
                            <img src="../assets/image/ic_warning_80.png" alt=""/>
                                <strong>미팅룸을 공개하면 다시 비공개로 설정할 수 없습니다. <br/>
                                    미팅룸을 공개 하시겠습니까?</strong>
                                <span>미팅을 공개하면 초대한 참석자들에게 메일이 발송됩니다.</span>
                        </div>
                        <div className="btn__group">
                            <a href="#none" className="btn btn__able btn__s">예</a>
                            <a href="#none" className="btn btn__normal btn__s js-modal-close">아니오</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;