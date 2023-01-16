
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
                    <span className="address">주소: (37673) 경상북도 남구 청암로 77 무은재기념관 미래도시연구센터</span>
                    <span className="tel">Tel: 054) 279 - 9151</span>
                    <span className="email">E-mail: pofoic@gmail.com</span>
                    <span className="copyright">Copyright © Pohang University of Science and Technology, Inc. All rights reserved.</span>
                </div>
            </div>
        </div>
    )
}

export default Footer;