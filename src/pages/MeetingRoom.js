import React, {useEffect} from "react";

const MeetingRoom = ({room}) => {



    return (
        <section className="content" id="content">
            <div className="page">
                <div className="meeting__dash">
                    <h3>미팅룸 정보
                        <div className="sorting">
                            <a href="#popup__cancel" className="btn btn-modify js-modal-alert"><img
                                src="../assets/image/ic_close_16.png" alt=""/>미팅 취소하기</a>
                        </div>
                    </h3>
                    <div className="casing">
                        <div className="case-1">
                            <div className="case__title">인간 공학 개론 <a href="#none" className="btn btn__edit"><img
                                src="../assets/image/ic_edit_24.png" alt=""/></a></div>
                            <dl className="type__host">
                                <dt>강의내용</dt>
                                <dd>이번에는 인간공학개론 제 4절 인간의 형태와 운동기능에 대해 알아봅시다. 자세한 사항은 아래 계획서를 참고하시길 바랍니다.</dd>
                            </dl>
                            <dl className="">
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
                        <div className="case-2">
                            <div className="case__message is-late">호스트가 미팅을 시작하기 전 입니다.</div>
                        </div>
                        <div className="case-3">
                            <div className="list__upload">
                                <ul>
                                    <li>
                                        <a href="#none">
                                            <img src="../assets/image/ic_file_14.png" alt=""/><span className="file__name">1주차_인간공학의 개요_ppt.pdf</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#none">
                                            <img src="../assets/image/ic_file_14.png" alt=""/><span className="file__name">2주차_인간공학을 위한 인간이해_ppt.pdf</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#none">
                                            <img src="../assets/image/ic_file_14.png" alt=""/><span className="file__name">3주차_인간의 감각과 그 구조_ppt.pdf</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#none">
                                            <img src="../assets/image/ic_file_14.png" alt=""/><span className="file__name">4주차_인간의 형태와 운동기능_ppt.pdf</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="meeting__user">
                    <h3>미팅 참석자 <div className="user__count"><img src="../assets/image/ic_participant_24.png" alt="" />32</div>
                    </h3>
                    <div className="usering">
                        <div className="swiper userSwiper">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">

                                    <div className="user is-disabled">
                                        <ul>

                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="swiper-slide">

                                    <div className="user is-disabled">
                                        <ul>

                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                            <li>
                                                <figure><img src="../assets/image/image_profile.png" alt="" /></figure>
                                                <span className="team__user">제갈민정<em>postechkim@postech.com</em></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-button-next"></div>
                            <div className="swiper-button-prev"></div>
                        </div>
                        <div className="btn__group">
                            <a href="#none" className="btn btn__able btn__xl">시작하기</a>
                        </div>
                    </div>
                </div>


                <div id="popup__cancel" className="pop__detail">
                    <a href="#none" className="btn__close js-modal-close"><img src="../assets/image/ic_close_24.png" alt="" /></a>
                    <div className="popup__cnt">
                        <div className="pop__message">
                            <img src="../assets/image/ic_warning_80.png" alt="" />
                                <strong>미팅룸 취소 시 비공개로 전환되며 홈 화면에 반영됩니다.<br/>
                                    미팅룸을 취소 하시겠습니까?</strong>
                                <span>미팅을 취소하면 초대한 참석자들에게 메일이 발송됩니다.</span>
                        </div>
                        <div className="btn__group">
                            <a href="#popup__delete" className="btn btn__able btn__s js-modal-alert">예</a>
                            <a href="#none" className="btn btn__normal btn__s js-modal-close">아니오</a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default MeetingRoom;
