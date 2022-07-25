import { combineReducers } from "redux";
import studentReducer from './student/studentReduce';
import authReducer from './auth/authReducer';
import messageReducer from './auth/reducer/message';

const rootReducer = combineReducers({
    student: studentReducer,
    auth: authReducer,
    message : messageReducer
});

export default  rootReducer;