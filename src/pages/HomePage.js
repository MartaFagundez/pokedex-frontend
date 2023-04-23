import styles from "../styles/pages/HomePage.module.css";
import resetFiltersIcon from "../images/icons/resetFilters_gray.png";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion/dist/framer-motion';

import { useFetch } from "../hooks/useFetch";
import { useFilter } from "../hooks/useFilter";
import { useSort } from "../hooks/useSort";
import { usePagination } from "../hooks/usePagination";
import { updateFilterPanel } from "../redux/actions";

import Header from "../components/Header";
import CardsList from "../components/CardsList";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Sort from "../components/Sort";


// Variantes de animación para el panel de filtros
const panel = {
    hidden: {
        x: "-50vw",
    },
    visible: {
        x: 0,
        transition: {
            duration: 0.5,
        }
    }
};


const HomePage = () => {
    // LÓGICA DEL COMPONENTE
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Se obtiene la función para solicitar pokemons desde la API y actualizar el estado global
    const { getPokemons } = useFetch();
    // Se obtienen las variables y funciones para manejar los filtros del estado global
    const { filterName, filterId, filterTypes, resetFilters } = useFilter();
    // Se obtiene la función para hacer un reset al ordenamiento del estado global
    const { resetSorting } = useSort();
    // Se obtiene el offset del estado global y la función para resetear la paginación del estado global
    const { offset, resetPagination } = usePagination();
    // Se obtiene el estado del panel de filtros del store
    const { isOpen, inIdMode } = useSelector((state) => state.filterPanel);
    // Se obtiene el array de pokemons del store
    const pokemons = useSelector((state) => state.pokemons);

    // Función para actualizar el estado del panel de filtros
    const handleFiltersVisibility = () => {
        dispatch(updateFilterPanel({ isOpen: !isOpen }));
    };

    //Función para navegar a la ruta de creación de pokemons
    const handleOpenCreateForm = () => {
        navigate("/pokemon/create");
    };

    // Función para resetear todos los filtros y ordenamientos y solicitar los pokemons desde la API
    const handleResetAllFilters = async () => {
        resetFilters();
        resetSorting();
        dispatch(updateFilterPanel({ isOpen: false, inIdMode: false}));
        resetPagination();
        await getPokemons({offset: 0});
    };


    //Se ejecuta la función para solicitar pokemons desde la API luego de montarse el componente
    useEffect (() => {
        if((!pokemons.length && !filterName && !filterId && !filterTypes)) {
            getPokemons({offset: 0});
        }
    }, []);

    // Se ejecuta la función para solicitar pokemons desde la API cuando se cierra el panel de filtros
    useEffect (() => {
        if (!isOpen) {
            getPokemons({offset});
        }
    }, [isOpen]);


    // Renderizado del componente
    return (
        <motion.div className={styles.container} >
            {// PANEL DE FILTROS
                // Renderizado condicional del panel de filtros
                isOpen &&
                <motion.div className={styles.filterPanel}
                    variants={panel}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Header del panel de filtros */}
                    <div className={styles.panelHeader}>
                        <h2>Filters and Sorting</h2>
                        <button title="Reset All and Close Panel" >
                            <span><img src={resetFiltersIcon} alt="Reset Filters icon" onClick={handleResetAllFilters}/></span>
                        </button>
                    </div>
                    <hr />

                    {/* SearchBar del panel de filtros */}
                    <SearchBar />

                    {/* Filter del panel de filtros */
                        !inIdMode && <Filter />
                    }

                    {/* Sort del panel de filtros */
                        !inIdMode && <Sort />
                    }
                </motion.div>
            }
            
            {/* PANEL PPAL DEL HOME */}
            <div className={styles.main}>
                {/* Header del home */}
                <Header onClickFilterButton={handleFiltersVisibility} onClickResetFilterButton={handleResetAllFilters} onClickCreateButton={handleOpenCreateForm} />

                {/* CardsList y Pagination */}
                <div className={styles.cardsContainer}>
                    <CardsList />
                    <Pagination />
                </div>
            </div>
        </ motion.div>
    );
};

export default HomePage;