import { useContext, useMemo } from 'react'
import AuthContext from "../Context/AuthContext/AuthContext";
import {createAxiosResponseInterceptor} from "./Axios";



const WithAxios = ({ children }) => {
    const auth = useContext(AuthContext);

    useMemo(() => {
        createAxiosResponseInterceptor(auth)
    }, [auth])

    return children
}

export default WithAxios
