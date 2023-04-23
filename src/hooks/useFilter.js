import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { updateFilters, updateFilterTypesStatus } from '../redux/actions';


// Hook personalizado para manejar el estado local de los filtros y aplicarlos al estado global
export const useFilter = () => {
    // A través de useDispatch se obtiene la referencia a la función "dispatch" del store de Redux para actualizar el estado global a través del despacho de acciones
    const dispatch = useDispatch();

    // Obtener el estado global de los filtros desde Redux
    let { filters } = useSelector((state) => state.filters, shallowEqual);
    const { filterName, filterTypes, filterId, filterTypesIsOn } = useSelector((state) => state.filters);
    const { inIdMode } = useSelector((state) => state.filterPanel);

    // Función para actualizar el estado global de los filtros antes de hacer la petición a la API mediante useFetch.
    const applyFilter = (newFilters) => {
        // Se actualizan los filtros locales con los nuevos valores
        filters = ({ ...filters, ...newFilters });
        // Se actualiza el estado global con los filtros usando la action updateFilters
        dispatch(updateFilters({...filters}));
    };

    const resetFilters = () => {
        console.log("1 - Dentro del resetFilters");
        let newFilters = ({ filterName: null, filterTypes: null, filterTypesIsOn: false, filterId: null });
        filters = ({ ...filters, ...newFilters });
        // Se resetean los filtros globales usando la action updateFilters
        dispatch(updateFilters({ ...filters}));
        console.log("2- Después del dispatch, filterTypes: " + filterTypes);
    };

    const applyFilterTypesStatus = (newStatus) => {
        // Se actualiza el estado global del estatus de la sección de filtrado por tipos ("on" u "off"), usando la action updateFilterTypesStatus
        newStatus ? dispatch(updateFilterTypesStatus({ filterTypesIsOn: true })) : dispatch(updateFilterTypesStatus({ filterTypesIsOn: false }));
    };
        

    // Se retorna el estado global y la función para aplicar los filtros
    return {
        filterName,
        filterTypes,
        filterTypesIsOn,
        inIdMode,
        filterId,
        applyFilter,
        resetFilters,
        applyFilterTypesStatus,
    };

};

// *************  WIKI  ********************************
/*
    En este hook personalizado, se mantiene el estado local para filterName y filterTypes, y se crea una función applyFilter que utiliza useCallback para actualizar el estado global de Redux con los valores de los filtros. Al utilizar este hook, los componentes podrán acceder y modificar el estado local de los filtros y aplicarlos al estado global de Redux.

    Por ejemplo, se pueden usar los valores de filterName y filterTypes para controlar inputs en un componente, y llamar a la función applyFilter cuando el usuario haga clic en un botón "Aplicar filtros" o cuando se produzca algún otro evento que desencadene la aplicación de los filtros en la lista de pokemons.
 */