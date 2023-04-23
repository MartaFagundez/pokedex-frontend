import styles from "../styles/components/CardsList.module.css";
import React from "react";
import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import listEmptyImg from "../images/emptyList.gif"
import { motion } from "framer-motion/dist/framer-motion";


const CardsList = () => {
    // LÓGICA DEL COMPONENTE
    // Se obtienen los pokemons del store
    const pokemons = useSelector((state) => state.pokemons);
    

    // RENDERIZADO DEL COMPONENTE
    // Si no hay pokemons, se muestra un mensaje
    if (!pokemons.length) {
        return (
            <div className={`${styles.container} ${styles.containerEmpty}`}>
                <div className={styles.imgContainer}>
                    <img src={listEmptyImg} alt="" />
                </div>
                <p>There are no Pokemon available.</p>
            </div>
        );
    };
    // Si hay pokemons, se renderizan las tarjetas
    return (
        <div className={styles.container}>
            <div className={styles.main}>
            {
                pokemons.map((pokemon, index) => (
                    <PokemonCard key={index} pokemon={pokemon} />
                ))
            }
            </div> 
        </div>
    );
}

export default CardsList;