import * as React from 'react';
import {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {setCookie, getCookie} from "../util/cookie";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {SERVER_URL2, AXIOS_OPTION, SERVER_URL} from "../util/env";
import axios from 'axios';
import queryString from 'query-string'
import $ from "jquery";

const Profile = () => {


    const user_cookie = getCookie('user_id')
    const [profileVisible, setProfileVisible] = useState(false)
    const [nameVisible, setNameVisible] = useState(false)
    const [pwdVisible, setPwdVisible] = useState(false)
    const [phoneVisible, setPhoneVisible] = useState(false)
    const [characterVisible, setCharacterVisible] = useState(false)

    const [profile, setProfile] = useState('../assets/image/image_profile.png')
    const [userName, setUserName] = useState('유라')

    const user_id = 'taeseon1997@gmail.com'
    const user_name = 'EURA'
    const user_phone = "01012345678"
    const eq_type01 = '1'
    const eq_type02 = '-1'

    useEffect((data)=> {
        axios.post(SERVER_URL + '/myinfo', {
            user_id : user_id
        }, {withCredentials:true}).then(res => {
            // console.log(res.data.data)
            console.log(res.data.data.user_name)
            setProfile(res.data.data.user_pic)
            setUserName(res.data.data.user_name)
            // console.log('res.data.result_code :: ', res.data.result_code)
            // console.log('res.data.msg :: ', res.data.result_str)
            // console.log('res.data.user_name ::', res.data.data.user_name)
            // console.log('res.data.user_pic ::', res.data.data.user_pic)
            // console.log('res.data.user_pic ::', res.data.user_pic)
            // if(res.data.result_code === 'FAIL'){
            //     console.log('======================',res.data.result_str);
            //     // alert(res.data.result_str)
            //     // navigate('/')
            // } else if(res.data.result_code === 'SUCCESS'){
            //     console.log('======================', res.data.result_str);
            //     // alert(res.data.result_str)
            // }
        }).catch(err => {
            console.log(err);
        });
    },[])

    // useEffect(() => {
    //     setValue("eq_type01", eq_type01);
    // }, []);

    const formSchema = yup.object({
        user_pwd_origin:yup
            .string(),
            // .required('현재 사용하고 있는 비밀번호를 입력해주세요.'),
        password:yup
            .string()
            // .required('새롭게 사용할 비밀번호를 입력해주세요.')
            .min(10, '10자 이상의 비밀번호만 사용할 수 있습니다')
            // .max(15, '최대 15자 까지만 가능합니다')
            .matches(
                /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{10,20}$/,
                '영어, 숫자, 특수문자로 조합된 비밀번호만 사용가능합니다.'
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
        eq_type01:yup
            .number()
            .typeError()
            .nullable(),
        eq_type02:yup
            .number()
            .nullable(),
        user_id:yup
            .string()
            .nullable(),
        user_name:yup
            .string()
            .nullable(),
    });
    const {
        register,
        handleSubmit,
        handleBlur,
        setError,
        setValue,
        watch,
        formState: { errors, isSubmitted, isSubmitting, isDirty },
        // isSubmitting 은 양식 제출 중 disabled 처리 하게 함.
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: { // 초기값 설정
            user_id: user_id,
            // user_name: userName,
            user_phone: user_phone,
            eq_type01 : eq_type01,
            eq_type02 : eq_type02
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

    const profileEditSubmit = (data) => {
        axios.defaults.withCredentials = true;
        console.log(data)
        let formData = new FormData();
        formData.append('file', data.file[0]);
        axios.post(SERVER_URL + '/join_mail'
            , formData
            , {
                headers: {
                    "Content-Type": "multipart/form-data",
                    // cookies: user_cookie
                }, withCredentials:true
            }
        ).then(res => {
            console.log(res)
            console.log('res.data.result_code :: ', res.data.result_code)
            console.log('res.data.msg :: ', res.data.result_str)
            if(res.data.result_code === 'FAIL'){
                console.log('======================',res.data.result_str);
                // alert(res.data.result_str)
                // navigate('/')
            } else if(res.data.result_code === 'SUCCESS'){
                console.log('======================', res.data.result_str);
                // alert(res.data.result_str)
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const onError = (errors) => {
        console.log(errors);
        console.log('에러메세지 입니다. 제출 되지 않습니다.');
    };

    const profileCancle = () => {
        setNameVisible(!nameVisible)
        setValue('user_name', user_name)
    }

    const phoneCancle = () => {
        setPhoneVisible(!phoneVisible)
        setValue('user_phone', user_phone)
    }

    const characterCancle = () => {
        setCharacterVisible(!characterVisible)
        setValue('eq_type01', eq_type01)
        setValue('eq_type02', eq_type02)
    }


    return (
        <section className="content" id="content">
            <div className="my">
                <h2>내 프로필</h2>
                <div className="my__box">
                    {/* 프로필사진 변경 */}
                    {profileVisible ?
                        <div className="input__group">
                            <label htmlFor="join_name">프로필사진</label>
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
                            <div className="modify__box">
                                <button className="btn btn__able btn__s">변경하기</button>
                                <button onClick={()=> {setProfileVisible(!profileVisible)}} className="btn btn__normal btn__s">취소</button>
                            </div>
                            </form>
                        </div>
                        :
                        <div className="input__group">
                            <label htmlFor="join_name">프로필사진</label>
                            <div className="input__group upload__type">
                                <input type="file" className="upload__btn"/>
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
                            <input type="text" className="text" name="user_name" {...register('user_name')}/>
                            <div className="modify__box">
                                <button className="btn btn__able btn__s">변경하기</button>
                                <button onClick={profileCancle} className="btn btn__normal btn__s">취소</button>
                            </div>
                        </div>
                        :
                        <div className="input__group">
                            <label htmlFor="join_name">이름</label>
                            <input type="text" className="text" value={userName} {...register('user_name')} disabled/>
                            <div className="modify__box">
                                <button onClick={()=> {setNameVisible(!nameVisible)}} className="btn btn-modify">편집하기</button>
                            </div>
                        </div>
                    }

                    {/* 비밀번호 변경 */}
                    {pwdVisible ?
                        <>
                            <div className="input__group">
                                <label htmlFor="join_password">이전 비밀번호</label>
                                <input placeholder="현재 사용하고 있는 비밀번호를 입력해 주세요" type="password" name="user_pwd_origin" className="text" id="join_password" {...register('user_pwd_origin')}/>
                                {errors.user_pwd_origin && <div className="error_tip">{errors.user_pwd_origin.message}</div>}
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
                                    <button onClick={()=> {setPwdVisible(!pwdVisible)}} className="btn btn__normal btn__s">취소</button>
                                </div>
                            </div>
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
                            <input type="text" className="text" id="join_tel" name="user_phone" {...register('user_phone')}/>
                            {errors.user_phone && <div className="error_tip">{errors.user_phone.message}</div>}
                            <div className="modify__box">
                                <button className="btn btn__able btn__s">변경하기</button>
                                <button onClick={phoneCancle} className="btn btn__normal btn__s">취소</button>
                            </div>

                        </div>
                        :
                        <div className="input__group">
                            <label htmlFor="join_tel">연락처</label>
                            <input type="text" className="text" id="join_tel" {...register('user_phone')} disabled/>
                            <div className="modify__box">
                                <button onClick={()=> {setPhoneVisible(!phoneVisible)}} href="#none" className="btn btn-modify">편집하기</button>
                            </div>
                        </div>
                    }
                </div>


                <h2>성향 선택 문항</h2>

                <div className="my__box">
                    {characterVisible ?
                    <>
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