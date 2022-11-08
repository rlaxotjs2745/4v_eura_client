import {Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import {setCookie, getCookie} from "../util/cookie";
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'axios';
import jsonp from 'jsonp'
import $ from "jquery";


const Login = (props) => {
    const formSchema = yup.object({
        user_name:yup
            .string()
            .required('이름을 입력해주세요')
            .matches(
                /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
                '한글, 영어, 숫자만 사용가능합니다.'
            ),
        user_id: yup
            .string()
            .required('이메일을 입력해주세요')
            .email('이메일 형식이 아닙니다.'),
        // 비밀번호
        password: yup
            .string()
            .required('영문, 숫자, 특수문자 포함 10자리를 입력해주세요.')
            .min(10, '10자 이상의 비밀번호만 사용할 수 있습니다')
            // .max(15, '최대 15자 까지만 가능합니다')
            .matches(
                /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{10,20}$/,
                '영어, 숫자, 특수문자로 조합된 비밀번호만 사용가능합니다.'
            ),
    });
    const {
        register,
        handleSubmit,
        handleBlur,
        setError,
        watch,
        formState: { errors, isSubmitted, isSubmitting, isDirty },
        // isSubmitting 은 양식 제출 중 disabled 처리 하게 함.
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: { // 초기값 설정
            // id: '',
            // age: '',
        }
    });

    const onLogin = (e) => {
        e.preventDefault();
        console.log('click login')
        console.log('ID : ', inputId)
        console.log('PW : ', inputPw)
        console.log('CHECKBOX : ', inputChk)
        axios.defaults.withCredentials = true;

        axios.post('http://192.168.0.85:10000/api_post_login', {
            'user_id': inputId,
            'user_pwd': inputPw,
            'autoLogin': inputChk
        }).then(res => {
            // const {accessToken} = res.data;
            // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            console.log('@@@@@@@@@@@@@@@@ ' +res)
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
                let tomorrow = new Date();
                let today = new Date();
                // 자동로그인 체크 했으면 쿠키 30일
                if(inputChk) {
                    tomorrow.setDate(today.getDate()+30);
                    setCookie('user_id', inputId, {path:'/', expires:tomorrow});
                }
                // 자동로그인 체크 안했으면 쿠키 하루
                else if (!inputChk) {
                    tomorrow.setDate(today.getDate()+1);
                    setCookie('user_id', inputId, {path:'/', expires:tomorrow});
                }
                console.log('---------cookie', document.cookie)
                console.log('---------cookie', res.data)
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

    const onError = (errors) => {
        console.log(errors);
        console.log('에러메세지 입니다. 제출 되지 않습니다.');
    };


    // document.cookie = "safeCookie1=foo; SameSite=Lax";
    // document.cookie = "safeCookie2=foo";
    // document.cookie = "crossCookie=bar; SameSite=None; Secure";

    axios.defaults.withCredentials = true; // withCredentials 전역 설정
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
    const [inputChk, setinputChk] = useState(false)
    // const [cookies, setCookie] = useCookies(['user_id']); // 쿠키 훅

    function onChange(newName) {
        setCookie('name', newName, { path: '/' });
    }
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
        axios.defaults.withCredentials = true;

        axios.post('http://192.168.0.85:10000/api_post_login', {
                'user_id': inputId,
                'user_pwd': inputPw,
                'autoLogin': inputChk
            }).then(res => {
                // const {accessToken} = res.data;
                // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                console.log('@@@@@@@@@@@@@@@@ ' +res)
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
                    let tomorrow = new Date();
                    let today = new Date();
                    // 자동로그인 체크 했으면 쿠키 30일
                    if(inputChk) {
                        tomorrow.setDate(today.getDate()+30);
                        setCookie('user_id', inputId, {path:'/', expires:tomorrow});
                    }
                    // 자동로그인 체크 안했으면 쿠키 하루
                    else if (!inputChk) {
                        tomorrow.setDate(today.getDate()+1);
                        setCookie('user_id', inputId, {path:'/', expires:tomorrow});
                    }
                    console.log('---------cookie', document.cookie)
                    console.log('---------cookie', res.data)
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

    function getJsonpUseJQuery1() {
        $.ajax({
            url: "http://192.168.0.85:10000/api_post_login",
            dataType: "jsonp",
            jsonpCallback: "sendMeJsonp"
        }, {
            'user_id': inputId,
            'user_pwd': inputPw,
            'autoLogin': inputChk
        }).then(res => {
            console.log("JQuery 1", res)
        });
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
                <form name="loginForm" id="loginForm" onSubmit={handleSubmit(onLogin, onError)}>
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
                </form>
            </div>
        </div>
    )
}

export default Login;