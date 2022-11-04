const isLogin = () => {
    return !!localStorage.getItem("isLogin");
};

export default isLogin;