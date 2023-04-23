import axios from 'axios';

// Crear una instancia de axios
const apiClient = axios.create({
    baseURL: "https://pokedex-backend-production-8133.up.railway.app/api", // URL del servidor (backend)
});


// Función para obtener la lista de pokemons con los parámetros de filtrado, ordenamiento y paginación
export const fetchPokemons = async ({
    filterTypes,
    filterName,
    sortOrder,
    sortBy,
    limit,
    offset,
}) => {
    if (filterTypes) {
        filterTypes = filterTypes.join(","); // Convertir el array de tipos en un string separado por comas
    }


    const response = apiClient.get("/pokemons", {
        params: {
            filterTypes, // Convertir el array de tipos en un string separado por comas
            filterName,
            sortOrder,
            sortBy,
            limit,
            offset,
        },
    })
    .then((data) => {
        return data.data;
    });

    return response;
};


// Función para obtener los detalles de un pokemon por su ID
export const fetchPokemonById = async (id) => {
    try {
        const response = await apiClient.get(`/pokemons/${id}`);
        if (response.status === 200) return response.data;
    
    } catch (error) {
        if (error.response.status === 404) throw new Error("Not Found");
        throw new Error(error.message);
    }
};


// Función para obtener la lista de tipos de pokemons
export const fetchPokemonsTypes = async () => {
    const response = await apiClient.get("/types");
    return response.data;
};


// Función para crear un nuevo pokemon
export const createPokemon = async (pokemonData) => {
    const response = await apiClient.post("/pokemons/create", pokemonData);
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error(response.data.message);
    }
};