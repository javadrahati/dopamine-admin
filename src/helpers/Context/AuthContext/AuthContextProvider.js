import React, {useEffect, useState} from "react";
import AuthContext from './AuthContext';

const AuthContextProvider = (props) =>{

    const [hasToken, setHasToken] = useState(localStorage.getItem("token") !== "")
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        try {
            let str = localStorage.getItem("userInfo");
            if(str && str !== "")
                setUserInfo( JSON.parse(str) )

        } catch (e) {}
        return ()=>{}
    }, [])

    const auth =  (token, user = undefined) => {
        localStorage.setItem("token", token)
        localStorage.setItem("userInfo", JSON.stringify(user))
        setHasToken(token !== undefined && token !== "")
        setUserInfo(user)
    }

    const clear = () => {
        localStorage.setItem("token", "")
        localStorage.removeItem("userInfo")
        setHasToken(false)
        setUserInfo(null)
    }

    return(
        <AuthContext.Provider
            value ={{
                hasToken : hasToken,
                userInfo: userInfo,
                setAuth : auth,
                clearAuth : clear,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider
