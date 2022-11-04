import {Link} from "react-router-dom";

const Error = () => {
    return (
        <>
            <div className="page">
                페이지를 찾을 수 없습니다.
                error 404
                <Link to="/">홈으로 돌아가기</Link>
            </div>
        </>
    )
}

export default Error;