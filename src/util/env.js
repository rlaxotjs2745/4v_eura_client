// 은진 매니저님 제공 api 테스트 서버

// export const SERVER_URL = "http://api.eura.site"
export const SERVER_URL = "http://localhost:10000"

// 팀장님 제공 api 테스트 서버
// export const SERVER_URL = "http://192.168.0.9:10000"

export const AXIOS_OPTION = {
    // headers: {
    //     "Set-Cookie": document.cookie
    // },
    withCredentials: true
};

export const AXIOS_FORM_DATA_OPTION = {
    headers: {
    "Content-Type": "multipart/form-data"
    },
    withCredentials: true
}

// export const COOKIE_DOMAIN = "eura.site";
export const COOKIE_DOMAIN = "localhost";