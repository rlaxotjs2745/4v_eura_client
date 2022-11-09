import React, {useState} from 'react';

const Profile = () => {

    const [fileImage, setFileImage] = useState('../assets/image/image_upload-pic.png');
    const saveFileImage = (event) =>{
        // const saveFileImage = (event: React.ChangeEvent<HTMLInputElement>) =>{
        // @ts-ignore
        setFileImage(URL.createObjectURL(event.target.files[0]));
    };
    const deleteFileImage = () =>{
        URL.revokeObjectURL(fileImage);
        setFileImage("");
    };


    return (
        <section className="content" id="content">
            <div className="my">
                <h2>내 프로필</h2>
                <div className="my__box">
                    <div className="input__group">
                        <label htmlFor="join_name">프로필사진</label>
                        <div className="input__group upload__type">
                            {/*<input type="file" className="upload__btn" onChange="readURL(this);"/>*/}
                            <input type="file" className="upload__btn"/>
                                <div className="upload__image"><img id="preview" src="../assets/image/image_profile.png"
                                                                    alt=""/></div>
                        </div>
                    </div>
                    <div className="input__group ">
                        <label htmlFor="join_email">아이디(이메일)</label>
                        <input type="text" className="text" id="join_email" value="rkdcodus12@postech.com" readOnly disabled/>
                    </div>
                    <div className="input__group">
                        <label htmlFor="join_name">이름</label>
                        <input type="text" className="text" id="join_name" value="강채연" readOnly/>
                        <div className="modify__box">
                            <a href="#none" className="btn btn__able btn__s">변경하기</a>
                            <a href="#none" className="btn btn__normal btn__s">취소</a>
                        </div>

                    </div>
                    <div className="input__group">
                        <label htmlFor="join_password">비밀번호</label>
                        <input type="password" className="text" id="join_password" value="비밀번호를 입력하세요" readOnly/>
                        <div className="modify__box">
                            <a href="profile_case.html" className="btn btn-modify">편집하기</a>
                        </div>
                    </div>
                    <div className="input__group">
                        <label htmlFor="join_tel">연락처</label>
                        <input type="text" className="text" id="join_tel" value="010-0000-0000" readOnly/>
                        <div className="modify__box">
                            <a href="#none" className="btn btn-modify">편집하기</a>
                        </div>
                    </div>
                </div>


                <h2>성향 선택 문항</h2>

                <div className="my__box">
                    <div className="input__group option__type">
                        <label htmlFor="join_tel">평소 외향적인 성격인가요?</label>
                        <div className="modify__box">
                            <a href="#none" className="btn btn-modify">편집하기</a>
                        </div>
                        <div className="radio__inline">
                            <div className="radio">
                                <input type="radio" name="option-radio" id="r-1"/>
                                    <label htmlFor="r-1">매우 그렇지 않다</label>
                            </div>
                            <div className="radio">
                                <input type="radio" name="option-radio" id="r-2"/>
                                    <label htmlFor="r-2">그렇지 않다</label>
                            </div>
                            <div className="radio">
                                <input type="radio" name="option-radio" id="r-3"/>
                                    <label htmlFor="r-3">보통이다</label>
                            </div>
                            <div className="radio">
                                <input type="radio" name="option-radio" id="r-4"/>
                                    <label htmlFor="r-4">그렇다</label>
                            </div>
                            <div className="radio">
                                <input type="radio" name="option-radio" id="r-5"/>
                                    <label htmlFor="r-5">매우 그렇다</label>
                            </div>
                        </div>
                    </div>
                    <div className="input__group option__type is-normal">
                        <label htmlFor="join_tel">평소 친화력이 있는 성격인가요?</label>
                        <div className="radio__inline">
                            <div className="radio">
                                <input type="radio" name="option-radio2" id="r2-1"/>
                                    <label htmlFor="r2-1">매우 그렇지 않다</label>
                            </div>
                            <div className="radio">
                                <input type="radio" name="option-radio2" id="r2-2"/>
                                    <label htmlFor="r2-2">그렇지 않다</label>
                            </div>
                            <div className="radio">
                                <input type="radio" name="option-radio2" id="r2-3"/>
                                    <label htmlFor="r2-3">보통이다</label>
                            </div>
                            <div className="radio">
                                <input type="radio" name="option-radio2" id="r2-4"/>
                                    <label htmlFor="r2-4">그렇다</label>
                            </div>
                            <div className="radio">
                                <input type="radio" name="option-radio2" id="r2-5" />
                                    <label htmlFor="r2-5">매우 그렇다</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile;