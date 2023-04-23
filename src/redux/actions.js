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
  
  export const updatePokemons = (payload) => ({
    type: UPDATE_POKEMONS,
    payload,
  });

  export const updatePokemonDetails = (payload) => ({
    type: UPDATE_POKEMON_DETAILS,
    payload,
  });
  
  export const updatePokemonTypes = (payload) => ({
    type: UPDATE_POKEMON_TYPES,
    payload,
  });
  
  export const updateFilters = (payload) => ({
    type: UPDATE_FILTERS,
    payload,
  });
  
  export const updateSorting = (payload) => ({
    type: UPDATE_SORTING,
    payload,
  });
  
  export const updatePagination = (payload) => ({
    type: UPDATE_PAGINATION,
    payload,
  });

  export const updateFilterPanel = (payload) => ({
    type: UPDATE_FILTER_PANEL,
    payload,
  });

  export const updateFilterTypesStatus = (payload) => ({
    type: UPDATE_FILTER_TYPES_STATUS,
    payload,
  });
  
  export const setLoading = (payload) => ({
    type: SET_LOADING,
    payload,
  });
  
  export const setError = (payload) => ({
    type: SET_ERROR,
    payload,
  });