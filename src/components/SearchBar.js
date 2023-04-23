import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFilter } from "../hooks/useFilter";
import { useFetch } from "../hooks/useFetch";
import { useSort } from "../hooks/useSort";
import { updateFilterPanel } from "../redux/actions";
import styles from "../styles/components/SearchBar.module.css";

import searchIcon from "../images/icons/search_gray.png";

const SearchBar = () => {
    // LÓGICA DEL COMPONENTE
    const dispatch = useDispatch();
    // Obtener los métodos de useFetch para poder hacer fetch de los pokemons
    const { getPokemons, getPokemon } = useFetch();

    // Obtener el método de useFilter para poder actualizar el estado global de los filtros por nombre y por id
    const { inIdMode, filterId, filterName, applyFilter, resetFilters } = useFilter();
    // Obtener el método de useSort para poder actualizar el estado global del ordenamiento (para el caso de buscar por id, ya que hay que actualizarlo a sus valores por defecto)
    const { resetSorting } = useSort();

    // Estado local para el término de búsqueda
    const [searchTerm, setSearchTerm ] = useState( inIdMode ? filterId : filterName );
    // Estado local para el atributo por el que se va a buscar
    const [searchAttribute, setSearchAttribute ] = useState(inIdMode ? "id" : "name");

    // Manejador del evento de submit del formulario
    const handleSearch = async (e) => {
        e.preventDefault();
        // Si el atributo de búsqueda es "name", se hace fetch de los pokemons que coincidan con el término de búsqueda
        if (searchAttribute === "name") {
            applyFilter({ filterName: searchTerm });
            await getPokemons({ filterName: searchTerm, offset: 0 });

        // Si el atributo de búsqueda es "id", se hace fetch del pokemon que coincida con el término de búsqueda
        } else {
            applyFilter({ filterId: searchTerm });
            await getPokemon(searchTerm);
        }
    };

    // Manejador del evento de cambio de atributo de búsqueda
    const handleAttributeChange = async (e) => {
        // Setear el atributo de búsqueda en el estado local
        setSearchAttribute(e.target.value);
        // Si el atributo por el cual buscar es "id"...
        if (e.target.value === "id") {
            // Setear el estado global del panel de filtros en modo "id"
            dispatch(updateFilterPanel({ inIdMode: true }));
            /* Esto va a hacer que el componente de filtrado por tipo y el compoenente de ordenamiento se oculten debido a que no son necesarios para el caso de buscar por id (ya que sólo se va a renderizar un único pokemon)
            */
            // Setear los filtros por nombre y por id globales en null
            resetFilters();
            // Setear el ordenamiento global en sus valores por defecto
            resetSorting();
            // Setear el término de búsqueda local al filtro por id global
            setSearchTerm(filterId);
            await getPokemons({offset: 0});
        } else {
            // Quitar el modo "id" del estado global del panel de filtros
            dispatch(updateFilterPanel({ inIdMode: false }));
            // Setear el filtro por id global en null
            applyFilter({ filterId: null });
            // Limpiar el estado local del término de búsqueda
            setSearchTerm(filterName);
            await getPokemons({offset: 0});
        }   
    };


    // RENDERIZADO DEL COMPONENTE
    return (
        <form className={styles.container} onSubmit={handleSearch}>
            <div className={styles.header}>
                <label className={styles.title} htmlFor="searchBar">Search by</label>
                <div className={styles.radioContainer}>
                    <input 
                        type="radio" 
                        id="name" 
                        name="searchAttribute" 
                        value="name" 
                        title="Search by name"
                        checked={searchAttribute === "name"}
                        onChange={handleAttributeChange}            
                    />
                    <label htmlFor="name">Name</label>

                    <input 
                        type="radio" 
                        id="id" 
                        name="searchAttribute" 
                        value="id" 
                        title="Search by id"
                        checked={searchAttribute === "id"} 
                        onChange={handleAttributeChange}
                    />
                    <label htmlFor="id">ID</label>
                </div>
            </div>

            <div className={styles.main}>
                <input 
                    name="searchBar"
                    type="text" 
                    placeholder="Search Pokémon..." 
                    value={searchTerm ? searchTerm : ""} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button className={styles.searchButton} type="submit" title="Search" >
                    <span><img src={searchIcon} alt="Reset Filters icon" /></span>
                </button>
            </div>
        </form>
    );
};

export default SearchBar;