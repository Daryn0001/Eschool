import * as ST from './studentTypes';
import api from '../instance';


export const saveStudent = (student) => {
    return (dispatch) => {
        dispatch({
            type: ST.SAVE_STUDENT_REQUEST,
        });
        api
            .post("/pupil/add", student)
            .then((response) => {
                dispatch(studentSuccess(response.data));
            })
            .catch((error) => {
                dispatch(studentFailure(error));
            });
    };
};

export const deleteStudent = (studentId) => {
    return (dispatch) => {
        dispatch({
            type: ST.DELETE_STUDENT_REQUEST,
        });
        api
            .delete(`/pupil/${studentId}`)
            .then((response) => {
                dispatch(studentSuccess(response.data));
            })
            .catch((error) => {
               dispatch(studentFailure(error));
            });
    };
};

const studentSuccess = (student) => {
    return {
        type: ST.STUDENT_SUCCESS,
        payload: student,
    };
};

const studentFailure = (error) => {
    return {
        type: ST.STUDENT_FAILURE,
        payload: error,
    };
};