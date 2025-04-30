import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../comun/comun';

export const fetchComentarios = () => (dispatch) => {
    return fetch(baseUrl + 'comentarios')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comentarios => dispatch(addComentarios(comentarios)))
    .catch(error => dispatch(comentariosFailed(error.message)));
};

export const comentariosFailed = (errmess) => ({
    type: ActionTypes.COMENTARIOS_FAILED,
    payload: errmess
});

export const addComentarios = (comentarios) => ({
    type: ActionTypes.ADD_COMENTARIOS,
    payload: comentarios
});

export const fetchExcursiones = () => (dispatch) => {

    dispatch(excursionesLoading());

    return fetch(baseUrl + 'excursiones')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(excursiones => dispatch(addExcursiones(excursiones)))
    .catch(error => dispatch(excursionesFailed(error.message)));
};

export const excursionesLoading = () => ({
    type: ActionTypes.EXCURSIONES_LOADING
});

export const excursionesFailed = (errmess) => ({
    type: ActionTypes.EXCURSIONES_FAILED,
    payload: errmess
});

export const addExcursiones = (excursiones) => ({
    type: ActionTypes.ADD_EXCURSIONES,
    payload: excursiones
});

export const fetchCabeceras = () => (dispatch) => {
    
    dispatch(cabecerasLoading());

    return fetch(baseUrl + 'cabeceras')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(cabeceras => dispatch(addCabeceras(cabeceras)))
    .catch(error => dispatch(cabecerasFailed(error.message)));
};

export const cabecerasLoading = () => ({
    type: ActionTypes.CABECERAS_LOADING
});

export const cabecerasFailed = (errmess) => ({
    type: ActionTypes.CABECERAS_FAILED,
    payload: errmess
});

export const addCabeceras = (cabeceras) => ({
    type: ActionTypes.ADD_CABECERAS,
    payload: cabeceras
});

export const fetchActividades = () => (dispatch) => {
    
    dispatch(actividadesLoading());

    return fetch(baseUrl + 'actividades')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(actividades => dispatch(addActividades(actividades)))
    .catch(error => dispatch(actividadesFailed(error.message)));
};

export const actividadesLoading = () => ({
    type: ActionTypes.ACTIVIDADES_LOADING
});

export const actividadesFailed = (errmess) => ({
    type: ActionTypes.ACTIVIDADES_FAILED,
    payload: errmess
});

export const addActividades = (actividades) => ({
    type: ActionTypes.ADD_ACTIVIDADES,
    payload: actividades
});

export const postFavorito = (excursionId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorito(excursionId));
    }, 2000);
};

export const addFavorito = (excursionId) => ({
    type: ActionTypes.ADD_FAVORITO,
    payload: excursionId
});

export const postComentario = (excursionId, valoracion, autor, comentario) => (dispatch) => {
    
    function obtenerFecha() {
        const ahora = new Date();
        const milisegundos = ahora.getMilliseconds(); // Obtiene los milisegundos
        const microsegundosExtra = Math.floor(performance.now() % 1 * 1000); // Obtiene microsegundos adicionales
        const microsegundos = (milisegundos * 1000 + microsegundosExtra).toString().padStart(6, '0'); // Convierte a 6 dígitos
        return ahora.toISOString().replace(/\.\d{3}Z$/, `.${microsegundos}Z`);
    }
    
    dia = obtenerFecha();

    setTimeout(() => {
        dispatch(addComentario(excursionId, valoracion, autor, comentario, dia));
    }, 2000);
};

export const addComentario = (excursionId, valoracion, autor, comentario, dia) => ({
    type: ActionTypes.ADD_COMENTARIO,
    payload: {excursionId: excursionId, valoracion: valoracion, autor: autor, comentario: comentario, dia: dia}
});