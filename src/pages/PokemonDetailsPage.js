import styles from "../styles/pages/PokemonDetailsPage.module.css";
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

import React, { useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

// Variantes de animación para el componente
const container = {
    hidden: {
        y: "-100vh",
    },
    visible: {
        y: 0,
        transition: {
            duration: 0.5,
        }
    },
    exit: {
        y: "200vh",
        transition: {
            ease: "easeInOut",
            duration: 0.5,
        }
    }
};

const image = {
    hidden: {
        x: "-100vw",
    },
    visible: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 60,
            delay: 0.5,
        }   
    },
};

const info = {
    hidden: {
        y: "100vh",
    },
    visible: {
        y: 0,
        transition: {
            type: "spring",
            stiffness: 70,
            delay: 1,
        }
    },
}

const backButton = {
    hidden: {
        scale: 0,
    },
    visible: {
        scale: 1,
        transition: {
            delay: 1,
            duration: 0.5,
        }
    },
    hover: {
        scale: 1.1,
    }
};


export default function PokemonDetailsPage() {
    // LÓGICA DEL COMPONENTE
    const navigate = useNavigate();
    const { clearPokemonDetails } = useFetch();
    const pokemonDetails = useSelector(state => state.pokemonDetails);

    useEffect(() => {
        // Limpiar el estado de pokemonDetails al desmontar el componente
        return function cleanup() {
            clearPokemonDetails();
        };
    }, []);

    // Función para manejar el botón de volver
    const handleReturn = () => {
        navigate("/home");  
    };

    // RENDERIZADO DEL COMPONENTE
    return (
        <motion.div className={
            pokemonDetails.types[0] === "bug" ? `${styles.container} ${styles.bug}` :
            pokemonDetails.types[0] === "dark" ? `${styles.container} ${styles.dark}` :
            pokemonDetails.types[0] === "dragon" ? `${styles.container} ${styles.dragon}` :
            pokemonDetails.types[0] === "electric" ? `${styles.container} ${styles.electric}` :
            pokemonDetails.types[0] === "fairy" ? `${styles.container} ${styles.fairy}` :
            pokemonDetails.types[0] === "fighting" ? `${styles.container} ${styles.fight}` :
            pokemonDetails.types[0] === "fire" ? `${styles.container} ${styles.fire}` :
            pokemonDetails.types[0] === "flying" ? `${styles.container} ${styles.flying}` :
            pokemonDetails.types[0] === "ghost" ? `${styles.container} ${styles.ghost}` :
            pokemonDetails.types[0] === "grass" ? `${styles.container} ${styles.grass}` :
            pokemonDetails.types[0] === "ground" ? `${styles.container} ${styles.ground}` :
            pokemonDetails.types[0] === "ice" ? `${styles.container} ${styles.ice}` :
            pokemonDetails.types[0] === "normal" ? `${styles.container} ${styles.normal}` :
            pokemonDetails.types[0] === "poison" ? `${styles.container} ${styles.poison}` :
            pokemonDetails.types[0] === "psychic" ? `${styles.container} ${styles.psychic}` :
            pokemonDetails.types[0] === "rock" ? `${styles.container} ${styles.rock}` :
            pokemonDetails.types[0] === "steel" ? `${styles.container} ${styles.steel}` :
            pokemonDetails.types[0] === "water" ? `${styles.container} ${styles.water}` :
            `${styles.container}`
        }
            variants={container}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className={styles.backButtonContainer}>
                <motion.button onClick={handleReturn} 
                    variants={backButton}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                >Back
                </motion.button>
            </div>
            <div className={styles.imageContainer}>
                <motion.img src={pokemonDetails.image || pk0} alt={pokemonDetails.name} 
                    variants={image}
                    initial="hidden"
                    animate="visible"
                />
            </div>
            <motion.div className={styles.infoContainer} 
                variants={info}
                initial="hidden"
                animate="visible"
            >
                <h2>
                    {
                        pokemonDetails.id < 10 ? `#000${pokemonDetails.id}` : pokemonDetails.id < 100 ? `#00${pokemonDetails.id}` : pokemonDetails.id < 1000 ? `#0${pokemonDetails.id}` : `#${pokemonDetails.id}`
                    }
                </h2>
                <h1>{pokemonDetails.name}</h1>
                <p>Health Points: <span>{pokemonDetails.hp}</span></p>
                <p>Attack: <span>{pokemonDetails.attack}</span></p>
                <p>Defense: <span>{pokemonDetails.defense}</span></p>
                <p>Speed: <span>{pokemonDetails.speed}</span></p>
                <p>Height: <span>{pokemonDetails.height}</span></p>
                <p>Weight: <span>{pokemonDetails.weight}</span></p>
                <div className={styles.typesContainer}>
                {
                    pokemonDetails.types.map((type, index) => {
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
            </motion.div>
        </motion.div>
    );
};