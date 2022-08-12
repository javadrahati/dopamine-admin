import React  from "react";

const AuthContext = React.createContext({
    hasToken : false,
    userInfo: {},
    setAuth : (token, user)=>{},
    clearAuth: ()=>{},
})

export default AuthContext;
