// 은진 매니저님 제공 api 테스트 서버
import {getCookie} from "./cookie";

export const EURA_DOWNLOAD_URL = "https://file.eura.site/upload/Setup_Eura_v1.0.6.msi"
export const EURA_VERSION = "1.0.6"

export const SERVER_URL = "http://localhost:10000"

const userid = getCookie('user_id')

export const AXIOS_OPTION = {
    withCredentials:true
};

export const AXIOS_FORM_DATA_OPTION = {

    withCredentials:true
}

export const AXIOS_FORM_DATA_OPTION_NOUSER = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
}

export const COOKIE_DOMAIN = "localhost";