import axios from "axios";
import {SERVER_URL, AXIOS_OPTION} from "../util/env";
import { useForm } from 'react-hook-form';
import $ from "jquery";
import {useNavigate} from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from "react";
import {useState} from "react";

const FindPW = () => {
    const navigate = useNavigate();

    const [emailMessage, setEmailMessage] = useState('')

    const formSchema = yup.object({
        user_id: yup
            .string()
            .required('이메일을 입력해주세요')
            .matches(
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                '올바른 이메일을 입력해 주세요.'
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

    const onError = (errors) => {
        // console.log(errors);
    };


    const findIdSubmit = (data) => {
        axios.post(SERVER_URL + '/pw_find_mail'
            , data, AXIOS_OPTION
        ).then(res => {
            if(res.data.result_code === 'FAIL'){
                setEmailMessage(res.data.result_str)
            } else if(res.data.result_code === 'SUCCESS'){
                alert(res.data.result_str)
                navigate('/login')
            }
        }).catch(err => {
            console.log(err);
        });

    }

    return (
        <section className="content" id="content">
            <div className="join temporary">
                <h2>임시 비밀번호 발급</h2>
                <div className="desc__h2">가입 시 사용한 이메일을 입력하세요.</div>
                <form onSubmit={handleSubmit(findIdSubmit, onError)}>
                    <div className="join__box">
                        <div className="input__group">
                            <label htmlFor="login_mail">아이디(이메일)</label>
                            <input type="text" name="user_id" className="text" id="login_mail" placeholder="이메일을 입력하세요"  {...register('user_id')}/>
                        </div>
                        {errors.user_id && <div className="error_tip">{errors.user_id.message}</div>}
                        {emailMessage !== '' ?
                            <div className="error_tip">
                                {emailMessage}
                            </div> : null}
                    </div>

                    <div className="btn__box">
                        <div className="btn__group">
                            <button disabled={isSubmitting} className="btn btn__able">임시 비밀번호 발송하기</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default FindPW;