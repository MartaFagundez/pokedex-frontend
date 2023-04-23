import { useDispatch, useSelector } from "react-redux";
import { 
    updatePokemons,
    updatePokemonDetails,
    updatePokemonTypes,
    setLoading,
    setError,
} from "../redux/actions";
import { 
    fetchPokemons, 
    fetchPokemonById, 
    fetchPokemonsTypes, 
    createPokemon as createPokemonAPI } from "../api/pokemonAPI";
import { usePagination } from './usePagination';


// Hook personalizado para manejar las peticiones a la API (el servidor del backend en este caso), actualizar el estado global y manejar los errores vinculados a estas peticiones
export const useFetch = () => {
    const dispatch = useDispatch();
    // Obtener los datos del estado global que se necesitan para hacer las peticiones a la API
    const { filterTypes, filterName} = useSelector((state) => state.filters);
    const { sortOrder, sortBy } = useSelector((state) => state.sorting);
    const { limit, offset, currentPage } = useSelector((state) => state.pagination);
    const { changePagination, createPagination } = usePagination();

    // Parámetros de la petición a la API
    let params = {filterTypes, filterName, sortOrder, sortBy, limit, offset };


    // Función para obtener la lista de pokemons desde la API y actualizar el estado global
    const getPokemons = async (newParams={}) => {
        // Si se pasan parámetros nuevos, se actualizan los parámetros de la petición a la API
        params = ({ ...params, ...newParams });

        try {
            // Actualizar el estado global para indicar que se está cargando la lista de pokemons
            dispatch(setLoading({ isLoadingPokemons: true }));

            
            // Si se cambian las condiciones de filtrado o se pide la primera página de la lista...
            if (params.offset === 0) {
                // Obtener la lista de pokemons desde la API
                const { numTotalFilteredPokemons, pokemons} = await fetchPokemons(params);
                // Se crea una nueva paginación
                createPagination(numTotalFilteredPokemons);
                // Actualizar el estado global con la lista de pokemons obtenida desde la API
                dispatch(updatePokemons({ pokemons }));

            // Si se cambia la pagina actual...
            } else {
                // Se actualiza la paginación
                changePagination({ offset: params.offset, currentPage: params.currentPage });
                // Obtener la lista de pokemons desde la API
                const { pokemons } = await fetchPokemons(params);
                // Actualizar el estado global con la lista de pokemons obtenida desde la API
                dispatch(updatePokemons({ pokemons }));
            }

        } catch (error) {
            // Actualizar el estado global con el mensaje de error
            dispatch(setError({ pokemons: error.message }));
        } finally {
            // Actualizar el estado global para indicar que ya se cargó la lista de pokemons
            dispatch(setLoading({ isLoadingPokemons: false }));
        }
    };

    // Función para obtener un pokemon desde la API según su id y actualizar el estado global
    const getPokemon = async (id) => {
        try {
            // Actualizar el estado global para indicar que se está cargando la lista de pokemons 
            dispatch(setLoading({ isLoadingPokemons: true }));
            // Actualizar el estado global con la cantidad total de pokemons obtenida desde la API
            createPagination(1);
            // Obtener el pokemon desde la API
            const pokemon = await fetchPokemonById(id);
            // Actualizar la lista de pokemons del esta global con el pokemon obtenido desde la API
            dispatch(updatePokemons({ pokemons: [pokemon] }));

        } catch (error) {
            // Actualizar el estado global con el mensaje de error
            dispatch(setError({ pokemons: error.message }));
            if (error.message === "Not Found") {
                dispatch(updatePokemons({ pokemons: [] }));
            }
        } finally {
            // Actualizar el estado global para indicar que ya se cargó la lista de pokemons
            dispatch(setLoading({ isLoadingPokemons: false }));
        }
    };

    // Función para obtener un pokemon desde la API según su id y actualizar el estado global de los detalles del pokemon
    const getPokemonDetail = async (id) => {
        try {
            // Actualizar el estado global para indicar que se está cargando el detalle del pokemon 
            dispatch(setLoading({ isLoadingPokemonDetail: true }));
            // Obtener el pokemon desde la API
            const pokemon = await fetchPokemonById(id);
            // Actualizar el estado global con el detalle del pokemon obtenido desde la API      
            dispatch(updatePokemonDetails({ pokemonDetails: pokemon }));

        } catch (error) {
            // Actualizar el estado global con el mensaje de error
            dispatch(setError({ pokemons: error.message }));
        } finally {
            // Actualizar el estado global para indicar que ya se cargó la lista de pokemons
            dispatch(setLoading({ isLoadingPokemonDetail: false }));
        }
    };

    const clearPokemonDetails = () => {
        try {
            dispatch(updatePokemonDetails({ pokemonDetails: {} }));
        } catch (error) {
            throw new Error(error);
        }
    };



    // Función para obtener la lista de tipos de pokemons desde la API y actualizar el estado global
    const getPokemonsTypes = async () => {
        try {
            // Actualizar el estado global para indicar que se está cargando la lista de tipos de pokemons
            dispatch(setLoading({ isLoadingPokemonsTypes: true }));
            // Obtener la lista de tipos de pokemons desde la API
            const pokemonsTypes = await fetchPokemonsTypes();
            // Actualizar el estado global con la lista de tipos de pokemons obtenida desde la API
            dispatch(updatePokemonTypes({ pokemonsTypes }));

        } catch (error) {
            // Actualizar el estado global con el mensaje de error
            dispatch(setError({ pokemonsTypes: error.message }));
        } finally {
            // Actualizar el estado global para indicar que ya se cargó la lista de tipos de pokemons
            dispatch(setLoading({ isLoadingPokemonsTypes: false }));
        }
    };


    // Función para crear un nuevo pokemon y actualizar el estado global
    const createPokemon = async (pokemonData) => {
        try {
            // Actualizar el estado global para indicar que se está creando un nuevo pokemon
            dispatch(setLoading({ isCreatingPokemon: true }));
            // Crear el nuevo pokemon usando la API
            const pokemon = await createPokemonAPI(pokemonData);
            // Retorna el pokemon creado para manejar la respuesta en el componente
            return pokemon;
            
        } catch (error) {
            // Actualizar el estado global con el mensaje de error
            dispatch(setError({ pokemons: error.message }));
            throw error;
        } finally {
            // Actualizar el estado global para indicar que ya se terminó de crear el nuevo pokemon
            dispatch(setLoading({ isCreatingPokemon: false }));
        }
    };

    // Retornar las funciones para obtener los datos desde la API
    return {
        getPokemons,
        getPokemon,
        getPokemonDetail,
        clearPokemonDetails,
        getPokemonsTypes,
        createPokemon,
    };
};

// *************  WIKI  ********************************
/* 
El hook personalizado useFetch se encarga de realizar las peticiones a la API y actualizar el estado global de Redux, manteniendo la lógica de la interacción con la API y el manejo del estado separados de los componentes de la aplicación.

En este caso, se utilizan tres funciones para obtener los datos desde la API, una para cada tipo de datos que se manejan en la aplicación (lista de pokemons, detalles de un pokemon y lista de tipos de pokemons). Cada una de estas funciones realiza una petición a la API, actualiza el estado global de Redux y maneja los errores que puedan surgir durante la petición.

Este hook puede ser importado en los componentes CardsList (para obtener la lista de pokemons), PokemonDetails (para obtener los detalles del pokemon) y Filter (para obtener los tipos de pokemons existentes), por ejemplo.
*/