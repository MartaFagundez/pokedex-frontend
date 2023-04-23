import styles from "../styles/components/Pagination.module.css";
import React from "react";
import { usePagination } from "../hooks/usePagination";
import { useFetch } from "../hooks/useFetch";

import firstIcon from "../images/first.png";
import previousIcon from "../images/prev.png";
import nextIcon from "../images/next.png";
import lastIcon from "../images/last.png";


const Pagination = () => {
  // LÓGICA DEL COMPONENTE
  // Del hook useFetch obtenemos la función que usaremos para obtener los pokemons desde la API
  const { getPokemons } = useFetch();

  const { limit, offset, totalPages, currentPage, totalPokemons, changePagination } = usePagination();

  // Función para actualizar la página actual
  const handleChangePage = async (newOffset) => {
    // Obtener los pokemons de la nueva página
    await getPokemons({offset: newOffset});
  };

  // Funciones para manejar los botones de la paginación
  const handlePreviousPage = () => {
    // Si el offset es mayor o igual al límite, entonces se puede ir a la página anterior
    if (offset >= limit) {
      // Actualizar la página actual
      handleChangePage(offset - limit);
    };
  };

  const handleNextPage = () => {
    // Si el offset + el límite es menor al total de pokemons, entonces se puede ir a la página siguiente
    if (offset + limit < totalPokemons) {
      // Actualizar la página actual
      handleChangePage(offset + limit);
    };
  };

  const handleFirstPage = () => {
    // Si el offset es mayor o igual al límite, entonces se puede ir a la primera página
    if (offset >= limit) {
      // Actualizar la página actual
      handleChangePage(0);
    };
  };

  const handleLastPage = () => {
    // Si el offset + el límite es menor al total de pokemons, entonces se puede ir a la última página
    if (offset + limit < totalPokemons) {
      // Si el total de pokemons es múltiplo del límite...
      if (totalPokemons % limit === 0) {
        // Para ir a la última página, el offset debe ser igual al total de pokemons menos el límite
        handleChangePage(totalPokemons - limit);

      // Si el total de pokemons no es múltiplo del límite...
      } else {
        // Para ir a la última página, el offset debe ser igual al total de pokemons menos el resto de la división entre el total de pokemons y el límite
        handleChangePage(totalPokemons - (totalPokemons % limit));
      };
        
    };
  };


  // RENDERIZADO DEL COMPONENTE
  return (
    <div className={styles.container}>
      <button onClick={handleFirstPage} disabled={offset === 0}>
        <span><img src={firstIcon} alt="First page" title="First page" /></span>
      </button>
      <button onClick={handlePreviousPage} disabled={offset === 0}>
        <span><img src={previousIcon} alt="Previous page" title="Previous page" /></span>
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={offset + limit >= totalPokemons}>
        <span><img src={nextIcon} alt="Next page" title="Next page" /></span>
      </button>
      <button onClick={handleLastPage} disabled={offset + limit >= totalPokemons}>
        <span><img src={lastIcon} alt="Last page" title="Last page" /></span>
      </button>
    </div>
  );
};

export default Pagination;