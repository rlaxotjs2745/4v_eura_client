import {Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import {setCookie} from "../util/cookie";
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {SERVER_URL} from "../util/env";
import axios from 'axios';
import queryString from 'query-string'

const Login = () => {
    const userParam = queryString.parse(window.location.search);
    useEffect(()=> {
        if(userParam.confirm === 'true') {
            axios.get(SERVER_URL + '/signUpConfirm',{
                params: {
                  email:userParam.email, authKey:userParam.authKey
                },
            }).then(res => {
                if(res.data.result_code === 'SUCCESS') {
                    alert(res.data.result_str + ' 로그인 해주세요.')
                    navigate('/')
                } else if (res.data.result_code === 'FAIL') {
                    alert(res.data.result_str + ' 다시 확인해주세요.')
                }
            })
        }
    },[userParam.confirm])

    const [loginMessage, setloginMessage] = useState('')

    const formSchema = yup.object({
        user_id: yup
            .string()
            .required('아이디를 입력해주세요.')
            // .email('이메일 형식이 아닙니다.'),
            .matches(
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                '이메일 형식으로 입력해주세요.'
            ),
        // 비밀번호
        user_pwd: yup
            .string()
            .required('비밀번호를 입력해주세요.')
            .min(10, '10자 이상의 비밀번호만 사용할 수 있습니다')
            // .max(15, '최대 15자 까지만 가능합니다')
            .matches(
                /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{10,20}$/,
                '영어, 숫자, 특수문자로 조합된 비밀번호만 사용가능합니다.'
            ),
        autoLogin:yup
            .boolean()
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
        axios.defaults.withCredentials = true;

        axios.post(SERVER_URL + '/api_post_login', e).then(res => {
            if(res.data.result_code === 'FAIL01'){
                // 로그인 정보를 다시 확인해주세요.
                setloginMessage(res.data.result_str)
                // alert(res.data.result_str)
            } else if(res.data.result_code === 'FAIL02'){
                // 이메일 인증을 진행해주세요.
                alert(res.data.result_str);
                setloginMessage('')
            } else if(res.data.result_code === 'SUCCESS01') {
                // 로그인 되었습니다.
                let tomorrow = new Date();
                let today = new Date();
                // 자동로그인 체크 했으면 쿠키 30일
                if(e.autoLogin) {
                    tomorrow.setDate(today.getDate()+30);
                }
                    // 자동로그인 체크 안했으면 쿠키 하루
                    else if (!e.autoLogin) {
                    tomorrow.setDate(today.getDate()+1);
                }
                setloginMessage('')
                navigate('/')
            } else if(res.data.result_code === 'SUCCESS02') {
                // 임시 비밀번호로 로그인 되었습니다.
                let tomorrow = new Date();
                let today = new Date();
                // 자동로그인 체크 했으면 쿠키 30일
                if(inputChk) {
                    tomorrow.setDate(today.getDate()+30);
                }
                // 자동로그인 체크 안했으면 쿠키 하루
                else if (!inputChk) {
                    tomorrow.setDate(today.getDate()+1);
                }
                setloginMessage('')
                navigate('/')
            }
        })
            .catch((error)=> {
                console.log(error)
            })
    }

    const onError = (errors) => {
        // console.log(errors);
    };


    axios.defaults.withCredentials = true; // withCredentials 전역 설정
    const [inputId, setInputId] = useState('')
    const [inputChk, setinputChk] = useState(false)

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const navigate = useNavigate();


    return (
        <div className="content no-head" id="content">
            <div className="login">
                <h2><img src="/assets/image/logo.svg" alt=""/></h2>
                {/*<div className="desc__h2">Emotion Understanding & Recognition Assistant</div>*/}
                <form name="loginForm" id="loginForm" onSubmit={handleSubmit(onLogin, onError)}>
                    <div className="login__box">
                    <div className="input__group">
                        <input type="text" onInput={handleInputId} className="text" id="login_id" name="user_id" placeholder="아이디(이메일)" {...register('user_id')}/>
                    </div>
                    <div className="input__group">
                        <input type="password" className="text" id="login_password" placeholder="비밀번호" name="user_pwd" {...register('user_pwd')}/>
                    </div>
                    <div className="checkbox login_checkbox">
                        <input type="checkbox" className="checkbox" id="auto-1" name="autoLogin" {...register('autoLogin')}/>
                        <label htmlFor="auto-1">자동 로그인</label>
                    </div>
                    {errors.user_id &&
                        <div className="input__group is-alert">
                            <div className="input__message">
                                {errors.user_id.message}
                            </div>
                        </div>
                    }
                    {errors.user_pwd &&
                        <div className="input__group is-alert">
                            <div className="input__message">
                                {errors.user_pwd.message}
                            </div>
                        </div>
                    }
                    {loginMessage !== '' ? <div className="input__group is-alert">
                        <div className="input__message">
                            {loginMessage}
                        </div>
                    </div> : null}

                    <div className="btn__group">
                        <button type="submit" disabled={isSubmitting} className="btn btn__able">로그인</button>
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