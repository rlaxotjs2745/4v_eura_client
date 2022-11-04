const FindPW = () => {

    return (
        <section className="content" id="content">
            <div className="join temporary">
                <h2>임시 비밀번호 발급</h2>
                <div className="desc__h2">가입 시 사용한 이메일을 입력하세요.</div>

                <div className="join__box">
                    <div className="input__group">
                        <label htmlFor="login_mail">아이디(이메일)</label>
                        <input type="text" className="text" id="login_mail" placeholder="이메일을 입력하세요"/>
                    </div>
                </div>

                <div className="btn__box">
                    <div className="btn__group">
                        <a href="join_mail.html" className="btn btn__able">임시 비밀번호 발송하기</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FindPW;