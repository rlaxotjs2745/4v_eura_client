
const FindPwMail = () => {

    return (
        <section className="content" id="content">
            <div className="join temporary">
                <figure><img src={require('../assets/image/img_mail.png')} alt=""/></figure>
                <h3>임시 비밀번호 발송완료</h3>
                <div className="desc__message"><strong>sbpark@uxidstudio.com</strong>로 임시 비밀번호가 발송되었습니다.<br/>
                    이메일에서 확인 후 비밀번호를 재설정해주세요
                </div>

                <div className="btn__box">
                    <div className="btn__group">
                        <a href="join_temporary.html" className="btn btn__able">로그인 화면으로 돌아가기</a>
                    </div>
                </div>

                <div className="anchor__box">
                    메일을 받지 못 하셨나요? <a href="join_temporary.html" className="login__anchor">임시 비밀번호 재발송</a>
                </div>
            </div>
        </section>
    )
}

export default FindPwMail;