import styles from "../styles/pages/CreatePokemonPage.module.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import CreatePokemonForm from "../components/CreatePokemonForm";
import { motion } from "framer-motion/dist/framer-motion";

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



export default function CreatePokemonPage() {
    // Lógica y funciones del componente
    const navigate = useNavigate();
    const { getPokemonsTypes } = useFetch();

    useEffect(() => {
        getPokemonsTypes();
    }, []);

    const handleReturn = () => {
        navigate("/home");   
    };


    // Renderizado del componente
    return (
        <motion.div className={styles.container}
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
                >
                    Back
                </motion.button>
            </div>
            <CreatePokemonForm />
        </motion.div>
    );
}