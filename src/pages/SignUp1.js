const SignUp1 = () => {
    return (
        <section className="content" id="content">
            <div className="join">
                <h2>회원가입</h2>
                <div className="desc__h2">아래의 정보를 기입해 주세요.</div>

                <div className="step__box">
                    <div className="step is-active">
                        <span>1</span>
                        <em>필수 정보</em>
                    </div>
                    <div className="step ">
                        <span>2</span>
                        <em>선택 정보</em>
                    </div>
                    <div className="step ">
                        <span>3</span>
                        <em>약관 동의</em>
                    </div>
                </div>

                <div className="join__box">
                    <div className="input__group">
                        <label htmlFor="join_name">이름</label>
                        <input type="text" className="text" id="join_name" placeholder="이름을 입력하세요"/>
                    </div>
                    <div className="input__group is-normal">
                        <label htmlFor="join_email">아이디(이메일)</label>
                        <input type="text" className="text" id="join_email" placeholder="이메일을 입력하세요"/>
                        <div className="input__message">
                            입력하신 이메일로 회원가입 인증메일이 발송됩니다.
                        </div>
                    </div>
                    <div className="input__group is-success">
                        <label htmlFor="join_password">비밀번호</label>
                        <input type="password" className="text" id="join_password" value="비밀번호를 입력하세요"/>

                    </div>
                    <div className="input__group is-alert">
                        <label htmlFor="join_password2">비밀번호 확인</label>
                        <input type="password" className="text" id="join_password2" value="비밀번호를 입력하세요"/>
                        <div className="input__message">
                            비밀번호가 동일하지 않습니다.
                        </div>
                    </div>
                </div>

                <div className="btn__box">
                    <div className="btn__group">
                        <a href="join.html" className="btn btn__normal">취소</a>
                        <a href="join_info.html" className="btn btn__able">다음</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp1;