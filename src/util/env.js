import {getCookie} from "./cookie";

export const SERVER_URL = "https" + "://api.eura.site"
// export const SERVER_URL = "http://localhost:10000"

export const AXIOS_OPTION = {
    headers: {
        "auth": getCookie('user_id'),
    }
};

export const AXIOS_FORM_DATA_OPTION = {
    headers: {
        "Content-Type": "multipart/form-data",
        "auth": getCookie('user_id')
    }
}

export const COOKIE_DOMAIN = "eura.site";
// export const COOKIE_DOMAIN = "localhost";