import React from "react";
import styles from "../styles/components/PokemonCard.module.css";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import pk0 from "../images/pk0.png";
import bugIcon from "../images/icons/bugIcon.png";
import darkIcon from "../images/icons/darkIcon.png";
import dragonIcon from "../images/icons/dragonIcon.png";
import electricIcon from "../images/icons/electricIcon.png";
import fairyIcon from "../images/icons/fairyIcon.png";
import fightIcon from "../images/icons/fightIcon.png";
import fireIcon from "../images/icons/fireIcon.png";
import flyingIcon from "../images/icons/flyingIcon.png";
import ghostIcon from "../images/icons/ghostIcon.png";
import grassIcon from "../images/icons/grassIcon.png";
import groundIcon from "../images/icons/groundIcon.png";
import iceIcon from "../images/icons/iceIcon.png";
import normalIcon from "../images/icons/normalIcon.png";
import poisonIcon from "../images/icons/poisonIcon.png";
import psychicIcon from "../images/icons/psychicIcon.png";
import rockIcon from "../images/icons/rockIcon.png";
import steelIcon from "../images/icons/steelIcon.png";
import waterIcon from "../images/icons/waterIcon.png";


export default function PokemonCard({ pokemon }) {
    // Lógica del componente
    const navigate = useNavigate();
    const { getPokemonDetail } = useFetch();

    const handleOpenDetails = async () => {
        await getPokemonDetail(pokemon.id);
        navigate(`/pokemon/${pokemon.id}`);
    };

    // Renderizado del componente
    return (
        <div className={
            pokemon.types[0] === "bug" ? `${styles.container} ${styles.bug}` :
            pokemon.types[0] === "dark" ? `${styles.container} ${styles.dark}` :
            pokemon.types[0] === "dragon" ? `${styles.container} ${styles.dragon}` :
            pokemon.types[0] === "electric" ? `${styles.container} ${styles.electric}` :
            pokemon.types[0] === "fairy" ? `${styles.container} ${styles.fairy}` :
            pokemon.types[0] === "fighting" ? `${styles.container} ${styles.fight}` :
            pokemon.types[0] === "fire" ? `${styles.container} ${styles.fire}` :
            pokemon.types[0] === "flying" ? `${styles.container} ${styles.flying}` :
            pokemon.types[0] === "ghost" ? `${styles.container} ${styles.ghost}` :
            pokemon.types[0] === "grass" ? `${styles.container} ${styles.grass}` :
            pokemon.types[0] === "ground" ? `${styles.container} ${styles.ground}` :
            pokemon.types[0] === "ice" ? `${styles.container} ${styles.ice}` :
            pokemon.types[0] === "normal" ? `${styles.container} ${styles.normal}` :
            pokemon.types[0] === "poison" ? `${styles.container} ${styles.poison}` :
            pokemon.types[0] === "psychic" ? `${styles.container} ${styles.psychic}` :
            pokemon.types[0] === "rock" ? `${styles.container} ${styles.rock}` :
            pokemon.types[0] === "steel" ? `${styles.container} ${styles.steel}` :
            pokemon.types[0] === "water" ? `${styles.container} ${styles.water}` :
            `${styles.container} ${styles.normal}`
        } onClick={handleOpenDetails} >

            <div className={styles.imageContainer}>
                <img src={pokemon.image ? pokemon.image : pk0} alt={pokemon.name} />
            </div>

            <div className={styles.infoContainer}>
                <h2 className={styles.id} >
                    {
                        pokemon.id < 10 ? `#000${pokemon.id}` : pokemon.id < 100 ? `#00${pokemon.id}` : pokemon.id < 1000 ? `#0${pokemon.id}` : `#${pokemon.id}`
                    }</h2>
                <h2 className={
                    pokemon.name.length > 20 ? styles.nameExtraLong 
                    : pokemon.name.length > 13 ? styles.nameLong : styles.name
                }>{pokemon.name}</h2>
            </div>

            <div className={styles.typesContainer}>
                {
                    pokemon.types.map((type, index) => {
                        return (
                            <div key={index} className={styles.typeDisplay} >
                                <div className={styles.typeName}>
                                    <p>Type</p>
                                    <h3>{type}</h3>
                                </div>
                                <div className={styles.typeIcon}>
                                    <img src={
                                        type === "bug" ? bugIcon :
                                        type === "dark" ? darkIcon :
                                        type === "dragon" ? dragonIcon :
                                        type === "electric" ? electricIcon :
                                        type === "fairy" ? fairyIcon :
                                        type === "fighting" ? fightIcon :
                                        type === "fire" ? fireIcon :
                                        type === "flying" ? flyingIcon :
                                        type === "ghost" ? ghostIcon :
                                        type === "grass" ? grassIcon :
                                        type === "ground" ? groundIcon :
                                        type === "ice" ? iceIcon :
                                        type === "normal" ? normalIcon :
                                        type === "poison" ? poisonIcon :
                                        type === "psychic" ? psychicIcon :
                                        type === "rock" ? rockIcon :
                                        type === "steel" ? steelIcon :
                                        type === "water" ? waterIcon : normalIcon 
                                    } alt={type} />
                                </div>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
};