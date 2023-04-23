import { useState, useCallback } from 'react';

// Hook para manejar formularios *************
// El estado inicial del formulario se proporciona como argumento de la función useForm, si no se proporciona un estado inicial, el estado inicial será un objeto vacío.
export const useForm = (initialState = {}) => {
    // Estado local para manejar los valores del formulario
    const [formValues, setFormValues] = useState(initialState); 

    // Función para manejar los cambios en los inputs
    const handleInputChange = useCallback(
        // Actualizamos el estado local con los valores del formulario
        (event) => {
            // Obtenemos el nombre y el valor del input que generó el evento
            const { name, value } = event.target;
            // Actualizamos el estado local con los valores del input que generó el evento
            setFormValues((prevState) => ({ ...prevState, [name]: value }));
            console.log(formValues);
        }, []
    );

    // Función para resetear el formulario
    const resetForm = useCallback(() => {
        // Restauramos el estado inicial del formulario
        setFormValues(initialState);
    }, [initialState]);

    // Retornamos los valores del formulario y las funciones para manejar los cambios y resetear el formulario
    return {
        formValues,
        handleInputChange,
        resetForm,
    };
};

// *******************  WIKI ************************
/*
En este hook personalizado se mantiene el estado local para manejar los valores del formulario (formValues) con un estado inicial proporcionado.

La función handleInputChange actualiza el estado local de "formValues" cuando se detecta un cambio en los inputs del formulario.

La función resetForm restaura el estado original del formulario.

Para usar este hook en los componentes, se debe importar este hook useForm y llamar a la función en el componente, proporcionando un objeto con el estado inicial del formulario.
*/