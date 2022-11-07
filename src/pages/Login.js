import {Link, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import {useCookies} from "react-cookie";
import axios from 'axios';

const Login = (props) => {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [inputChk, setinputChk] = useState(false)
    const [cookies, setCookie] = useCookies(['user_id']); // 쿠키 훅

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const handleInputChk = (target) => {
        setinputChk(!inputChk);
    }
    const navigate = useNavigate();
    const onClickLogin = (e) => {

        e.preventDefault();
        console.log('click login')
        console.log('ID : ', inputId)
        console.log('PW : ', inputPw)
        console.log('CHECKBOX : ', inputChk)
        axios.post('http://192.168.0.85:10000/api_post_login', {
                'user_id': inputId,
                'user_pwd': inputPw,
                'autoLogin': inputChk
            }).then(res => {
                console.log(res)
                console.log('res.data.userId :: ', res.data.result_code)
                console.log('res.data.msg :: ', res.data.result_str)
                if(res.data.result_code === 'FAIL01'){
                    // 로그인 정보를 다시 확인해주세요.
                    console.log('======================',res.data.result_str);
                    alert(res.data.result_str)
                } else if(res.data.result_code === 'FAIL02'){
                    // 이메일 인증을 진행해주세요.
                    console.log('======================', res.data.result_str);
                    alert(res.data.result_str)
                } else if(res.data.result_code === 'SUCCESS01') {
                    // 로그인 되었습니다.
                    console.log('---------', document.cookie)
                    console.log('======================',res.data.result_str);
                    alert(res.data.result_str)

                    navigate('/')
                } else if(res.data.result_code === 'SUCCESS02') {
                    // 임시 비밀번호로 로그인 되었습니다.
                    console.log('======================',res.data.result_str);
                    localStorage.clear()
                    localStorage.setItem('user_id', res.data.id)
                    localStorage.setItem('token', res.data.token)
                    alert(res.data.result_str)
                    navigate('/')
                }
            })
            .catch()
    }

    // useEffect(() => {
    //     axios.get('http://192.168.0.85:10000/api_post_login')
    //         .then(res => console.log(res))
    //         .catch()
    // },[])


    return (
        <div className="content no-head" id="content">
            <div className="login">
                <h2>EURA</h2>
                <div className="desc__h2">Emotion Understanding & Recognition Assistant</div>

                <div className="login__box">
                    <div className="input__group">
                        <input type="text" className="text" id="login_id" name="user_id" placeholder="아이디(이메일)" value={inputId} onChange={handleInputId}/>
                    </div>
                    <div className="input__group">
                        <input type="password" className="text" id="login_password" placeholder="비밀번호" name="user_pwd" value={inputPw} onChange={handleInputPw}/>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" className="checkbox" id="auto-1" name="autoLogin" onChange={handleInputChk}/>
                        <label htmlFor="auto-1">자동 로그인</label>
                    </div>
                    <div className="input__group is-alert">
                        <div className="input__message">
                            아이디 또는 비밀번호가 잘못 입력되었어요. 올바른 정보를 입력해 주세요.
                        </div>
                    </div>

                    <div className="btn__group">
                        <button onClick={onClickLogin} className="btn btn__able">로그인</button>
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