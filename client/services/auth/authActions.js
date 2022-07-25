import * as AT from "./authTypes";
import axios from "axios";
import TokenService from '../token.service';

const API_URL = "http://localhost:8080/api/auth";


export const register = (name, email, password, role) => {
    return axios.post(API_URL + '/signup', {
        name, email, password, role
    });
};

export const authenticateUser = (email, password) => {
    const credentials = {
        email: email,
        password: password
    };

    return dispatch => {
        dispatch({
            type: AT.LOGIN_REQUEST
        });
        axios.post(API_URL + '/login', credentials)
            .then(response => {
                if(response.data.accessToken){
                    TokenService.setUser(response.data);
                }
                dispatch(success(true));
                return response.data;
            })
            .catch(() => {
                dispatch(failure());
            });
    };
};

export const logoutUser = () => {
    TokenService.removeUser();
};

export const setMessage = (message) => ({
    type: AT.SET_MESSAGE,
    payload: message,
});
export const clearMessage = () => ({
    type: AT.CLEAR_MESSAGE,
});


const success = isLoggedIn => {
    return {
        type: AT.SUCCESS,
        payload: isLoggedIn,
    };
};

const failure = () => {
    return {
        type: AT.FAILURE,
        payload: false,
    };
};