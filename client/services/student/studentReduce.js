import * as ST from './studentTypes';

const initState = {student: "", error: ""};

const studentReduce = (state = initState, action) => {
    switch (action.type) {
        case ST.SAVE_STUDENT_REQUEST:
        case ST.DELETE_STUDENT_REQUEST:
            return {
            ...state,
        };
        case ST.STUDENT_SUCCESS:
            return {
                student: action.payload,
                error: ''
            };
        case ST.STUDENT_FAILURE:
            return {
                student: '',
                error: action.payload
            };
        default:
            return state;

    }
}

export default studentReduce;