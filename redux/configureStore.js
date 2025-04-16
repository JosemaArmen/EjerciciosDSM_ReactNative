import { configureStore } from '@reduxjs/toolkit'
import { excursiones } from './excursiones';
import { comentarios } from './comentarios';
import { cabeceras } from './cabeceras';
import { actividades } from './actividades';

export const ConfigureStore = () => {
    const store = configureStore({
        reducer: {
            excursiones: excursiones,
            comentarios: comentarios,
            cabeceras: cabeceras,
            actividades: actividades,
        },
    });

    return store;
}