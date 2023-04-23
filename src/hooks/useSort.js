import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { updateSorting } from '../redux/actions';

// Hook personalizado para manejar el estado local del ordenamiento y aplicarlo al estado global
export const useSort = () => {
    // A través de useDispatch se obtiene la referencia a la función "dispatch" del store de Redux para actualizar el estado global a través del despacho de acciones
    const dispatch = useDispatch();

    // Obtener el estado global del ordenamiento desde Redux
    let { sorting } = useSelector((state) => state.sorting, shallowEqual);
    const { sortBy, sortOrder } = useSelector((state) => state.sorting);


    // Función para aplicar el ordenamiento al estado global
    const applySort = (newSorting) => {
        // Se actualiza el ordenamiento local con los nuevos valores
        sorting = ({ ...sorting, ...newSorting });
        // Se actualiza el ordenamiento global con el ordenamiento local 
        dispatch(updateSorting({ ...sorting }));
    };

    const resetSorting = () => {
        // Se resetean los filtros globales usando la action updateFilters
        dispatch(updateSorting({ sortBy: "id", sortOrder: "asc" }));
    };

    // Se retorna el ordenamiento global y la función para aplicar el ordenamiento
    return {
        sortBy,
        sortOrder,
        applySort,
        resetSorting
    };
};

// *************  WIKI  ********************************
/*
 En este hook personalizado, se mantiene el estado local para sortBy y sortOrder, y se crea una función applySort que utiliza useCallback para actualizar el estado global de Redux con los valores de ordenamiento. Al utilizar este hook, los componentes podrán acceder y modificar el estado local de ordenamiento y aplicarlo al estado global de Redux.

 Por ejemplo, se pueden usar los valores de sortBy y sortOrder para controlar inputs en un componente, y llamar a la función applySort cuando el usuario seleccione una opción de ordenamiento o cuando se produzca algún otro evento que desencadene la aplicación del ordenamiento en la lista de pokemons.
 */