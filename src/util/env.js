// 은진 매니저님 제공 api 테스트 서버
import {getCookie} from "./cookie";

// export const SERVER_URL = "https://api.eura.site"
export const SERVER_URL = "http://localhost:10000"

// 팀장님 제공 api 테스트 서버
// export const SERVER_URL = "http://192.168.0.9:10000"

export const AXIOS_OPTION = {
    headers: {
        "auth":getCookie('user_id')
    }
};

export const AXIOS_FORM_DATA_OPTION = {
    headers: {
    "Content-Type": "multipart/form-data",
        "auth":getCookie('user_id')
    }
}

// export const COOKIE_DOMAIN = "eura.site";
export const COOKIE_DOMAIN = "localhost";