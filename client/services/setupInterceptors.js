import axiosInstance from './instance';
import TokenService from "./token.service";
import {refreshToken} from './auth/auth';

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    const {dispatch} = store;
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            if (originalConfig.url !== '/auth/login' && err.response) {
                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await axiosInstance.post("/auth/token", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        });
                        const {accessToken} = rs.data;
                        dispatch(refreshToken(accessToken));
                        TokenService.updateLocalAccessToken(accessToken);
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);

        }
    );
}

export default  setup;