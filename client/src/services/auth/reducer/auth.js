import * as AT from "../authTypes";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case AT.REGISTER_SUCCESS:
        case AT.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };

        case AT.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user,
            };
        case AT.LOGIN_FAIL:
        case AT.LOGOUT_REQUEST:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
}