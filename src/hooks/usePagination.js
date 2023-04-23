import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { updatePagination } from "../redux/actions";
import { useFetch } from "./useFetch";

export const usePagination = () => {
    const dispatch = useDispatch();

    // Se obtienen los datos de paginación del store
    let { pagination } = useSelector((state) => state.pagination, shallowEqual);
    const { limit, offset, totalPages, currentPage, totalPokemons } = useSelector((state) => state.pagination);

    // Función para actualizar la paginación cuando se cambia de página
    const changePagination = (newPagination) => {
        if (newPagination) {
            // Se actualiza el estado local de la paginación con los nuevos datos
            pagination = {
                ...pagination, 
                ...newPagination, 
                // El número de página actual se re-calcula debido a que el offset cambió
                currentPage: Math.floor(newPagination.offset / limit) + 1,
            };
            // Se actualiza la paginación en el store
            dispatch(updatePagination({...pagination}));
        }
    };

    // Función para actualizar la paginación cuando se cambian las condicones de filtrado, búsqueda u ordenamiento
    const createPagination = (newTotalPokemons = totalPokemons) => {
        // Se actualiza el estado local de la paginación con los nuevos datos
        pagination = {
            ...pagination, 
            totalPokemons: newTotalPokemons,
            // Se cambia el offset a 0 y el número de página actual a 1 para ir al inicio de la lista
            offset: 0,
            currentPage: newTotalPokemons ? 1 : 0,
            totalPages: Math.ceil(newTotalPokemons / limit),
        };
        // Se actualiza la paginación en el store
        dispatch(updatePagination({...pagination}));
    };

    const resetPagination = () => {
        // Se actualiza el estado local de la paginación con los nuevos datos
        pagination = {
            ...pagination,
            // Se cambia el offset a 0 y el número de página actual a 1 para ir al inicio de la lista
            offset: 0,
            currentPage: 1,
            totalPages: Math.ceil(totalPokemons / limit),
        };
        // Se actualiza la paginación en el store
        dispatch(updatePagination({...pagination}));
    };

    // Se retornan los datos de la paginación global y la función para actualizarla
    return { 
        limit,
        offset,
        totalPages,
        currentPage,
        totalPokemons,
        changePagination,
        createPagination,
        resetPagination,
    };
};