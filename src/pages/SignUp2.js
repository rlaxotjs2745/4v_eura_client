const SignUp2 = () => {
    return (
        <div className="join">
            <h2>회원가입</h2>
            <div className="desc__h2">아래의 정보를 기입해 주세요.</div>

            <div className="step__box">
                <div className="step is-checked">
                    <span>1</span>
                    <em>필수 정보</em>
                </div>
                <div className="step is-active">
                    <span>2</span>
                    <em>선택 정보</em>
                </div>
                <div className="step ">
                    <span>3</span>
                    <em>약관 동의</em>
                </div>
            </div>

            <div className="join__box">
                <div className="input__group is-normal">
                    <label htmlFor="join_tel">연락처</label>
                    <input type="text" className="text" id="join_tel" placeholder="연락처를 입력하세요"/>
                    <div className="input__message">
                        서비스오류 발생시 연락처로 알림이 수신됩니다.
                    </div>
                </div>
                <div className="input__group option__type">
                    <label htmlFor="join_tel">평소 외향적인 성격인가요?</label>
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
                            <input type="radio" name="option-radio2" id="r2-5"/>
                                <label htmlFor="r2-5">매우 그렇다</label>
                        </div>
                    </div>
                    <div className="input__message">
                        사용자 감성 반응의 맥락 이해에 사용되는 정보입니다.
                    </div>
                </div>
            </div>

            <div className="btn__box">
                <div className="btn__group">
                    <a href="join_case.html" className="btn btn__normal">이전</a>
                    <a href="join_terms.html" className="btn btn__able">다음</a>
                </div>
            </div>
        </div>
    )
}

export default SignUp2;