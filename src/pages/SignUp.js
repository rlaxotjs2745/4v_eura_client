import * as React from 'react';
import { useForm } from 'react-hook-form';
import $ from "jquery";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";
import {SERVER_URL, AXIOS_OPTION} from "../util/env";

const SignUp = () => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('')
    // const [userEmail, setUserEmail] = useState('')
    const [userPwd, setUserPwd] = useState('')
    const [userPwdChk, setUserPwdChk] = useState('')
    const [userDisabled, setUserDisabled] = useState(false)
    const [termDisabled, setTermDisabled] = useState(true)
    const [userIdCheck, setUserIdCheck] = useState(null);
    const [signUp, setSignUp] = useState(null);

    const [termBoxShow, setTermBoxShow] = useState(true)

    const handleUserName = (e) => {
        setUserName(e.target.value);
        if (userId.length && userName.length && userPwd.length && userPwdChk.length  && !($('.input__group').hasClass('is-alert'))) {
            setUserDisabled(true)
        } else {
            setUserDisabled(false)
        }
    }

    // const handleUserEmail = (e) => {
    //     setUserEmail(e.target.value);
    // }

    const handleUserPwd = (e) => {
        setUserPwd(e.target.value);
        if (userId.length && userName.length && userPwd.length && userPwdChk.length && !($('.input__group').hasClass('is-alert'))) {
            setUserDisabled(true)
        } else {
            setUserDisabled(false)
        }
    }

    const handleUserPwdChk = (e) => {
        setUserPwdChk(e.target.value);
        if (userId.length && userName.length && userPwd.length && userPwdChk.length && !($('.input__group').hasClass('is-alert'))) {
            setUserDisabled(true)
        } else {
            setUserDisabled(false)
        }
    }

    const handleUserId = (e) => {
        setUserId(e.target.value);
        setSignUp(null)
        if (userId.length && userName.length && userPwd.length && userPwdChk.length && !($('.input__group').hasClass('is-alert'))) {
            setUserDisabled(true)
        } else {
            setUserDisabled(false)
        }
    }

    const handleTerms = (e) => {
        if($('#cb-1').val() === '1') {
            setTermBoxShow(false)
        } else {
            setTermBoxShow(true)
        }

        if ($('#cb-1').val() === '1' && $('#cb-2').val() === '1') {
            setTermDisabled(false)
        } else {
            setTermDisabled(true)
        }
    }

    document.addEventListener('click', e => {
        for (let checkbox of document.querySelectorAll('input[type=checkbox]')) {
            checkbox.value = checkbox.checked ? 1 : 0;
            checkbox.addEventListener('change', e => {
                e.target.value = e.target.checked ? 1 : 0;
            });
        }
    });

    const formSchema = yup.object({
        // 이름
        user_name:yup
            .string()
            .required('이름을 입력해주세요')
            .matches(
                /^[가-힣]{2,7}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}|[a-zA-Z]{2,30}$/,
                '한글, 영어, 숫자만 사용가능합니다.'
            ),
        // 아이디(이메일 형식)
        user_id: yup
            .string()
            .required('이메일을 입력해주세요')
            .matches(
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,

                '이메일 형식으로 입력해주세요.'
            ),
        // 비밀번호
        password: yup
            .string()
            .required('영문, 숫자, 특수문자 포함 10자리를 입력해주세요.')
            .min(10, '10자 이상의 비밀번호만 사용할 수 있습니다')
            .matches(
                /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{10,20}$/,
                '영어, 숫자, 특수문자로 조합된 비밀번호만 사용가능합니다.'
            ),
        // 비밀번호 확인
        user_pwd: yup
            .string()
            .required('비밀번호를 확인해주세요.')
            .oneOf([yup.ref('password')], '비밀번호가 동일하지 않습니다.'),
        user_phone: yup
            .string()
            .matches(
                /^\d{3}\d{3,4}\d{4}$/,
                {excludeEmptyString:true, message:'형식에 맞게 입력해주세요. 예) 01012345678'}
            )
            .nullable(),
        privacy_terms:yup
            .number()
            .required('개인정보 처리방침에 동의하셔야 합니다.'),
        service_use_terms:yup
            .number()
            .required('서비스 이용약관에 동의하셔야 합니다.'),
        file:yup
            .mixed(),

        eq_type01:yup
            .number()
            .typeError()
            .nullable(),
        eq_type02:yup
            .number()
            .nullable(),

    });
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        // isSubmitting 은 양식 제출 중 disabled 처리 하게 함.
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: { // 초기값 설정
            // id: '',
            // age: '',
        }
    });

    const [imagePreview, setImagePreview] = useState('../assets/image/image_upload-pic.png');
    const image = watch("file");
    useEffect(() => {
        if (image && image.length > 0) {
            const file = image[0];
            setImagePreview(URL.createObjectURL(file));
            $('#image_upload_btn').hide();
            $('#img_on_submit').addClass('on')
        }
    }, [image]);

    const navigate = useNavigate();

    const onSubmit = (data) => {
        let formData = new FormData();
        formData.append('file', data.file[0]);
        formData.append('user_name', data.user_name)
        formData.append('user_id', data.user_id)
        formData.append('user_pwd', data.user_pwd)
        if (data.user_phone !== null) {
            formData.append('user_phone', data.user_phone)
        }
        if (data.eq_type01 !== null) {
            formData.append('eq_type01', data.eq_type01)
        }
        if (data.eq_type02 !== null) {
            formData.append('eq_type02', data.eq_type02)
        }
        formData.append('privacy_terms', data.privacy_terms)
        formData.append('service_use_terms', data.service_use_terms)

        axios.post(SERVER_URL + '/join_mail'
            , formData
            , AXIOS_OPTION
        ).then(res => {
            if(res.data.result_code === 'FAIL'){
                alert(res.data.result_str)
                navigate('/')
            } else if(res.data.result_code === 'SUCCESS'){
                alert(res.data.result_str)
                $('#signUpForm').addClass('off');
                $('#sign_up_complete').addClass('on');
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const onError = (errors) => {
        // console.log(errors);
    };

    const Sign1Open = (e) => {
        e.preventDefault()
        $('#step1').addClass('active')
        $('#step2').removeClass('active')
    }

    const Sign2Open = (e) => {

        let user_name = $('#join_name')
        let user_id = $('#join_email')
        let join_password = $('#join_password')
        let join_password2 = $('#join_password2')

        if(user_name.val() === '') {
            alert('이름을 입력해주세요.')
        } else if (user_id.val() === '' || user_id.parent().hasClass('is-alert')) {
            alert('아이디(이메일) 입력 사항을 확인해주세요.')
        } else if (join_password.val() === '' || join_password.parent().hasClass('is-alert')) {
            alert('비밀번호 입력 사항을 확인해주세요.')
        } else if (join_password2.val() === '' || join_password2.parent().hasClass('is-alert')) {
            alert('비밀번호 확인 입력 사항을 확인해주세요.')
        } else if (signUp !== '사용 가능한 아이디 입니다.') {
            alert('아이디 중복체크를 진행해주세요.')
        }

        else {
            $('#step1').removeClass('active')
            $('#step2').addClass('active')
        }

    }

    const Sign3Open = (e) => {
        e.preventDefault();
        // let join_tel = $('#join_tel')
        // if (join_tel.val() == '' || join_tel.parent().hasClass('is-alert')) {
        //     e.preventDefault();
        //     alert('연락처 입력 사항을 확인해주세요.')
        // }
        $('#step2').removeClass('active')
        $('#step3').addClass('active')

    }

    const Sign4Open = (e) => {
        e.preventDefault();
        let cb1 = $('#cb-1')
        let cb2 = $('#cb-2')
        if (cb1.val() === '0') {
            alert('개인정보 처리방침에 동의하셔야 합니다.')
        } else if (cb2.val() === '0'){
            alert('서비스 이용약관에 동의하셔야 합니다.')
        } else {
            $('#step3').removeClass('active')
            $('#step4').addClass('active')
        }

    }

    $('#cb-1').on('click', function(){
        this.value = this.checked ? 1 : 0;
        // alert(this.value);
    });

    $('#cb-2').on('click', function(){
        this.value = this.checked ? 1 : 0;
        // alert(this.value);
    });

    const Sign_prev3 = (e) => {
        e.preventDefault()
        $('#step3').removeClass('active')
        $('#step2').addClass('active')
    }

    // const Sign_prev4 = () => {
    //     $('#step4').removeClass('active')
    //     $('#step3').addClass('active')
    // }

    const reMailSubmit = (data) => {
        let formData = new FormData();
        formData.append('user_id', data.user_id)
        axios.post(SERVER_URL + '/remail_join'
            , data
        ).then(res => {
            if(res.data.result_code === 'FAIL'){
                alert(res.data.result_str)
            } else if(res.data.result_code === 'SUCCESS'){
                alert(res.data.result_str)
            }
        }).catch(err => {
            console.log(err);
        });

    }

    const inRegEmail = (data) => {
        console.log(userId)
        axios.post(SERVER_URL + '/join_default'
            , {'user_id':userId}
        ).then(res => {
            if(res.data.result_code === 'FAIL'){
                setUserIdCheck(res.data.result_str)
                setSignUp(null)
                setUserDisabled(false)
            } else if(res.data.result_code === 'SUCCESS'){
                setUserDisabled(true)
                setUserIdCheck(null)
                alert(res.data.result_str)
                setSignUp(res.data.result_str) // 사용 가능한 아이디 입니다.
            }
        }).catch(err => {
            console.log(err);
        });
    }

    console.log(userDisabled)

    return (
        <section className="content" id="content">
            <form name="signupForm" className="w100" id="signUpForm" onSubmit={handleSubmit(onSubmit, onError)}>
                {/* step1 */}
                <div id="step1" className="join active">
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
                        <div className={'input__group ' + (errors.user_name ? "is-alert " : "") + (watch().user_name ? "is-success " : "")}>
                            <label htmlFor="join_name">이름</label>
                            <input onKeyUp={handleUserName} required name="user_name" type="text" className="text" id="join_name" placeholder="이름을 입력하세요" {...register('user_name')}/>
                            {errors.user_name && <div className="error_tip">{errors.user_name.message}</div>}
                        </div>
                        <div className={'input__group ' + (errors.user_id ? "is-alert " : "") + (watch().user_id ? "is-success " : "") + (userIdCheck === '중복되는 아이디 입니다.' ? "is-alert " : "" )}>
                            <label htmlFor="join_email">아이디(이메일)</label>
                            <div className="input_flex">
                                <input onKeyUp={handleUserId} required type="text" className="text" id="join_email"  placeholder="이메일을 입력하세요" {...register('user_id')}/>
                                <button type="button" onClick={inRegEmail}>중복 체크</button>
                            </div>
                            <div className="input__message">
                                입력하신 이메일로 회원가입 인증메일이 발송됩니다.
                            </div>
                            {errors.user_id && <div className="error_tip">{errors.user_id.message}</div>}
                            {userIdCheck ? <div className="error_tip">{userIdCheck}</div> : null}
                        </div>
                        <div className={'input__group ' + (errors.password ? "is-alert " : "") + (watch().password ? "is-success " : "")}>
                            {/*is-success is-alert*/}
                            <label htmlFor="join_password">비밀번호</label>
                            <input onKeyUp={handleUserPwd} required type="password" className="text" id="join_password" placeholder="비밀번호를 입력하세요" {...register('password')}/>
                            {errors.password && <div className="error_tip">{errors.password.message}</div>}
                        </div>
                        <div className={'input__group ' + (errors.user_pwd ? "is-alert " : "") + (watch().user_pwd ? "is-success " : "")}>
                            <label htmlFor="join_password2">비밀번호 확인</label>
                            <input onKeyUp={handleUserPwdChk} required type="password" className="text" name="user_pwd" id="join_password2" placeholder="비밀번호를 입력하세요" {...register('user_pwd')}/>
                            {errors.user_pwd && <div className="error_tip">{errors.user_pwd.message}</div>}
                        </div>
                    </div>
                    <div className="btn__box">
                        <div className="btn__group">
                            <Link to="/" className="btn btn__normal">취소</Link>
                            <button type="button" onClick={(Sign2Open)} className={userDisabled === true ? "btn btn__able" : "btn btn__disable"} >다음</button>
                        </div>
                    </div>
                </div>
                {/* step2 */}
                <div id="step2" className="join">
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
                        <div className={'input__group ' + (errors.user_phone ? "is-alert " : "") + (watch().user_phone ? "is-success " : "")}>
                            <label htmlFor="join_tel">연락처</label>
                            <input type="text" name="user_phone" className="text" id="join_tel" placeholder="연락처를 입력하세요" {...register('user_phone')}/>
                            <div className="input__message">
                                서비스오류 발생시 연락처로 알림이 수신됩니다.
                            </div>
                            {errors.user_phone && <div className="error_tip">{errors.user_phone.message}</div>}
                        </div>
                        <div className="input__group option__type">
                            <label htmlFor="join_tel">평소 외향적인 성격인가요?</label>
                            <div className="radio__inline">
                                <div className="radio">
                                    <input type="radio" name="eq_type01" id="r-1" value="-2" {...register('eq_type01')}/>
                                    <label htmlFor="r-1">매우 그렇지 않다</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" name="eq_type01" id="r-2" value="-1" {...register('eq_type01')}/>
                                    <label htmlFor="r-2">그렇지 않다</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" name="eq_type01" id="r-3" value="0" {...register('eq_type01')}/>
                                    <label htmlFor="r-3">보통이다</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" name="eq_type01" id="r-4" value="1" {...register('eq_type01')}/>
                                    <label htmlFor="r-4">그렇다</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" name="eq_type01" id="r-5" value="2" {...register('eq_type01')}/>
                                    <label htmlFor="r-5">매우 그렇다</label>
                                </div>
                                <input type="hidden" name="eq_type03" value="0"/>
                                <input type="hidden" name="eq_type04" value="0"/>
                                <input type="hidden" name="eq_type05" value="0"/>
                                <input type="hidden" name="eq_type06" value="0"/>
                                <input type="hidden" name="eq_type07" value="0"/>
                                <input type="hidden" name="eq_type08" value="0"/>
                                <input type="hidden" name="eq_type09" value="0"/>
                                <input type="hidden" name="eq_type10" value="0"/>
                            </div>
                        </div>
                        <div className="input__group option__type is-normal">
                            <label htmlFor="join_tel">평소 친화력이 있는 성격인가요?</label>
                            <div className="radio__inline">
                                <div className="radio">
                                    <input type="radio" name="eq_type02" id="r2-1" value="-2" {...register('eq_type02')}/>
                                    <label htmlFor="r2-1">매우 그렇지 않다</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" name="eq_type02" id="r2-2" value="-1" {...register('eq_type02')}/>
                                    <label htmlFor="r2-2">그렇지 않다</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" name="eq_type02" id="r2-3" value="0" {...register('eq_type02')}/>
                                    <label htmlFor="r2-3">보통이다</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" name="eq_type02" id="r2-4" value="1" {...register('eq_type02')}/>
                                    <label htmlFor="r2-4">그렇다</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" name="eq_type02" id="r2-5" value="2" {...register('eq_type02')}/>
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
                            <button onClick={Sign1Open} className="btn btn__normal">이전</button>
                            <button onClick={Sign3Open} className="btn btn__able">다음</button>
                        </div>
                    </div>
                </div>
                {/* step3 */}
                <div id="step3" className="join">
                    <h2>회원가입</h2>
                    <div className="desc__h2">아래의 정보를 기입해 주세요.</div>
                    <div className="step__box">
                        <div className="step is-checked">
                            <span>1</span>
                            <em>필수 정보</em>
                        </div>
                        <div className="step is-checked">
                            <span>2</span>
                            <em>선택 정보</em>
                        </div>
                        <div className="step is-active">
                            <span>3</span>
                            <em>약관 동의</em>
                        </div>
                    </div>

                    <div className="join__box">
                        <div className="input__group terms__type">
                            <div className="terms__text">

                                {termBoxShow ?
                                    // 개인정보 처리방침
                                    <div className="terms_box">
                                        <h2>‘EURA 유라’ 개인정보처리방침</h2>
                                        <h3>제 1조 (개인정보 수집/이용 및 제공에 대한 안내)</h3>
                                        <p>포스텍 미래도시연구센터(이하 "센터")와 회사는 ‘EURA 유라’ 플랫폼에서 제공하는 모든 서비스(이하 '서비스')를 이용하는 회원의 개인정보를 중요 시하며, "개인정보보호법", "정보통신망 이용촉진 및 정보보호 등에 관한 법률", "전자금융거래법", "전자상거래 등에서의 소비자보호에 관한 법률", "신용정보의 이용 및 보호에 관한 법률", "개인정보의 기술적·관리적 보호조치 기준", "개인정보의 안전성 확보조치기준" 등 관련 법령 및 시행령, 행정기관의 행정지침을 준수하고 있습니다.</p>
                                        <p>센터 및 회사는 플랫폼의 서비스(이하 "서비스")을 통하여 개인정보처리방침을 상시 고지하여 회원으로부터 수집되는 개인정보가 어떠한 용도와 방식으로 이용되며, 개인정보보호를 위해 어떠한 조치가 취해지는지 알려드립니다.</p>
                                        <h3>제 2조 (개인정보의 수집항목 및 수집방법)</h3>
                                        <ol>
                                            <li>
                                                수집항목
                                                <p>
                                                    [회원가입 시]<br/>
                                                    회사는 서비스를 원활하게 제공하기 위하여 최소한의 개인정보만 수집합니다.<br/>
                                                    - 필수: 이름, 아이디(이메일), 비밀번호<br/>
                                                    - 선택: 연락처, 성격 유
                                                </p>
                                            </li>
                                            <li>
                                                개인정보 수집방법<br/>
                                                <p>
                                                    - 홈페이지<br/>
                                                    - 생성정보 수집 툴을 통한 수집
                                                </p>
                                            </li>
                                        </ol>
                                        <h3>제 2조 (개인정보의 수집 및 이용목적)</h3>
                                        <p>센터 및 회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</p>
                                        <ol>
                                            <li>‘EURA 유라’ 회원 관리 및 서비스 관리를 목적으로 개인정보를 수집<br/>
                                                - 관리 사항: 사용자 관리, 미팅룸 관리
                                            </li>
                                            <li>서비스 제공에 관한 계약이행 및 서비스 제공에 따른 정보 알림 등의 서비스</li>
                                            <li>회원 관리<br/>
                                                회원제 서비스 이용에 따른 본인확인, 개인 식별, 불량회원 또는 이용약관을 위반하는 회원 등의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 연령확인, 불만처리 등 민원처리, 고지사항 전달</li>
                                            <li>신규 서비스 개발에 활용<br/>
                                                신규 서비스 개발 및 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계</li>
                                        </ol>
                                        <h3>제 3조 (개인정보의 제공)</h3>
                                        <p>센터 및 회사는 회원들의 개인정보를 "개인정보 수집 및 이용목적"에서 고지한 범위내에서 사용하며, 회원의 사전 동의 없이는 동 범위를 초과하여 이용하거나 외부에 공개하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
                                        <ol>
                                            <li>회원들이 사전에 공개에 동의한 경우</li>
                                            <li>법령의 규정에 따른 관계기관의 적법한 요구가 있는 경우</li>
                                        </ol>
                                        <h3>제 4조 (개인정보의 처리위탁)</h3>
                                        <p>센터 및 회사는 서비스 이행을 위해 아래와 같이 개인정보를 수집하고 있으며, 관계 법령에 따라 수집 시 개인정보가 안전하게 관리될 수 있도록 합니다.</p>
                                        <h3>제 5조 (개인정보의 보유 및 이용기간)</h3>
                                        <p>회원의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다.
                                            단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.</p>
                                        <ol>
                                            <li>센터 및 회사 내부 방침에 의한 정보보유 사유<br/>
                                                - 부정이용기록 보존 이유: 부정 이용 방지<br/>
                                                - 보존 기간: 1년
                                            </li>
                                            <li>관련법령에 의한 정보보유 사유<br/>
                                                관계법령의 규정에 의하여 보존할 필요가 있는 경우 센터는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 센터 및 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다.<br/>
                                                ① 계약 또는 청약철회 등에 관한 기록<br/>
                                                - 보존 근거: 전자상거래 등에서의 소비자보호에 관한 법률<br/>
                                                - 보존 기간: 5년
                                            </li>
                                        </ol>
                                        <h3>제 6조 (개인정보의 수집, 이용 동의 철회)</h3>
                                        <p>회원가입 등을 통해 개인정보의 수집, 이용에 대해 동의하신 내용을 회원은 언제든지 철회할 수 있습니다. 동의 철회를 원하실 경우 센터 또는 회사에 서면, 전화, E-mail 등으로 연락하시면 즉시 회원탈퇴를 위해 필요한 조치를 취하겠습니다. 동의 철회를 하고 개인정보를 파기하는 등의 조치를 취한 경우에는 그 사실을 회원에게 지체없이 통지하도록 하겠습니다.</p>
                                        <h3>제 7조 (개인정보의 파기절차 및 방법)</h3>
                                        <p>센터 및 회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
                                        <ol>
                                            <li>파기절차<br/>
                                                내부 방침 및 기타 관련 법령에 의한 정보보호 사유 또는 보유 및 이용기간이 종료되면 파기되며, 파기되는 개인정보는 내부 정보보호 및 지침서에 정의된 절차 즉 개인정보보호책임자의 승인 및 파기 결과 확인 등의 절차로 진행됩니다.
                                            </li>
                                            <li>파기방법<br/>
                                                - 종이에 출력된 개인정보는 분쇄기로 분쇄를 통하여 파기합니다.<br/>
                                                - 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다. 개인정보는 고유식별번호 외 주소, 전화번호 등 특정 개인을 식별할 수 있는 정보의 집합체를 말합니다.
                                            </li>
                                        </ol>
                                        <h3>제 8조 (회원 및 법정대리인의 권리와 그 행사방법)</h3>
                                        <p>회원께서 탈퇴요청을 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.<br/>
                                            또한 회원께서 개인정보 수집·이용·제공 등의 동의를 하신 현황, 동의를 통해 수집된 개인정보, 해당 개인정보에 대한 이용 및 제3자 제공현황 등에 대한 열람 또는 제공받기를 원하시는 경우에도 센터 또는 회사 담당자에게 연락하시면 지체 없이 조치하겠습니다.<br/>
                                            아울러, 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제3자 제공을 하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이 통지하여 정정이 이루어지도록 하겠습니다.<br/>
                                            센터 및 회사는 회원 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 "개인정보의 파기절차 및 방법"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.</p>
                                        <h3>제 9조 (개인정보의 기술적/관리적 보호대책)</h3>
                                        <p>센터 및 회사는 회원들의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 위조, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다.
                                            회원들의 개인정보는 서버에 저장되어 철저히 보호되고 있습니다. 개인정보의 확인 및 변경도 본인에 의해서만 가능합니다. 따라서 회원 여러분께서는 등록된 개인 정보를 누구에게도 알려주시면 안됩니다. 이를 위해 센터 및 회사에서는 기본적으로 사용을 마치신 후 플랫폼을 종료하도록 권장합니다. 특히 공공장소(학교나 센터, 도서관, 인터넷 게임방 등)에서 이용한 경우에는 개인정보가 다른 사람에게 알려지는 것을 막기 위해 위와 같은 절차가 더욱 필요할 것입니다.
                                            센터 및 회사는 해킹이나 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다. 개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고, 회원들의 개인정보나 자료가 유출되거나 손상되지 않도록 방지하고 있으며, 암호화통신 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다. 그리고 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있으며, 기타 시스템적으로 보안성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다.
                                            센터 및 회사의 개인정보관련 처리 직원은 담당자에 한정시키고 있고 이를 위한 별도의 비밀번호를 부여하며, 담당자에 대한 수시 교육을 통하여 개인정보처리방침의 준수를 항상 강조하고 있습니다. 그리고 사내 개인정보보호전담기구 등을 통하여 개인정보처리방침의 이행사항 및 담당자의 준수여부를 확인하여 문제가 발견될 경우 즉시 수정하고 바로잡을 수 있도록 노력하고 있습니다. 단, 회원 본인의 부주의나 인터넷상의 문제로 ID, 비밀번호 등 개인정보가 유출해 발생한 문제에 대해 센터는 일체의 책임을 지지 않습니다.</p>
                                        <h3>제 10조 (기타)</h3>
                                        <p>센터와 회사는 개인정보 보호의 안전을 기하기 위하여 서비스 제공자의 개인정보보호 관련 지시엄수, 개인정보에 관한 비밀유지, 제 3자 제공의 금지 및 사고시의 책임부담 등을 명확히 규정하고 당해 내용을 서면 및 전자적으로 보관하고 있습니다.</p>
                                        <h3>제 11조 (고지의무)</h3>
                                        <p>현 개인정보처리방침 내용 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일전부터 서비스의 "공지사항"을 통해 고지할 것입니다. 다만, 회원에게 불리하게 개인정보처리방침 내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예 기간을 두고 공지하겠습니다.</p>

                                        <h5>&lt;부칙&gt;</h5>
                                        <p>본 약관은 2023년 01월 01일부터 적용됩니다.</p>
                                    </div>
                                    :
                                    // 서비스 이용약관
                                    <div className="terms_box">
                                    <h2>‘EURA 유라’ 서비스이용약관</h2>
                                    <h3>제 1장 총칙</h3>
                                    <h4>제 1조 (목적)</h4>
                                    <p>이 약관은 포스텍 미래도시연구센터(이하 '센터')가 제공하는 ‘EURA 유라’ 플랫폼의 컨텐츠 등 모든 서비스(이하 '서비스')를 이용함에 있어, 이용조건 및 절차에 관한 기본적인 사항을 약속하여 규정함을 그 목적으로 합니다.
                                    </p>
                                    <h4>제 2조 (약관의 효력과 변경)</h4>
                                    <ol>
                                    <li>이 약관의 내용은 플랫폼의 서비스 초기 화면에 게시하거나 기타의 방법으로 회원에게 공시함으로써 효력을 발생합니다.</li>
                                    <li>이 약관은 본 ‘서비스’를 이용하고자 하는 모든 이용자에 대하여 그 효력을 발생합니다.</li>
                                    <li>'센터'는 합당한 사유가 발생할 경우에는 이 약관을 변경할 수 있으며, 약관이 변경된 경우에는 변경된 약관은 제1항과 동일한 방법으로 공시함으로써 효력이 발생됩니다.</li>
                                    </ol>
                                    <h4>제 3조 (약관 외 준칙)</h4>
                                    <p>이 약관에 명시되지 아니한 사항에 대해서는 관계법령 및 서비스 별 약관의 취지에 따라 적용할 수 있습니다.</p>
                                    <h4>제 4조 (용어의 정의)</h4>
                                    <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
                                    <ol>
                                    <li>'서비스'라 함은 '센터'에서 제작한 플랫폼을 통해 공급되는 각종 미팅룸 개설, 입장 및 정보를 말합니다.</li>
                                    <li>'회원'이라 함은 웹페이지의 약관에 동의한 뒤 서비스 이용계약을 체결한 자를 말합니다.</li>
                                    <li>'이메일'라 함은 회원의 식별을 위해 회원이 기재하고 '센터'가 확인하는 조합을 의미합니다.</li>
                                    <li>'비밀번호'라 함은 회원의 비밀번호를 위해 회원 자신이 설정한 문자와 숫자의 조합을 말합니다.</li>
                                    <li>'관리자'라 함은 서비스의 전반적인 관리와 운영을 위하여 '센터'에서 선정한 사람(들)을 말합니다.</li>
                                    <li>'탈퇴'라 함은 회원이 회원가입 후 이용계약을 종료하는 것을 의미합니다.</li>
                                    </ol>
                                    <h3>제 2장 서비스 이용계약</h3>
                                    <h4>제 5조 (이용계약의 성립)</h4>
                                    <ol>
                                    <li>“이용약관에 동의하십니까?”라는 물음에 회원이 "동의합니다" 를 클릭하시면 이 약관에 동의하는 것으로 간주합니다.</li>
                                    <li>회원의 자격요건은 '센터'의 회칙에서 정한 바에 따릅니다.</li>
                                    </ol>
                                    <h4>제 6조 (이용신청)</h4>
                                    <p>이용신청은 온라인으로 서비스에 접속한 후 다음 사항을 회원등록 양식에 기재하여 신청합니다.<br/>
                                    회원등록 양식 항목: 이메일 주소, 비밀번호, 이름, 연락처, 성격 유형</p>
                                    <h4>제 7조 (이용신청의 승인)</h4>
                                    <ol>
                                    <li>'센터'는 회원이 제 6 조에서 정한 모든 사항을 정확히 기재하여 이용신청을 하였을 때 승인합니다.</li>
                                    <li>'센터'는 다음 각 호에 해당하는 이용신청에 대하여는 승인을 유보할 수 있습니다.
                                    <ol>
                                    <li>설비에 여유가 없는 경우</li>
                                    <li>기술상 지장이 있는 경우</li>
                                    <li>기타사항이 필요하다고 인정되는 경우</li>
                                    </ol>
                                    </li>
                                    <li>'센터'는 다음 각 호에 해당하는 이용신청에 대하여는 이를 승인하지 아니할 수 있습니다.
                                    <ol>
                                    <li>이름이 실명이 아닌 경우</li>
                                    <li>다른 사람의 명의를 사용하여 신청한 경우</li>
                                    <li>회원 등록 시 필요 내용을 허위로 기재하여 신청한 경우</li>
                                    <li>사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우</li>
                                    <li>기타에서 정한 이용 신청 자격 요건이 미비 되었을 때</li>
                                    </ol>
                                    </li>
                                    </ol>
                                    <h4>제 8조 (계약사항의 변경)</h4>
                                    <p>회원은 등록 신청 시 기재한 사항이 변경되었을 경우에는 지체 없이 온라인 수정을 해야 합니다.</p>
                                    <h3>제 3장 서비스 이용</h3>
                                    <h4>제 9조 ('센터'의 의무)</h4>
                                    <p>'센터'는 서비스 제공과 관련해서 알고 있는 회원의 신상정보를 본인의 승낙 없이 제3자에게 누설, 배포하지 않습니다. 단, 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우, 범죄에 대한 수사상의 목적이 있거나 정보통신윤리위원회의 요청이 있는 경우 또는 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우에는 예외로 합니다.</p>
                                    <h4>제 10조 (회원 아이디와 비밀번호 관리에 대한 의무)</h4>
                                    <p>회원 아이디와 비밀번호의 관리 및 이용상의 부주의로 인하여 발생되는 손해 또는 제3자에 의한 부정사용 등에 대한 책임은 모두 회원에게 있습니다. 자신의 아이디와 비밀번호가 부정하게 사용된 경우 회원은 반드시 '센터'에 그 사실을 통보해야 합니다.</p>
                                    <h4>제 11조 (서비스 전반에 관한 회원의 의무)</h4>
                                    <ol>
                                    <li>회원은 서비스를 이용할 때 다음 각 호의 행위를 하지 않아야 합니다.
                                    <ol>
                                    <li>다른 회원의 아이디와 비밀번호를 부정하게 사용하는 행위</li>
                                    <li>제3자의 저작권 등 기타 권리를 침해하는 행위</li>
                                    <li>공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형 등을 타인에게 유포하는 행위</li>
                                    <li>범죄와 결부된다고 객관적으로 판단되는 행위</li>
                                    <li>기타 관계법령에 위배되는 행위</li>
                                    </ol>
                                    </li>
                                    <li>회원은 이 약관에서 규정하는 사항과 서비스 이용안내 또는 주의사항을 준수하여야 합니다.</li>
                                    <li>회원은 내용별로 '센터'가 서비스 공지사항에 게시하거나 별도로 공지한 이용 제한 사항을 준수하여야 합니다.</li>
                                    <li>회원은 '센터'의 사전승낙 없이는 서비스를 이용하여 영업활동을 할 수 없으며, 영업활동의 결과와 회원이 약관에 위반한 영업활동을 이용하여 발생한 결과에 대하여 '센터'는 책임을 지지 않습니다.</li>
                                    </ol>
                                    <h4>제 12조 (정보의 제공)</h4>
                                    <p>'센터'는 회원이 서비스 이용 중 필요가 있다고 인정되는 다양한 정보에 대해서 전자우편이나 서신 우편 등의 방법으로 회원에게 제공할 수 있습니다.</p>
                                    <h4>제 13조 (게시물의 저작권, 초상권, 지적소유권 등)</h4>
                                    <ol>
                                    <li>회원이 해당 플랫폼 내에 게시한 게시물의 저작권은 회원이 소유하며, '센터'는 별도의 계약 없이 이를 게시할 수 있는 권리를 갖습니다.</li>
                                    <li>회원이 해당 플랫폼 내에 게시한 모든 게시물의 지적 재산권 및 기타 권리와 모든 책임은 전적으로 게시한 회원 본인에게 있습니다.</li>
                                    <li>게시물의 저작권을 가진 회원이 요청할 경우 '센터'는 게시물을 삭제할 수 있습니다.</li>
                                    <li>'센터'는 회원이 게시하거나 등록하는 서비스내의 내용물이 다음 각 호에 해당한다고 판단되는 경우에 사전통지 없이 삭제할 수 있습니다.
                                    <ol>
                                    <li>다른 회원 또는 제3자를 비방하거나 중상모략으로 명예를 손상시키는 내용인 경우</li>
                                    <li>공공질서 및 미풍양속에 위반되는 내용인 경우</li>
                                    <li>범죄적 행위에 결부된다고 인정되는 내용일 경우</li>
                                    <li>제 3 자의 저작권 등 기타 권리를 침해하는 내용인 경우</li>
                                    <li>불건전한 자료를 홍보할 경우</li>
                                    <li>기타 관계법령에 위반된다고 판단되는 경우</li>
                                    </ol>
                                    </li>
                                    <li>'센터'에서 게시한 게시물, 사진 등에 대한 저작권, 초상권, 지적재산권은 '센터'에 귀속됩니다.</li>
                                    </ol>
                                    <h4>제 14조 (서비스 이용기간)</h4>
                                    <p>'서비스'의 이용은 '센터'의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴 1일 24시간을 원칙으로 합니다. 다만 정기점검 등의 필요로 '센터'가 정한 날이나 시간은 그러하지 않습니다. '센터'는 서비스를 일정범위로 분할하여 각 범위 별로 이용가능시간을 별도로 정할 수 있으며 이 경우 그 내용을 사전에 공지합니다.</p>
                                    <h4>제 15조 (서비스 제공의 중지)</h4>
                                    <p>'센터'는 다음 각 호에 해당하는 경우 서비스 제공을 중지할 수 있습니다.</p>
                                    <ol>
                                    <li>비스용 설비의 보수 등 공사로 인한 부득이한 경우</li>
                                    <li>전기통신사업법에 규정된 기간통신사업자가 전기통신서비스를 중지했을 경우</li>
                                    <li>'센터'는 국가비상사태, 정전, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 때에는 서비스의 전부 또는 일부를 제한하거나 정지할 수 있습니다.</li>
                                    </ol>
                                    <h3>제 4장 계약해지 및 이용제한</h3>
                                    <h4>제 16조 (계약해지 및 이용제한)</h4>
                                    <p>회원이 이용계약을 해지하고자 하는 때에는 회원 본인이 전자우편을 통해 '센터'에 해지신청을 하여야 합니다. '센터'는 회원이 다음 각 호에 해당하는 행위를 하였을 경우 사전 통지 없이 이용계약을 해지하거나 또는 일정기간 서비스 이용을 중지할 수 있습니다.</p>
                                    <ol>
                                    <li>타인의 아이디 및 비밀번호를 도용한 경우</li>
                                    <li>서비스 운영을 고의로 방해한 경우</li>
                                    <li>가입한 이름이 실명이 아닌 경우</li>
                                    <li>같은 사용자가 다른 이름, 별명으로 이중 등록을 한 경우</li>
                                    <li>공공질서 및 미풍양속에 저해되는 내용을 고의로 유포시킨 경우</li>
                                    <li>회원이 국익 또는 사회적 공익을 저해할 목적으로 서비스 이용을 계획 또는 실행하는 경우</li>
                                    <li>타인의 명예를 손상시키거나 불이익을 주는 행위를 한 경우</li>
                                    <li>기타 '센터'가 정한 이용조건에 위반한 경우</li>
                                    </ol>
                                    <h3>제 5장 손해배상 등</h3>
                                    <h4>제 17조 (손해배상)</h4>
                                    <p>'센터'는 서비스 이용과 관련하여 회원에게 발생한 어떠한 손해에 관하여도 책임을 지지 않습니다.</p>
                                    <h4>제 18조 (면책조항)</h4>
                                    <ol>
                                    <li>'센터'는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                                    <li>'센터'는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.</li>
                                    <li>'센터'는 회원이 서비스를 이용하여 기대하는 손익이나 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</li>
                                    <li>'센터'는 회원이 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을 지지 않습니다.</li>
                                    </ol>
                                    <h4>제 19조 (관할법원)</h4>
                                    <p>서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 포스텍의 본사 소재지를 관할하는 법원을 관할 법원으로 합니다.</p>
                                    <h3>제 6장 개인정보 보호 등</h3>
                                    <h4>제 20조 (개인정보 열람 및 정정)</h4>
                                    <p>개인정보의 열람 및 정정은 회원이 필요한 경우 회원정보수정 메뉴를 이용하여 행할 수 있습니다.</p>
                                    <h4>제 21조 (개인정보 보유기간)</h4>
                                    <p>회원의 개인정보는 가입시점부터 제 16조에 의한 탈퇴 시점 까지로 합니다.</p>
                                    <h5>&lt;부칙&gt;</h5>
                                    <p>본 약관은 2023년 01월 01일부터 적용됩니다.</p>
                                    </div>
                                }


                            </div>
                            <div className="checkbox">
                                <input type="checkbox" onInput={handleTerms} name="privacy_terms" className="checkbox" id="cb-1" {...register('privacy_terms')}/>
                                <label htmlFor="cb-1">위의 개인정보 처리방침에 동의합니다.</label>
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" onInput={handleTerms} name="service_use_terms" className="checkbox" id="cb-2" {...register('service_use_terms')}/>
                                <label htmlFor="cb-2">위의 서비스 이용 약관에 동의합니다.</label>
                            </div>
                            {/*{errors.privacy_terms && <div className="error_tip">{errors.privacy_terms.message}</div>}*/}
                            {/*{errors.service_use_terms && <div className="error_tip">{errors.service_use_terms.message}</div>}*/}
                        </div>
                    </div>

                    <div className="btn__box">
                        <div className="btn__group">
                            <button onClick={Sign_prev3} className="btn btn__normal">이전</button>
                            {termDisabled ?
                                <button type="button" className="btn btn__disable">다음</button>
                                :
                                <button onClick={Sign4Open} className="btn btn__able">다음</button>
                            }

                        </div>
                    </div>
                </div>
                {/* step4 */}
                <div id="step4" className="join profile">
                    <h2>프로필 사진 등록</h2>
                    <div className="desc__h2">아래를 클릭하여 마음에 드는 사진을 업로드 하세요.</div>

                    <div className="join__box">
                        <label className="input__group upload__type">
                            <input
                                className="upload__btn"
                                name="file"
                                type="file"
                                accept="image/*"
                               {...register("file")} />
                            <div className="upload__image"><img id="preview" alt="sample" src={imagePreview} style={{ margin: "auto" }} /></div>
                            {errors.file && <div className="error_tip">{errors.file.message}</div>}
                        </label>
                    </div>

                    <div className="btn__box">
                        <div className="btn__group">
                            <button id="image_upload_btn" type="submit" disabled={isSubmitting} className="btn btn__normal">지금은 넘어가기</button>
                            <button id="img_on_submit" type="submit" className="btn btn__able" disabled={isSubmitting}>
                                완료
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <form className="w100" id="sign_up_complete"  onSubmit={handleSubmit(reMailSubmit, onError)}>
                <section className="content">
                    <div className="join temporary">
                        <figure><img src={require('../assets/image/img_mail_no_lock.png')} alt=""/></figure>
                        <h3>인증메일 발송완료</h3>
                        <div className="desc__message"><strong>{userId}<input name="user_id" type="hidden" value={userId}/></strong>로 회원가입 인증메일이 발송되었습니다.<br/>
                            이메일에서 확인 후 회원가입이 완료됩니다.
                        </div>

                        <div className="btn__box">
                            <div className="btn__group">
                                <Link to="/login" className="btn btn__able">로그인 화면으로 돌아가기</Link>
                            </div>
                        </div>

                        <div className="anchor__box">
                            인증메일을 받지 못 하셨나요? <button className="login__anchor">인증메일 재발송</button>
                        </div>
                    </div>
                </section>
            </form>
        </section>

    )
}

export default SignUp;