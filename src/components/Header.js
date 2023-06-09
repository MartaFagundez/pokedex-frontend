import React from "react";
import styles from "../styles/components/Header.module.css";
import logo from "../images/logo_small.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Header({ onClickFilterButton, onClickResetFilterButton, onClickCreateButton }) {
    // Lógica del componente
    const navigate = useNavigate();
    const { isOpen } = useSelector((state) => state.filterPanel);
    
    // Renderizado del componente
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <figure>
                    <img src={logo} alt="Logo de Pokémon" 
                        onClick={() => navigate("/")}
                        title="Go to Landing Page"
                    />
                </figure>
            </div>
            
            <nav className={styles.navbar}>
                <ul>
                    <li>
                        {
                            !isOpen &&
                            <button className={styles.navBarButton} onClick={onClickFilterButton} >Filter Pokemons</button>
                        }
                        {
                            isOpen && 
                            <button className={styles.navBarButton} onClick={onClickResetFilterButton} >All Pokemons</button>
                        }
                        
                    </li>

                    <li>
                        <button className={styles.navBarButton} onClick={onClickCreateButton}>Create Pokemon</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};