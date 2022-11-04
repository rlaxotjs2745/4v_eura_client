
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__inner">
                <h2><img src={require('../../assets/image/logo_postech.png')} alt="POSTECH"/></h2>
                <div className="footer__quick">
                    <a href="#none" className="anchor__quick">이용약관</a><a href="#none"
                                                                         className="anchor__quick">개인정보처리방침</a>
                </div>
                <div className="footer__info">
                    <span className="address">(37673) 경상북도 포항시 남구 청암로 77(효자동 산31)</span>
                    <span className="tel">TEL. 054-279-0114</span>
                    <span className="email">E-Mail. webmaster@postech.ac.kr</span>
                    <span className="copyright">Copyright © Pohang University of Science and Technology, Inc. All rights reserved.</span>
                </div>
            </div>
        </div>
    )
}

export default Footer;