import * as ActionTypes from './ActionTypes';

export const favoritos = (state = { favoritos: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FAVORITO:
            const exists = state.favoritos.some(favorito => favorito === action.payload);
            if (exists) {
                return state;
            } else {
                return { ...state, favoritos: state.favoritos.concat(action.payload) };
            }
        default:
            return state;
    }
}