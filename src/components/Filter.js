import styles from "../styles/components/Filter.module.css";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useFilter } from "../hooks/useFilter";
import { useFetch } from "../hooks/useFetch";

const Filter = () => {
    // LÓGICA DEL COMPONENTE
    // Se obtienen las funciones para solicitar pokemons y tipos de pokemons desde la API y actualizar el estado global
    const { getPokemons, getPokemonsTypes } = useFetch();
    // Se obtiene el objeto filterTypes del store y la función para actualizar el estado de los filtros
    const { filterTypes, filterTypesIsOn, applyFilter, applyFilterTypesStatus } = useFilter();
    // Se obtiene la función para actualizar la paginación
    // Se obtienen los tipos de pokemons del store
    const pokemonsTypes = useSelector((state) => state.pokemonsTypes);

    // Se crea un estado local para los tipos de pokemons seleccionados
    const [ selectedTypes, setSelectedTypes ] = useState(
        // Si hay tipos de pokemons seleccionados en el store, se asignan al estado local
        filterTypes ? [...filterTypes] : [] );

    // Se crea un estado local para el estado del filtro por tipos de pokemons
    const [ filterByTypesStatus, setFilterByTypesStatus ] = useState(filterTypesIsOn);

    // Referencia para saber si es la primera vez que se renderiza el componente
    const isInitialMount = useRef(true);


    useEffect(() => {
        // Si es la primera vez que se renderiza el componente...
        if (isInitialMount.current) {
            // Obtener los tipos de pokemons desde la API y guardarlos en el store
            getPokemonsTypes();
            // Se actualiza la referencia para que no se vuelva a ejecutar este bloque de código
            isInitialMount.current = false;

        // Si se actualiza el estado de selectedTypes...
        } else {
            // Actualizar el estado de la store con los tipos de pokemons seleccionados
            applyFilter(selectedTypes.length ? {filterTypes: selectedTypes} : {filterTypes: null});
            // Obtener los pokemons desde la API con el nuevo filtrado y paginado
            getPokemons({filterTypes: selectedTypes, offset: 0});
        }
    }, [selectedTypes, filterByTypesStatus]);
    

    const handleTypeChange = (type) => {
        const newSelectedTypes = selectedTypes.includes(type) 
            // Si el tipo de pokemon ya está seleccionado, se deselecciona
            ? selectedTypes.filter((t) => t !== type) 
            // Si el tipo de pokemon no está seleccionado, se selecciona
            : [...selectedTypes, type]
        ;
        // Se actualiza el estado local de los tipos de pokemons seleccionados
        setSelectedTypes([...newSelectedTypes]);
    };

    const handleUnselectAll = () => {
        // Deseleccionar todos los tipos de pokemons
        setSelectedTypes([]);
    };

    const handleFilterTypesStatus = () => {
        setFilterByTypesStatus(!filterByTypesStatus);
        applyFilterTypesStatus(!filterByTypesStatus);
        setSelectedTypes([]);
    };


    // RENDERIZADO DEL COMPONENTE
    return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h3 className={styles.title}>Filter by Types</h3>
            <div className={styles.radioContainer}>
                <input 
                    type="radio" 
                    id="off" 
                    name="filterByTypesStatus" 
                    value="off"  
                    title= "Disable filtering by types"
                    checked={!filterByTypesStatus}
                    onChange={handleFilterTypesStatus}            
                />
                <label htmlFor="off">off</label>

                <input 
                    type="radio" 
                    id="on" 
                    name="filterByTypesStatus" 
                    value="on" 
                    title= "Enable filtering by types"
                    checked={filterByTypesStatus} 
                    onChange={handleFilterTypesStatus}
                />
                <label htmlFor="on">on</label>
            </div>
        </div>


      {
        filterByTypesStatus &&
        <div className={styles.main}>
            <div className={styles.checksContainer}>
                {
                    pokemonsTypes.map((type) => (
                        <div key={type}>
                            <label htmlFor={type}
                                className={`${type}`}
                            >
                            <input
                                type="checkbox"
                                id={type}
                                name={type}
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleTypeChange(type)}
                            />
                            {type}</label>
                        </div>
                    ))
                }
            </div>
            <button onClick={handleUnselectAll} disabled={selectedTypes.length ? false : true}>
                Unselect All
            </button>
        </div>
      }
    </div>
    );
};

export default Filter;