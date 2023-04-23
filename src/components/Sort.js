import styles from "../styles/components/Sort.module.css";
import asc from "../images/icons/sortAsc.png";
import desc from "../images/icons/sortDesc.png";
import React from "react";
import { useSort } from "../hooks/useSort";
import { useFetch } from "../hooks/useFetch";

const Sort = () => {
    const { getPokemons } = useFetch();
    const { sortBy, sortOrder, applySort } = useSort();


  const handleSortByChange = (e) => {
    const newSortBy = e.target.value;
    applySort({sortBy: newSortBy});
    getPokemons({ sortBy: newSortBy, offset: 0 });
  };

  const handleSortOrderChange = () => {
        if (sortOrder === "asc") {
            applySort({sortOrder: "desc"});
            getPokemons({ sortOrder: "desc", offset: 0});
        } else {
            applySort({sortOrder: "asc"});
            getPokemons({ sortOrder: "asc", offset: 0 });
        }
    };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label className={styles.title} htmlFor="sorter">Sort by</label>
      </div>

      <div className={styles.main}>
        <select
            name="sorter"
            value={sortBy}
            onChange={handleSortByChange}
        >
            <option value="name">Pokemon Name</option>
            <option value="id">Pokemon ID</option>
        </select>
        <button onClick={ handleSortOrderChange }>{
          sortOrder === "asc" ? <span title="Ascending Sort"><img src={asc} alt="Ascending Sort" /></span> 
                              : <span title="Descending Sort"><img src={desc} alt="Descending sort" /></span>
        }
        </button>
      </div>
    </div>
    
  );
};

export default Sort;