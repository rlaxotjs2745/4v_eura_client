import * as React from 'react';
import { useForm } from 'react-hook-form';
import $ from "jquery";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";
import {SERVER_URL, AXIOS_OPTION} from "../util/env";

const SignUp = () => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPwd, setUserPwd] = useState('')
    const [userPwdChk, setUserPwdChk] = useState('')
    const [userDisabled, setUserDisabled] = useState(false)
    const [termDisabled, setTermUserDisabled] = useState(false)

    const handleUserName = (e) => {
        setUserName(e.target.value);
        if (userId.length && userName.length && userPwd.length && userPwdChk.length) {
            setUserDisabled(true)
        } else {
            setUserDisabled(false)
        }
    }

    const handleUserEmail = (e) => {
        setUserEmail(e.target.value);
    }

    const handleUserPwd = (e) => {
        setUserPwd(e.target.value);
        if (userId.length && userName.length && userPwd.length && userPwdChk.length) {
            setUserDisabled(true)
        } else {
            setUserDisabled(false)
        }
    }

    const handleUserPwdChk = (e) => {
        setUserPwdChk(e.target.value);
        if (userId.length && userName.length && userPwd.length && userPwdChk.length) {
            setUserDisabled(true)
        } else {
            setUserDisabled(false)
        }
    }

    const handleUserId = (e) => {
        // console.log(e.target.value);
        setUserId(e.target.value);
        if (userId.length && userName.length && userPwd.length && userPwdChk.length) {
            setUserDisabled(true)
        } else {
            setUserDisabled(false)
        }
    }

    const handleTerms = (e) => {
        if ($('#cb-1').val() === '1' && $('#cb-2').val() === '1') {
            console.log('체크되있어요')
        } else {
            console.log('체크 안되있어요')
            setUserDisabled(false)
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
                /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/,
                '한글, 영어, 숫자만 사용가능합니다.'
            ),
        // 아이디(이메일 형식)
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
        // 비밀번호 확인
        user_pwd: yup
            .string()
            .required('비밀번호를 확인해주세요.')
            .oneOf([yup.ref('password')], '비밀번호가 동일하지 않습니다.'),
        user_phone: yup
            .mixed()
            .nullable(true)
            .transform((_, val) => val === Number(val) ? val : null),
            // .matches(
            //     /^\d{3}\d{3,4}\d{4}$/,
            //     '형식에 맞게 입력해주세요. 예) 01012345678'
            // ),

        privacy_terms:yup
            .number()
            .required('개인정보 처리방침에 동의하셔야 합니다.'),
            // .oneOf(["1"], '개인정보 처리방침에 동의하셔야 합니다.'),
        service_use_terms:yup
            .number()
            .required('서비스 이용약관에 동의하셔야 합니다.'),
            // .oneOf(["1"], '서비스 이용약관에 동의하셔야 합니다.'),
        file:yup
            .mixed(),
            // .test("fileSize", "The file is too large", function(value) {
            //     console.log('*', value)
            //     return false
            // })
            // .test("fileSize", "The file is too large", (value) => {
            //     return value && value[0].size < 2000000
            // })
            // .test("type", "이미지 파일만 업로드가 가능합니다.", (value) => {
            //     return value && value[0].type === ("image/png" || "image/jpg" || "image/jpeg")
            // })
        eq_type01:yup
            .string()
            .nullable(true)
            .transform((_, val) => val === Number(val) ? val : null),
        eq_type02:yup
            .string()
            .nullable(true)
            .transform((_, val) => val === Number(val) ? val : null),

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
        // e.preventDefault();
        console.log(data.privacy_terms)
        console.log(data.service_use_terms)
        let formData = new FormData();
        formData.append('file', data.file[0]);
        formData.append('user_name', data.user_name)
        formData.append('user_id', data.user_id)
        formData.append('user_pwd', data.user_pwd)
        if (data.user_phone !== '') {
            formData.append('user_phone', data.user_phone)
        }
        else if (data.eq_type01 !== '') {
            formData.append('eq_type01', data.eq_type01)
        }
        else if (data.eq_type02 !== '') {
            formData.append('eq_type02', data.eq_type02)
        }
        formData.append('privacy_terms', data.privacy_terms)
        formData.append('service_use_terms', data.service_use_terms)
        console.log(formData)
        axios.post(SERVER_URL + '/join_mail'
            , formData
            , {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // contentType: false,               // * 중요 *
                    // processData: false,               // * 중요 *
                    // enctype : 'multipart/form-data',  // * 중요 *
                }
            }
        ).then(res => {
            console.log(res)
            console.log('res.data.userId :: ', res.data.result_code)
            console.log('res.data.msg :: ', res.data.result_str)
            if(res.data.result_code === 'FAIL'){
                console.log('======================',res.data.result_str);
                alert(res.data.result_str)
                navigate('/')
            } else if(res.data.result_code === 'SUCCESS'){
                console.log('======================', res.data.result_str);
                alert(res.data.result_str)
                $('#signUpForm').addClass('off');
                $('#sign_up_complete').addClass('on');
                // navigate('/signup_complete')
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const onError = (errors) => {
        console.log(errors);
        console.log('에러메세지 입니다. 제출 되지 않습니다.');
    };

    const Sign1Open = () => {
        $('#step1').addClass('active')
        $('#step2').removeClass('active')
    }



    const Sign2Open = (e) => {

        let user_name = $('#join_name')
        let user_id = $('#join_email')
        let join_password = $('#join_password')
        let join_password2 = $('#join_password2')

        if(user_name.val() == '') {
            alert('이름을 입력해주세요.')
        } else if (user_id.val() == '' || user_id.parent().hasClass('is-alert')) {
            alert('아이디(이메일) 입력 사항을 확인해주세요.')
        } else if (join_password.val() == '' || join_password.parent().hasClass('is-alert')) {
            alert('비밀번호 입력 사항을 확인해주세요.')
        } else if (join_password2.val() == '' || join_password2.parent().hasClass('is-alert')) {
            alert('비밀번호 확인 입력 사항을 확인해주세요.')
        }

        else {
            $('#step1').removeClass('active')
            $('#step2').addClass('active')
        }

    }

    const Sign3Open = (e) => {
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
        console.log(cb1.val())
        console.log(cb2.val(), '2번째')

    }

    $('#cb-1').on('click', function(){
        this.value = this.checked ? 1 : 0;
        // alert(this.value);
    });

    $('#cb-2').on('click', function(){
        this.value = this.checked ? 1 : 0;
        // alert(this.value);
    });

    const Sign_prev3 = () => {
        $('#step3').removeClass('active')
        $('#step2').addClass('active')
    }

    const Sign_prev4 = () => {
        $('#step4').removeClass('active')
        $('#step3').addClass('active')
    }

    const reMailSubmit = (data) => {
        let formData = new FormData();
        formData.append('user_id', data.user_id)
        console.log(data.user_id)
        axios.post(SERVER_URL + '/remail_join'
            , data
        ).then(res => {
            console.log(res)
            console.log('res.data.userId :: ', res.data.result_code)
            console.log('res.data.msg :: ', res.data.result_str)
            if(res.data.result_code === 'FAIL'){
                console.log('======================',res.data.result_str);
                alert(res.data.result_str)
            } else if(res.data.result_code === 'SUCCESS'){
                console.log('======================', res.data.result_str);
                alert(res.data.result_str)
            }
        }).catch(err => {
            console.log(err);
        });

    }

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
                        <div className={'input__group ' + (errors.user_id ? "is-alert " : "") + (watch().user_id ? "is-success " : "")}>
                            <label htmlFor="join_email">아이디(이메일)</label>
                            <input onKeyUp={handleUserId} required type="text" className="text" id="join_email"  placeholder="이메일을 입력하세요" {...register('user_id')}/>
                            <div className="input__message">
                                입력하신 이메일로 회원가입 인증메일이 발송됩니다.
                            </div>
                            {errors.user_id && <div className="error_tip">{errors.user_id.message}</div>}
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
                            <button type="button" onClick={(Sign2Open)} className={userDisabled == true ? "btn btn__able" : "btn btn__disable"} >다음</button>
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
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consectetur deserunt
                                distinctio fugiat id, incidunt ipsum iusto necessitatibus nostrum omnis pariatur quibusdam
                                quo sit soluta temporibus tenetur ullam veniam?
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consectetur deserunt
                                distinctio fugiat id, incidunt ipsum iusto necessitatibus nostrum omnis pariatur quibusdam
                                quo sit soluta temporibus tenetur ullam veniam?
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias dolor laboriosam
                                perspiciatis sit vel. Ab, accusamus aut ducimus eveniet in ipsam nesciunt omnis quis
                                sapiente, temporibus voluptatem voluptatibus? Consequatur.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consectetur deserunt
                                distinctio fugiat id, incidunt ipsum iusto necessitatibus nostrum omnis pariatur quibusdam
                                quo sit soluta temporibus tenetur ullam veniam?
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias dolor laboriosam
                                perspiciatis sit vel. Ab, accusamus aut ducimus eveniet in ipsam nesciunt omnis quis
                                sapiente, temporibus voluptatem voluptatibus? Consequatur.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consectetur deserunt
                                distinctio fugiat id, incidunt ipsum iusto necessitatibus nostrum omnis pariatur quibusdam
                                quo sit soluta temporibus tenetur ullam veniam?
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias dolor laboriosam
                                perspiciatis sit vel. Ab, accusamus aut ducimus eveniet in ipsam nesciunt omnis quis
                                sapiente, temporibus voluptatem voluptatibus? Consequatur.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consectetur deserunt
                                distinctio fugiat id, incidunt ipsum iusto necessitatibus nostrum omnis pariatur quibusdam
                                quo sit soluta temporibus tenetur ullam veniam?
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias dolor laboriosam
                                perspiciatis sit vel. Ab, accusamus aut ducimus eveniet in ipsam nesciunt omnis quis
                                sapiente, temporibus voluptatem voluptatibus? Consequatur.
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" name="privacy_terms" className="checkbox" id="cb-1" {...register('privacy_terms')}/>
                                <label htmlFor="cb-1">위의 개인정보 처리방침에 동의합니다.</label>
                            </div>
                            <div className="checkbox">
                                <input type="checkbox" name="service_use_terms" className="checkbox" id="cb-2" {...register('service_use_terms')}/>
                                <label htmlFor="cb-2">위의 서비스 이용 약관에 동의합니다.</label>
                            </div>
                            {/*{errors.privacy_terms && <div className="error_tip">{errors.privacy_terms.message}</div>}*/}
                            {/*{errors.service_use_terms && <div className="error_tip">{errors.service_use_terms.message}</div>}*/}
                        </div>
                    </div>

                    <div className="btn__box">
                        <div className="btn__group">
                            <button onClick={Sign_prev3} className="btn btn__normal">이전</button>
                            <button onClick={Sign4Open} className="btn btn__able">다음</button>
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
                        <figure><img src={require('../assets/image/img_mail.png')} alt=""/></figure>
                        <h3>인증메일 발송완료</h3>
                        <div className="desc__message"><strong>{userId}<input name="user_id" type="hidden" value={userId}/></strong>로 임시 비밀번호가 발송되었습니다.<br/>
                            이메일에서 확인 후 비밀번호를 재설정해주세요
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