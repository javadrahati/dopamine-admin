import axios from "axios";
import Config from "../../config/Config";

export const AUTH_REFRESH_URL = "auth/refresh";

const Axios = axios.create({
    baseURL : Config.api_base_url,
})

Axios.interceptors.request.use(config => {
    config.headers.platform = "web"
    config.headers.Authorization =  "Bearer " + localStorage.getItem("token")
    return config
});

export function createAxiosResponseInterceptor(auth) {
    console.log("Interceptor => creating interceptor");
    const interceptor = Axios.interceptors.response.use(
        response => response,
        error => {
            const originalRequest = error.config;
            console.log(originalRequest)

            if(!auth.hasToken) {
                console.log("Interceptor => without token -> reject");
                return Promise.reject(error)
            }

            const status = error.response.status || 400
            // Reject promise if usual error
            if(status !== 401) {
                console.log("Interceptor => status = " + status + " -> reject");
                return Promise.reject(error)
            }

            if(status === 401 && originalRequest.url === AUTH_REFRESH_URL) {
                auth.clearAuth();
                return Promise.reject(error);
            }


            console.log("Interceptor => status = 401 -> refresh");
            /*
            * When response code is 401, try to refresh the token.
            * Eject the interceptor so it doesn't loop in case
            * token refresh causes the 401 response
            */
            console.log("Interceptor => ejecting interceptor = " + interceptor);
            Axios.interceptors.response.eject(interceptor);

            return Axios.post('auth/refresh')
                .then(res => {
                    auth.setAuth(res.data.token, res.data.user)
                    return Axios(originalRequest)
                })
                .catch(error => {
                    auth.clearAuth()
                    return Promise.reject(error);
                })
                .finally(createAxiosResponseInterceptor);
        }
    );
    console.log("Interceptor => created => " + interceptor);
}


export default Axios
