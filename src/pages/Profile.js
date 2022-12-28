import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import {useCookies} from "react-cookie";
import { AXIOS_OPTION, SERVER_URL } from "../util/env";
import {getCookie} from "../util/cookie";
import $ from "jquery";

const Profile = () => {

    const navigate = useNavigate();

    const user_cookie_id = getCookie('user_id')
    const [profileVisible, setProfileVisible] = useState(false)
    const [nameVisible, setNameVisible] = useState(false)
    const [pwdVisible, setPwdVisible] = useState(false)
    const [phoneVisible, setPhoneVisible] = useState(false)
    const [characterVisible, setCharacterVisible] = useState(false)
    const [passwordAlert, setPasswordAlert] = useState('')

    const [profilePic, setProfilePic] = useState(0)
    const [profile, setProfile] = useState('../assets/image/image_profile.png')
    const [userName, setUserName] = useState('')
    const [userPhone, setUserPhone] = useState('01012345678')
    const [eqType01, setEqType01] = useState(0)
    const [eqType02, setEqType02] = useState(0)

    const user_id = user_cookie_id

    const eq_type_01_val = String(eqType01)
    const eq_type_02_val = String(eqType02)

    const formSchema = yup.object({
        user_pwd_origin:yup
            .string(),
        password:yup
            .string()
            .matches(
                /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{10,20}$/,
                {excludeEmptyString:true, message:'영어, 숫자, 특수문자로 조합된 10자리 이상 비밀번호만 사용가능합니다.'}
            ),
        user_phone: yup
            .string()
            .matches(
                /^\d{3}\d{3,4}\d{4}$/,
                {excludeEmptyString:true, message:'형식에 맞게 입력해주세요. 예) 01012345678'}
            )
            .nullable(),
        user_pwd: yup
            .string()
            // .required('새롭게 사용할 비밀번호를 확인해주세요.')
            .oneOf([yup.ref('password')], '비밀번호가 동일하지 않습니다.'),

        user_name:yup
            .string()
            .nullable(),
        eq_type01:yup
            .number()
            .nullable()
            .validateSync(null),
        eq_type02:yup
            .number()
            .nullable()
            .validateSync(null),

    });
    const {
        register,
        handleSubmit,
        handleBlur,
        setError,
        setValue,
        watch,
        clearErrors,
        formState: { errors, isSubmitted, isSubmitting, isDirty },
        // isSubmitting 은 양식 제출 중 disabled 처리 하게 함.
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: { // 초기값 설정
            user_id: user_id,
            eq_type01 : 0,
            eq_type02 : 0
        }
    });
    
    const [imagePreview, setImagePreview] = useState('../assets/image/image_profile.png');
    const image = watch("file");
    useEffect(() => {
        if (image && image.length > 0) {
            const file = image[0];
            setImagePreview(URL.createObjectURL(file));
            $('#image_upload_btn').hide();
            $('#img_on_submit').addClass('on')
        }
    }, [image]);


    const profileEditSubmit = (data) => {

        const fileUpload = data.file && data.file.length > 0 ? data.file[0] : ''

        const formData = new FormData();
        formData.append("file", fileUpload);
        if (data.file && data.file.length > 0) {
            axios.post(SERVER_URL + '/modify_profile'
                , formData
                , AXIOS_OPTION
            ).then(res => {
                if(res.data.result_code === 'FAIL'){
                    alert(res.data.result_str)
                } else if(res.data.result_code === 'SUCCESS'){
                    window.location.reload();
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    const profileReset = () => {
        if(window.confirm("프로필 사진을 초기화 하시겠습니까?")){
            axios.post(SERVER_URL + '/reset_profile'
                , AXIOS_OPTION
            ).then(res => {
                if(res.data.result_code === 'FAIL'){
                    alert(res.data.result_str)
                } else {
                    window.location.reload();
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    const onError = (errors) => {
        // console.log(errors);
    };

    const profileCancle = () => {
        setNameVisible(!nameVisible)
        setValue('user_name', userName)
    }

    const phoneCancle = () => {
        setPhoneVisible(!phoneVisible)
        setValue('user_phone', userPhone)
        clearErrors()
    }


    const nameEdit = (data) => {
        axios.post(SERVER_URL + '/modify_myinfo', {
            user_name : data.user_name
        }, AXIOS_OPTION).then(res => {
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
    }

    const phoneEdit = (data) => {
        axios.post(SERVER_URL + '/modify_myinfo', {
            user_phone : data.user_phone
        }, AXIOS_OPTION).then(res => {
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
    }

    const [cookies, setCookie, removeCookie] = useCookies(['user_id']);

    const logOut = () => {
        removeCookie('user_id'); // 쿠키를 삭제
        document.cookie = 'user_id' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=.eura.site;path=/;'; //임시 도메인 날리기 (서버에서 보내주는 쿠키 삭제용)
        navigate('/login'); // 로그인 페이지로 이동
    };

    const pwdEdit = (data) => {
        axios.post(SERVER_URL + '/modify_myinfo', {
            'user_pwd_origin' : data.user_pwd_origin,
            'user_pwd' : data.user_pwd
        }, AXIOS_OPTION).then(res => {
            if(res.data.result_code === 'SUCCESS') {
                alert('비밀번호가 성공적으로 변경 되었습니다. 다시 로그인 해 주세요.')
                logOut()
            } else if (res.data.result_code === 'FAIL') {
                setPasswordAlert(res.data.result_str)
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const eqEdit = (data) => {
        axios.post(SERVER_URL + '/modify_myinfo', {
            'eq_type01' : data.eq_type01,
            'eq_type02' : data.eq_type02
        }, AXIOS_OPTION).then(res => {
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(()=>{
        setValue('eq_type01', eq_type_01_val)
        setValue('eq_type02', eq_type_02_val)
    },[eqType01, eqType02])

    const profileEditCancle = () => {
        setImagePreview(profile)
        setProfileVisible(!profileVisible)
    }

    const characterCancle = () => {
        setCharacterVisible(!characterVisible)
        setValue('eq_type01', eq_type_01_val)
        setValue('eq_type02', eq_type_02_val)
    }

    const pwdCancle =()=>{
        setPwdVisible(!pwdVisible)
        setValue('user_pwd_origin', '')
        setValue('password', '')
        setValue('user_pwd', '')
        clearErrors()
    }

    const nameOpen = () => {
        setValue('user_name', userName)
        setNameVisible(!nameVisible)
    }

    const phoneOpen = () => {
        setValue('user_phone', userPhone)
        setPhoneVisible(!phoneVisible)
    }

    async function getMyinfo() {
        axios.post(SERVER_URL + '/myinfo', {}, AXIOS_OPTION).then(res => {
            if(res.data.result_code === 'SUCCESS'){
                setUserName(res.data.data.user_name)
                setUserPhone(res.data.data.user_phone)
                setEqType01(res.data.data.eq_type01)
                setEqType02(res.data.data.eq_type02)
            }

            if (res.data.result_code === 'SUCCESS' && res.data.data.user_pic.length > 0) {
                setProfile(res.data.data.user_pic);
                setImagePreview(res.data.data.user_pic)
                setProfilePic(1)
            }

        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(()=> {
        getMyinfo()
    },[])

    const viewProfile = () => {

    }
    const errorsClear = () => {
        setPasswordAlert('')
    }




    return (
        <section className="content" id="content">
            <div className="my">
                <h2>내 프로필</h2>
                <div className="my__box">
                    {/* 프로필사진 변경 */}
                    {profileVisible ?
                        <div className="input__group">
                            <label htmlFor="join_name" className="width100">프로필사진</label>
                            <form onSubmit={handleSubmit(profileEditSubmit, onError)}>
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
                            <div className="modify__box modify__box2">
                                {
                                    profilePic === 1 ? 
                                    <span onClick={profileReset} className="btn btn__able btn__s">초기화</span>
                                     : null 
                                }
                                &nbsp;<button onClick={profileEditSubmit} className="btn btn__able btn__s">변경하기</button>
                                &nbsp;<button onClick={profileEditCancle} className="btn btn__normal btn__s">취소</button>
                            </div>
                            </form>
                        </div>
                        :
                        <div className="input__group">
                            <label htmlFor="join_name" className="width100">프로필사진</label>
                            <div className="input__group upload__type">
                                <input type="file" {...register("file")} className="upload__btn"/>
                                <div className="upload__image" onClick={()=> {setProfileVisible(!profileVisible)}}>
                                    <img id="preview" src={profile} alt=""/>
                                    <button className="profile_edit_btn">프로필 사진 변경</button>
                                </div>
                            </div>
                        </div>
                    }

                    {/* 아이디(이메일) */}
                    <div className="input__group ">
                        <label htmlFor="join_email">아이디(이메일)</label>
                        <input type="text"  className="text" id="join_email" name="user_id" readOnly disabled  {...register('user_id')}/>
                    </div>

                    {/* 이름 변경 */}
                    {nameVisible ?
                        <div className="input__group">
                            <label htmlFor="join_name">이름</label>
                            <form onSubmit={handleSubmit(nameEdit, onError)}>
                                <input type="text" className="text" name="user_name" {...register('user_name')}/>
                                <div className="modify__box">
                                    <button className="btn btn__able btn__s">변경하기</button>
                                    <button onClick={profileCancle} className="btn btn__normal btn__s">취소</button>
                                </div>
                            </form>
                        </div>
                        :
                        <div className="input__group">
                            <label htmlFor="join_name">이름</label>
                            <input type="text" className="text" value={userName} {...register('user_name')} disabled/>
                            <div className="modify__box">
                                <button onClick={nameOpen} className="btn btn-modify">편집하기</button>
                            </div>
                        </div>
                    }

                    {/* 비밀번호 변경 */}
                    {pwdVisible ?
                        <>
                            <form onSubmit={handleSubmit(pwdEdit, onError)}>
                                <div className="input__group">
                                    <label htmlFor="join_password">이전 비밀번호</label>
                                    <input placeholder="현재 사용하고 있는 비밀번호를 입력해 주세요" onKeyDown={errorsClear} type="password" name="user_pwd_origin" className="text" id="join_password" {...register('user_pwd_origin')}/>
                                    {errors.user_pwd_origin && <div className="error_tip">{errors.user_pwd_origin.message}</div>}
                                    {passwordAlert == '' ? null : <div className="error_tip">{passwordAlert}</div> }
                                </div>
                                <div className={'input__group ' + (errors.password ? "is-alert " : "") + (watch().password ? "is-success " : "")}>
                                    <label htmlFor="join_password">새로운 비밀번호</label>
                                    <input placeholder="새로운 비밀번호를 입력해 주세요" type="password" name="password" className="text" id="join_password" {...register('password')}/>
                                    {errors.password && <div className="error_tip">{errors.password.message}</div>}
                                </div>
                                <div className={'input__group ' + (errors.user_pwd ? "is-alert " : "") + (watch().user_pwd ? "is-success " : "")}>
                                    <label htmlFor="join_password">새로운 비밀번호 확인</label>
                                    <input placeholder="새롭게 입력한 비밀번호를 다시 입력해 주세요" type="password" name="user_pwd" className="text" id="join_password" {...register('user_pwd')}/>
                                    {errors.user_pwd && <div className="error_tip">{errors.user_pwd.message}</div>}
                                    <div className="modify__box">
                                        <button className="btn btn__able btn__s">변경하기</button>
                                        <button onClick={pwdCancle} className="btn btn__normal btn__s">취소</button>
                                    </div>
                                </div>
                            </form>
                        </>
                        :
                        <div className="input__group">
                            <label htmlFor="join_password">비밀번호</label>
                            <input type="password" className="text" id="join_password" value="비밀번호를 입력하세요" disabled/>
                            <div className="modify__box">
                                <button onClick={()=> {setPwdVisible(!pwdVisible)}} className="btn btn-modify">편집하기</button>
                            </div>
                        </div>
                    }

                    {/* 연락처 변경 */}
                    {phoneVisible ?
                        <div className={'input__group ' + (errors.user_phone ? "is-alert " : "") + (watch().user_phone ? "is-success " : "")}>
                            <label htmlFor="join_tel">연락처</label>
                            <form onSubmit={handleSubmit(phoneEdit, onError)}>
                                <input type="text" className="text" id="join_tel" name="user_phone" {...register('user_phone')}/>
                                {errors.user_phone && <div className="error_tip">{errors.user_phone.message}</div>}
                                <div className="modify__box">
                                    <button className="btn btn__able btn__s">변경하기</button>
                                    <button onClick={phoneCancle} className="btn btn__normal btn__s">취소</button>
                                </div>
                            </form>
                        </div>
                        :
                        <div className="input__group">
                            <label htmlFor="join_tel">연락처</label>
                            <input type="text" className="text" id="join_tel" value={userPhone} {...register('user_phone')} disabled/>
                            <div className="modify__box">
                                <button onClick={phoneOpen} href="#none" className="btn btn-modify">편집하기</button>
                            </div>
                        </div>
                    }
                </div>


                <h2>성격 유형 (선택사항)</h2>

                <div className="my__box">
                    {characterVisible ?
                    <>
                        <form onSubmit={handleSubmit(eqEdit, onError)}>
                            <div className="input__group option__type">
                                <label htmlFor="join_tel">평소 외향적인 성격인가요?</label>

                                <div className="modify__box">
                                    <button className="btn btn__able btn__s">변경하기</button>
                                    <button onClick={characterCancle} className="btn btn__normal btn__s">취소</button>
                                </div>
                                <div className="radio__inline">
                                    <div className="radio">
                                        <input type="radio" name="eq_type01" value="-2" id="r-1" {...register('eq_type01')}/>
                                            <label htmlFor="r-1">매우 그렇지 않다</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" name="eq_type01" value="-1" id="r-2" {...register('eq_type01')}/>
                                            <label htmlFor="r-2">그렇지 않다</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" name="eq_type01" value="0" id="r-3" {...register('eq_type01')}/>
                                            <label htmlFor="r-3">보통이다</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" name="eq_type01" value="1" id="r-4" {...register('eq_type01')}/>
                                            <label htmlFor="r-4">그렇다</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" name="eq_type01" value="2" id="r-5" {...register('eq_type01')}/>
                                            <label htmlFor="r-5">매우 그렇다</label>
                                    </div>
                                </div>
                            </div>
                            <div className="input__group option__type is-normal">
                                <label htmlFor="join_tel">평소 친화력이 있는 성격인가요?</label>
                                <div className="radio__inline">
                                    <div className="radio">
                                        <input type="radio" value="-2" name="eq_type02" id="r2-1" {...register('eq_type02')}/>
                                        <label htmlFor="r2-1">매우 그렇지 않다</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" value="-1" name="eq_type02" id="r2-2" {...register('eq_type02')}/>
                                        <label htmlFor="r2-2">그렇지 않다</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" value="0" name="eq_type02" id="r2-3" {...register('eq_type02')}/>
                                        <label htmlFor="r2-3">보통이다</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" value="1" name="eq_type02" id="r2-4" {...register('eq_type02')}/>
                                        <label htmlFor="r2-4">그렇다</label>
                                    </div>
                                    <div className="radio">
                                        <input type="radio" value="2" name="eq_type02" id="r2-5" {...register('eq_type02')}/>
                                        <label htmlFor="r2-5">매우 그렇다</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </>
                    :
                    <>
                        <div className="input__group option__type">
                            <label htmlFor="join_tel">평소 외향적인 성격인가요?</label>
                            <div className="modify__box">
                                <button onClick={()=> {setCharacterVisible(!characterVisible)}} className="btn btn-modify">편집하기</button>
                            </div>
                            <div className="radio__inline">
                                <div className="radio">
                                    <input disabled type="radio" value="-2" name="eq_type01" id="r-1"  {...register('eq_type01')}/>
                                    <label htmlFor="r-1">매우 그렇지 않다</label>
                                </div>
                                <div className="radio">
                                    <input disabled type="radio" value="-1" name="eq_type01" id="r-2" {...register('eq_type01')}/>
                                    <label htmlFor="r-2">그렇지 않다</label>
                                </div>
                                <div className="radio">
                                    <input disabled type="radio" value="0" name="eq_type01" id="r-3" {...register('eq_type01')}/>
                                    <label htmlFor="r-3">보통이다</label>
                                </div>
                                <div className="radio">
                                    <input disabled type="radio" value="1" name="eq_type01" id="r-4" {...register('eq_type01')}/>
                                    <label htmlFor="r-4">그렇다</label>
                                </div>
                                <div className="radio">
                                    <input disabled type="radio" value="2" name="eq_type01" id="r-5" {...register('eq_type01')}/>
                                    <label htmlFor="r-5">매우 그렇다</label>
                                </div>
                            </div>
                        </div>
                        <div className="input__group option__type is-normal">
                            <label htmlFor="join_tel">평소 친화력이 있는 성격인가요?</label>
                            <div className="radio__inline">
                                <div className="radio">
                                    <input disabled type="radio" value="-2" name="eq_type02" id="r2-1" {...register('eq_type02')}/>
                                    <label htmlFor="r2-1">매우 그렇지 않다</label>
                                </div>
                                <div className="radio">
                                    <input disabled type="radio" value="-1" name="eq_type02" id="r2-2" {...register('eq_type02')}/>
                                    <label htmlFor="r2-2">그렇지 않다</label>
                                </div>
                                <div className="radio">
                                    <input disabled type="radio" value="0" name="eq_type02" id="r2-3" {...register('eq_type02')}/>
                                    <label htmlFor="r2-3">보통이다</label>
                                </div>
                                <div className="radio">
                                    <input disabled type="radio" value="1" name="eq_type02" id="r2-4" {...register('eq_type02')}/>
                                    <label htmlFor="r2-4">그렇다</label>
                                </div>
                                <div className="radio">
                                    <input disabled type="radio" value="2" name="eq_type02" id="r2-5" {...register('eq_type02')}/>
                                    <label htmlFor="r2-5">매우 그렇다</label>
                                </div>
                            </div>
                        </div>
                    </>
                    }
                </div>
            </div>
        </section>
    )
}

export default Profile;