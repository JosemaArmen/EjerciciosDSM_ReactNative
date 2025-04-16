import * as ActionTypes from './ActionTypes';

export const excursiones = (state = { isLoading: true,
                                 errMess: null,
                                 excursiones:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_EXCURSIONES:
            return {...state, isLoading: false, errMess: null, excursiones: action.payload};

        case ActionTypes.EXCURSIONES_LOADING:
            return {...state, isLoading: true, errMess: null, excursiones: []}

        case ActionTypes.EXCURSIONES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};