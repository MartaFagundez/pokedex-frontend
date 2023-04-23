import styles from "../styles/pages/LandingPage.module.css";
import img1 from "../images/pika1.gif";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';

// Variantes de animación para el componente
const container = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
        }
    },
    exit: {
        x: "-100vw",
        transition: {
            ease: "easeInOut",
        }
    }
};

const title = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: "100vh",
    },
    visible: {
      opacity: 1,
        scale: 1,
        y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        delay: 0.5,
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
            delay: 1.5,
            duration: 1,
        }
    }
}

const button = {
    hidden: {
        scale: 0.5,
        opacity: 0,
    },  
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            delay: 4,
        }
    },
    hover: {
        scale: 1.1,
    }
};

const author = {
    hidden: {
        scale: 0.5,
        opacity: 0,
    },  
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            delay: 3,
        }
    }
};


const LandingPage = () => {
    // LÓGICA DEL COMPONENTE
    const navigate = useNavigate();

    // Función para navegar al home
    const handlePlay = () => {  
        navigate("/home");
    };

    // RENDERIZADO DEL COMPONENTE
    return (
        <motion.div className={styles.container} 
            variants={container}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className={styles.imgContainer}>
                <motion.img src={img1} alt="LandingPage2" 
                    variants={image}
                    initial="hidden"
                    animate="visible"
                />
            </div>
            <motion.h1 className={styles.title}
                variants={title} 
                initial="hidden"
                animate="visible"
            >Pokédex
            </motion.h1>
            <motion.button 
                className={styles.playButton} 
                onClick={handlePlay}
                variants={button}
                initial="hidden"
                animate="visible"
                whileHover="hover"
            >Let's Play!
            </motion.button>
            <motion.div className={styles.authorContainer}
                variants={author}
                initial="hidden"
                animate="visible"
            >
                <h3>Made with ❤ by  <a href="https://www.linkedin.com/in/martafagundezrodriguez/" target="_blank" rel="noreferrer" className={styles.link} > Marta Fagúndez</a> </h3>
            </motion.div>
        </motion.div>
    );
};

export default LandingPage;