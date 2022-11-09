import axios from "axios";
import {SERVER_URL, AXIOS_OPTION} from "../util/env";
import { useForm } from 'react-hook-form';
import $ from "jquery";
import {useNavigate} from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const FindPW = () => {
    const navigate = useNavigate();

    const formSchema = yup.object({
        user_id: yup
            .string()
            .required('이메일을 입력해주세요')
            // .email('이메일 형식이 아닙니다.'),
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
        console.log(errors);
        console.log('에러메세지 입니다. 제출 되지 않습니다.');
    };


    const findIdSubmit = (data) => {
        console.log(data)
        axios.post(SERVER_URL + '/pw_find_mail'
            , data, AXIOS_OPTION
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