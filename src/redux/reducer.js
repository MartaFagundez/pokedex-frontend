// Importar los tipos de acciones
import {
    UPDATE_POKEMONS,
    UPDATE_POKEMON_DETAILS,
    UPDATE_POKEMON_TYPES,
    UPDATE_FILTERS,
    UPDATE_SORTING,
    UPDATE_PAGINATION,
    UPDATE_FILTER_PANEL,
    UPDATE_FILTER_TYPES_STATUS,
    SET_LOADING,
    SET_ERROR,
  } from './actionTypes';


// Setear el estado inicial de la store
const initialState = {
    pokemons: [],
    pokemonDetails: {},
    pokemonsTypes: [],
    filterPanel: {
        isOpen: false,
        inIdMode: false,
    },
    filters: {
        filterTypes: null,
        filterTypesIsOn: false,
        filterName: null,
        filterId: null,
    },
    sorting: {
        sortOrder: "asc",
        sortBy: "id"
    },
    pagination: {
        limit: 12,
        offset: 0,
        totalPages: 0,
        currentPage: 0,
        totalPokemons: 0
    },
    loading: {
        isLoadingPokemons: false,
        isLoadingPokemonDetail: false,
        isLoadingPokemonsTypes: false,
        isCreatingPokemon: false,
    },
    error: {
        errorMessage: ""
    }
};


// Definir el reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POKEMONS:
            return { 
                ...state, 
                pokemons: action.payload.pokemons 
            };
        case UPDATE_POKEMON_DETAILS:
            return {
                ...state,
                pokemonDetails: action.payload.pokemonDetails
            };
        case UPDATE_POKEMON_TYPES:
            return { 
                ...state, 
                pokemonsTypes: action.payload.pokemonsTypes 
            };
        case UPDATE_FILTERS:
            return { 
                ...state, 
                filters: { ...state.filters, ...action.payload } 
            };
        case UPDATE_SORTING:
            return { 
                ...state, 
                sorting: { ...state.sorting, ...action.payload } 
            };
        case UPDATE_PAGINATION:
            return {
                ...state,
                pagination: { ...state.pagination, ...action.payload },
            };
        case UPDATE_FILTER_PANEL:
            return {
                ...state,
                filterPanel: { ...state.filterPanel, ...action.payload },  
            };
        case UPDATE_FILTER_TYPES_STATUS:
            return {
                ...state,
                filters: { ...state.filters, ...action.payload },
            };
        case SET_LOADING:
            return { 
                ...state, 
                loading: { ...state.loading, ...action.payload } 
            };
        case SET_ERROR:
            return { 
                ...state, 
                error: { ...state.error, ...action.payload } 
            };
        default:
            return state;
    }
};

export default reducer;