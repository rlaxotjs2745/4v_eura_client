import React, {useEffect} from "react";

const NewRoom = () => {

    return (
        <div className="room">
            <h2>새 미팅룸 만들기</h2>

            <div className="room__box">
                <div className="input__group ">
                    <label htmlFor="make_new">미팅 이름</label>
                    <input type="text" className="text" id="make_new" placeholder="미팅 이름을 입력해주세요."/>
                    <hr />
                        <label htmlFor="make_date"><img src="../assets/image/ic_calendar_24.png" alt="" /></label>
                        <input id="make_date" type="date" className="text under-scope width-flexble" style="width:140px;" />
                            <label htmlFor="make_time" className="input__time"><img src="../assets/image/ic_time_24.png" alt="" /></label>
                            <input id="make_time" type="time" pattern="[0-9]{2}:[0-9]{2}" className="text under-scope width-flexble" style="width:130px;" />
                                <span className="bar">-</span>
                                <input id="make_time" type="time" className="text under-scope width-flexble" style="width:130px;" />

                                <hr />
                                    <div className="checkbox type__square">
                                        <input type="checkbox" className="checkbox" id="cb-2"/>
                                        <label htmlFor="cb-2">되풀이 미팅</label>
                                    </div>
                </div>

                <div className="input__group">
                    <label htmlFor="make_room">미팅 정보</label>
                    <textarea name="" id="make_room" cols="10" rows="3" placeholder="미팅정보를 입력해주세요."></textarea>
                </div>

                <div className="input__group">
                    <label htmlFor="">참석자 명단</label>
                    <div className="list__count">총 00명</div>
                    <div className="list__guest">
                        {/*<ul>*/}
                        {/*    <li><a href="#none">*/}
                        {/*        <figure><img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" alt=""></figure>*/}
                        {/*        <span class="team__user">권민수*/}
                        {/*         <em>rnjsals12@gmail.com</em></span>*/}
                        {/*        <a href="#none" class="btn btn__delete"><img src="../assets/image/ic_cancle-circle_18.png" alt="삭제"></a>*/}
                        {/*    </a></li>*/}
                        {/*    <li><a href="#none">*/}
                        {/*        <figure><img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" alt=""></figure>*/}
                        {/*        <span class="team__user">권민수*/}
                        {/*         <em>rnjsals12@gmail.com</em></span>*/}
                        {/*        <a href="#none" class="btn btn__delete"><img src="../assets/image/ic_cancle-circle_18.png" alt="삭제"></a>*/}
                        {/*    </a></li>*/}
                        {/*    <li><a href="#none">*/}
                        {/*        <figure><img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" alt=""></figure>*/}
                        {/*        <span class="team__user">권민수*/}
                        {/*         <em>rnjsals12@gmail.com</em></span>*/}
                        {/*        <a href="#none" class="btn btn__delete"><img src="../assets/image/ic_cancle-circle_18.png" alt="삭제"></a>*/}
                        {/*    </a></li>*/}
                        {/*</ul>*/}
                    </div>
                </div>

                <div className="input__group">
                    <label htmlFor="make_team">참석자 추가</label>
                    <div className="list__count"><a href="#none" className="btn btn__download">엑셀 양식 다운로드</a></div>
                    <div className="input__inline">
                        <input id="make_team" type="text" className="text" placeholder="이메일 또는 이름을 입력해 참석자를 추가하세요." />
                            <a href="#popup__team" className="btn btn__team js-modal-alert">
                                <img src="../assets/image/ic_participant_14.png" alt="" />단체추가하기
                            </a>
                    </div>
                    <div className="flow__team">
                        <ul>
                            <li>
                                <a href="#none">
                                    <figure>
                                        <img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" alt=""/>
                                    </figure>
                                    <span className="team__user">
                                        권민수
                                        <em>rnjsals12@gmail.com</em>
                                    </span>
                                    <div className="checkbox type__square">
                                        <input type="checkbox" className="checkbox" id="team-1" name="user"/>
                                        <label htmlFor="team-1"></label>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#none">
                                    <figure>
                                        <img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" alt=""/>
                                    </figure>
                                    <span className="team__user">
                                        권민수
                                        <em>rnjsals12@gmail.com</em>
                                    </span>
                                    <div className="checkbox type__square">
                                        <input type="checkbox" className="checkbox" id="team-1" name="user"/>
                                        <label htmlFor="team-1"></label>
                                    </div>
                                </a>
                            </li>
                            <li>
                            <a href="#none">
                                <figure>
                                    <img src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" alt=""/>
                                </figure>
                                <span className="team__user">
                                        권민수
                                        <em>rnjsals12@gmail.com</em>
                                    </span>
                                <div className="checkbox type__square">
                                    <input type="checkbox" className="checkbox" id="team-1" name="user"/>
                                    <label htmlFor="team-1"></label>
                                </div>
                            </a>
                        </li>
                        </ul>
                    </div>

                </div>

                <div className="input__group">
                    <label htmlFor="">첨부파일 <a href="#none" className="btn btn__download"><img
                        src="../assets/image/ic_attachment_14.png" alt="" />파일 업로드</a></label>
                    <div className="list__upload">
 {/*                        <ul>*/}
 {/*                            <li>*/}
 {/*                                <a href="#none">*/}
 {/*                                <img src="../assets/image/ic_file_14.png" alt=""><span class="file__name">1주차_인간공학의 개요_ppt.pdf</span><em class="file__size">230KB</em>*/}
 {/*                                </a>*/}
 {/*                                <a href="#none" class="btn btn__delete"><img src="../assets/image/ic_cancle-circle_18.png" alt="삭제"></a>*/}
 {/*                            </li>*/}
 {/*                            <li>*/}
 {/*                                <a href="#none">*/}
 {/*                                    <img src="../assets/image/ic_file_14.png" alt=""><span class="file__name">2주차_인간공학을 위한 인간이해_ppt.pdf*/}
 {/*</span><em class="file__size">680KB</em>*/}
 {/*                                </a>*/}
 {/*                                <a href="#none" class="btn btn__delete"><img src="../assets/image/ic_cancle-circle_18.png" alt="삭제"></a>*/}
 {/*                            </li>*/}
 {/*                            <li>*/}
 {/*                                <a href="#none">*/}
 {/*                                    <img src="../assets/image/ic_file_14.png" alt=""><span class="file__name">3주차_인간의 감각과 그 구조_ppt.pdf</span><em class="file__size">558KB</em>*/}
 {/*                                </a>*/}
 {/*                                <a href="#none" class="btn btn__delete"><img src="../assets/image/ic_cancle-circle_18.png" alt="삭제"></a>*/}
 {/*                            </li>*/}
 {/*                            <li>*/}
 {/*                                <a href="#none">*/}
 {/*                                    <img src="../assets/image/ic_file_14.png" alt=""><span class="file__name">4주차_인간의 형태와 운동기능_ppt.pdf</span><em class="file__size">680KB</em>*/}
 {/*                                </a>*/}
 {/*                                <a href="#none" class="btn btn__delete"><img src="../assets/image/ic_cancle-circle_18.png" alt="삭제"></a>*/}
 {/*                            </li>*/}
 {/*                        </ul>*/}
                    </div>
                </div>
            </div>

            <div className="btn__box">
                <div className="btn__group">
                    <a href="#none" className="btn btn__normal">최소</a>
                    <a href="room_setting.html" className="btn btn__able">저장</a>
                </div>
            </div>

            <div id="popup__team" className="pop__detail ">
                {/*<a href="#none" class="btn__close js-modal-close"><img src="../assets/image/ic_close_24.png" alt=""></a>*/}
                <div className="popup__cnt">
                    <div className="pop__message">
                        <h3>참석자 단체 등록하기</h3>
                        <div className="pop__body">
                            <div className="upload__box ">
                                <input className="upload-name" value="이메일이 입력된 엑셀파일을 첨부해주세요." disabled="disabled" />
                                    <label htmlFor="ex_filename"><img src="../assets/image/ic_attachment_24.png" alt=""/></label>
                                    <input type="file" id="ex_filename" className="upload-hidden"/>
                            </div>
                            {/*<div class="upload__count">총 52명</div>*/}
                            <div className="upload__list">
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>wlsdksms11@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                                {/*<span>rlsgus@postech.com</span>*/}
                            </div>
                        </div>
                    </div>
                    <div className="btn__group align__right">
                        <a href="#none" className="btn btn__normal btn__s">취소</a>
                        <a href="#none" className="btn btn__able btn__s js-modal-close">완료</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NewRoom;