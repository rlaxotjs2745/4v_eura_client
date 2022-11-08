import {Link} from "react-router-dom";
import axios from "axios";

const SignUpComplete = () => {

    const reMailSubmit = (data) => {
        console.log(data)
        axios.post('http://192.168.0.85:10000/remail_join'
            , data
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
            <div className="join temporary">
                <figure><img src={require('../assets/image/img_mail.png')} alt=""/></figure>
                <h3>인증메일 발송완료</h3>
                <form action="">
                <div className="desc__message"><strong>sbpark@uxidstudio.com<input type="hidden" value="sbpark@uxidstudio.c"/></strong>로 임시 비밀번호가 발송되었습니다.<br/>
                    이메일에서 확인 후 비밀번호를 재설정해주세요
                </div>

                <div className="btn__box">
                    <div className="btn__group">
                        <Link to="/login" className="btn btn__able">로그인 화면으로 돌아가기</Link>
                    </div>
                </div>

                <div className="anchor__box">
                    인증메일을 받지 못 하셨나요? <button onClick={reMailSubmit} className="login__anchor">인증메일 재발송</button>
                </div>
                </form>
            </div>
        </section>
    )
}

export default SignUpComplete;