const SignUp3 = () => {
    return (
        <div className="join">
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
                        <input type="checkbox" className="checkbox" id="cb-1"/>
                        <label htmlFor="cb-1">위의 개인정보 처리방침에 동의합니다.</label>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" className="checkbox" id="cb-2"/>
                        <label htmlFor="cb-2">위의 서비스 이용 약관에 동의합니다.</label>
                    </div>
                </div>
            </div>

            <div className="btn__box">
                <div className="btn__group">
                    <a href="join_info.html" className="btn btn__normal">이전</a>
                    <a href="join_photo.html" className="btn btn__able">다음</a>
                </div>
            </div>
        </div>
    )
}

export default SignUp3;