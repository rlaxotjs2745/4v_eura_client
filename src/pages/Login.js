import {Link} from "react-router-dom";


const Login = () => {
    return (
        <div className="content no-head" id="content">
            <div className="login">
                <h2>EURA</h2>
                <div className="desc__h2">Emotion Understanding & Recognition Assistant</div>

                <div className="login__box">
                    <div className="input__group">
                        <input type="text" className="text" id="login_id" placeholder="아이디(이메일)"/>
                    </div>
                    <div className="input__group">
                        <input type="password" className="text" id="login_password" placeholder="비밀번호"/>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" className="checkbox" id="auto-1"/>
                        <label htmlFor="auto-1">자동 로그인</label>
                    </div>
                    <div className="input__group is-alert">
                        <div className="input__message">
                            아이디 또는 비밀번호가 잘못 입력되었어요. 올바른 정보를 입력해 주세요.
                        </div>
                    </div>

                    <div className="btn__group">
                        <a href="#none" className="btn btn__able">로그인</a>
                        <Link className="btn btn__normal" to="/signup">회원가입하기</Link>
                    </div>

                    <div className="anchor__box">
                        <Link to="/find_pw" className="login__anchor">비밀번호를 잊으셨나요?</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;