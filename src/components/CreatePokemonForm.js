import styles from "../styles/components/CreatePokemonForm.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPokemon } from "../api/pokemonAPI";
import { useForm } from "../hooks/useForm";
import { useFetch } from "../hooks/useFetch";
import { motion } from "framer-motion/dist/framer-motion";

const image = {
    hidden: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          duration: 0.5,
        }
    },
    hover: {
        scale: 1.1,
    }
};


const CreatePokemonForm = () => {
  // Imágenes de los pokemones para seleccionar
  const imgPk1 = "https://raw.githubusercontent.com/MartaFagundez/pokedex-frontend/main/src/images/pk1.png";
  const imgPk2 = "https://raw.githubusercontent.com/MartaFagundez/pokedex-frontend/main/src/images/pk2.png";
  const imgPk3 = "https://raw.githubusercontent.com/MartaFagundez/pokedex-frontend/main/src/images/pk3.png";
  const imgPk4 = "https://raw.githubusercontent.com/MartaFagundez/pokedex-frontend/main/src/images/pk4.png";
  const imgPk5 = "https://raw.githubusercontent.com/MartaFagundez/pokedex-frontend/main/src/images/pk5.png";
  const imgPk6 = "https://raw.githubusercontent.com/MartaFagundez/pokedex-frontend/main/src/images/pk6.png";

  const pokemonImages = [imgPk1, imgPk2, imgPk3, imgPk4, imgPk5, imgPk6];

  const navigate = useNavigate();
  const { getPokemonDetail } = useFetch();

  // Estado local para mostrar el modal con las imágenes de los pokemones
  const [showImageModal, setShowImageModal] = useState(false);
  // Estado local para manejar la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState(null);
  // Estado local para manejar los tipos seleccionados
  const [selectedType1, setSelectedType1] = useState(null);
  const [selectedType2, setSelectedType2] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');

  // Hook personalizado para manejar el formulario
  // El argumento que se pasa es el estado inicial del formulario
  const { formValues, handleInputChange, resetForm } = useForm({
    name: "",
    types: [],
    hp: "50",
    attack: "50",
    defense: "50",
    speed: "50",
    height: "50",
    weight: "50",
    image: null,
  });

  // Seleccionamos los tipos de pokemones del store
  const pokemonsTypes = useSelector((state) => state.pokemonsTypes);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Actualizamos el valor de la variable image del formulario, con la imagen seleccionada
    formValues.image = selectedImage;
    // Actualizamos el valor de la variable types del formulario, con los tipos seleccionados
    formValues.types.push(selectedType1);
    if (selectedType2) {
      formValues.types.push(selectedType2);
    }
    
    try {
        // Llamamos a la función que crea un nuevo pokemon y guardamos la respuesta (el nuevo pokemon) en una variable
        const newPokemon = await createPokemon(formValues);

        // Reseteamos el formulario a su estado inicial
        resetForm();

        // Actualizamos el estado global del store con el nuevo pokemon
        await getPokemonDetail(newPokemon.id);
        
        // Redireccionamos a la ruta donde ver el detalle del nuevo pokemon
        navigate(`/pokemon/${newPokemon.id}`);
    } catch (error) {
      if (error.message.includes('409')) {
        setErrorMessage("There is already a Pokemon with that name, enter a different one.");
      }
    }
    

    
  };


  // Función para manejar la selección de la imagen
  const handleClickImage = (image) => {
    // Actualizamos el estado local con la imagen seleccionada
    setSelectedImage(image);
    // Cerramos el modal
    setShowImageModal(false);
  };

  // Función para manejar el cambio del primer tipo del pokemon (campo obligatorio)
  const handleType1Change = (e) => {
    // Obtenemos el valor de la opción que se seleccionó en el desplegable
    const { value } = e.target;

    // Si hay un segundo tipo seleccionado...
    if (selectedType2) {
      // ... y el valo seleccionado para el primer tipo es igual al valor del segundo tipo...
      if (selectedType2 === value) {
        // ... entonces actualizamos el estado local del segundo tipo con null (los tipos no pueden ser iguales)
        setSelectedType2(null);
      }
    }
    // Actualizamos el estado local del tipo1 con el valor seleccionado
    setSelectedType1(value);
  };

  // Función para manejar el cambio del segundo tipo del pokemon (campo opcional)
  const handleType2Change = (e) => {
    // Obtenemos el valor de la opción que se seleccionó en el desplegable
    const { value } = e.target;

    // Actualizamos el estado local del tipo2 con el valor seleccionado
    setSelectedType2(value);
  };

  const isFormValid = () => {
    return formValues.name && selectedType1 && selectedImage;
  };


  return (
    <div className={styles.container}>
      
      {/* MODAL */}
      {showImageModal && (
        <div className={styles.imageModal}>

          <button
            className={styles.closeButton}
            onClick={() => setShowImageModal(false)}
          >
            Close
          </button>

          <div className={styles.imageThumbnails}>
            {pokemonImages.map((pk, index) => (
              <img
                key={index}
                src={pk}
                alt={`Opción ${index + 1}`}
                className={styles.thumbnail}
                onClick={() => handleClickImage(pk)}
              />
            ))}
          </div>
        </div>
      )
      }

      {/* SECCIÓN PARA LA IMAGEN */}
      <div className={styles.imageContainer}>
          {
            selectedImage && (
              <motion.img src={selectedImage} 
                alt="Pokemon" 
                title="Click to change image"
                onClick={() => setShowImageModal(true)} 
                variants={image}
                initial="hidden"
                animate="visible"
                whilehover="hover"
              />
            )
          }
        {
          !selectedImage && (
            <button type="button" onClick={() => setShowImageModal(true)}>
              Select Image
            </button>
          )
        }
        
      </div>

      {/* SECCIÓN PARA EL FORMULARIO */}
      <div className={styles.formSection}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.nameContainer}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={formValues.name}
                placeholder="Enter the name"
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className={styles.typesSelectorsContainer}>

            <div className={styles.typeSelectorContainer}>
              <label>
                First Type
                <select
                  defaultValue="default"
                  name="type1"
                  value={ formValues.types.length >= 1 ? formValues.types.length[0] : selectedType1 }
                  onChange={handleType1Change}
                  required
                >
                  <option disabled selected value="default" >Choose a Type</option>
                  {
                    pokemonsTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))
                  }
                </select>
              </label>
            </div>

            <div className={styles.typeSelectorContainer}>

              {
                selectedType1 && (
                  <label>
                    Second Type
                    <select
                      defaultValue="default" 
                      name="type2"
                      value={ formValues.types.length === 2 ? formValues.types.length[1] : selectedType2 }
                      onChange={handleType2Change}
                    >
                      <option disabled selected={!selectedType2} value="default" >Choose a Type</option>
                      {
                        pokemonsTypes.filter(type => type !== selectedType1 ).map((type, index) => (
                          <option key={index} value={type}>{type}</option>
                        ))
                      }
                    </select>
                  </label>
                )
              }
            </div>
          </div>


          <label>
            Health Points
            <input
              type="range"
              name="hp"
              min="1"
              max="100"
              value={formValues.hp}
              onChange={handleInputChange}
              required
            />
            <span id="hp-value">{formValues.hp}</span>
          </label>

          <label>
            Attack
            <input
              type="range"
              name="attack"
              min="1"
              max="100"
              value={formValues.attack}
              onChange={handleInputChange}
              required
            />
            <span id="attack-value">{formValues.attack}</span>
          </label>

          <label>
            Defense
            <input
              type="range"
              name="defense"
              min="1"
              max="100"
              value={formValues.defense}
              onChange={handleInputChange}
              required
            />
            <span id="defense-value">{formValues.defense}</span>
          </label>

          <label>
            Speed
            <input
              type="range"
              name="speed"
              min="1"
              max="100"
              value={formValues.speed}
              onChange={handleInputChange}
            />
            <span id="speed-value">{formValues.speed}</span>
          </label>

          <label>
            Height
            <input
              type="range"
              name="height"
              min="1"
              max="100"
              value={formValues.height}
              onChange={handleInputChange}
            />
            <span id="height-value">{formValues.height}</span>
          </label>

          <label>
            Weight
            <input
              type="range"
              name="weight"
              min="1"
              max="100"
              value={formValues.weight}
              onChange={handleInputChange}
            />
            <span id="weight-value">{formValues.weight}</span>
          </label>

          {
          errorMessage && (
            <div className={styles.errorContainer}>
              <p className={styles.error}> {errorMessage} </p>
            </div>
          )
          }

          <button type="submit" className={styles.submitButton} disabled={!isFormValid()} >Create Pokemon</button>
        </form>
      </div>

      

    </div>
  );
  
};

export default CreatePokemonForm;
