import axios from "axios";

const FindPW = () => {

    const findIdSubmit = (data) => {
        console.log(data)
        axios.post('http://192.168.0.85:10000/pw_find_mail'
            , data
            , {
                headers: {
                    "Content-Type": "multipart/form-data",
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
                <h2>임시 비밀번호 발급</h2>
                <div className="desc__h2">가입 시 사용한 이메일을 입력하세요.</div>
                <form action="">
                    <div className="join__box">
                        <div className="input__group">
                            <label htmlFor="login_mail">아이디(이메일)</label>
                            <input type="text" className="text" id="login_mail" placeholder="이메일을 입력하세요"/>
                        </div>
                    </div>

                    <div className="btn__box">
                        <div className="btn__group">
                            <button onClick={findIdSubmit} className="btn btn__able">임시 비밀번호 발송하기</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default FindPW;