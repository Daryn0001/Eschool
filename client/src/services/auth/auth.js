import {register, authenticateUser, logoutUser} from './authActions';
import * as AT from './authTypes';

export const refreshToken = (accessToken)  => (dispatch) => {
    dispatch({
        type: AT.REFRESH_TOKEN,
        payload: accessToken
    })
}

export const userRegister = (username, email, password, role) => (dispatch) => {
    return register(username, email, password, role).then(
        (response) => {
            dispatch({
                type: AT.REGISTER_SUCCESS
            });
            dispatch({
                type: AT.SET_MESSAGE,
                payload: response.data.message,
            });
            return Promise.resolve();
        },
        (error) => {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
            dispatch({
                type: AT.REGISTER_FAIL
            });
            dispatch({
                type: AT.SET_MESSAGE,
                payload: message
            });
            return Promise.reject();
        }
    );
};

export const userLogin = (email, password) => (dispatch) => {
    return authenticateUser(email, password)
        .then(
            (data) => {
                dispatch({
                    type: AT.LOGIN_SUCCESS,
                    payload: {user: data},
                });
                return Promise.resolve();
            },
            (error) => {
                const message =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                dispatch({
                    type: AT.LOGIN_FAIL,
                });
                dispatch({
                    type: AT.SET_MESSAGE,
                    payload: message,
                });
                return Promise.reject();
            }
        );
};

export const logout = () => (dispatch) => {
    logoutUser();
    dispatch({
        type: AT.LOGOUT_REQUEST,
    });
};