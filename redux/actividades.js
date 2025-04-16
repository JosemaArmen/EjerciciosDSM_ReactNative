import * as ActionTypes from './ActionTypes';

export const actividades = (state  = { isLoading: true,
                                    errMess: null,
                                    actividades:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ACTIVIDADES:
        return {...state, isLoading: false, errMess: null, actividades: action.payload};

        case ActionTypes.ACTIVIDADES_LOADING:
            return {...state, isLoading: true, errMess: null, actividades: []}

        case ActionTypes.ACTIVIDADES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};