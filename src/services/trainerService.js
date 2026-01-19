import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// convertir archivo a base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

// Obtener entrenadores
export async function fetchTrainers() {
    const response = await axios.get(`${API_BASE_URL}/trainers/`);
    return response.data;
}

// Agregar entrenador
export async function addTrainer(trainerData) {
    let payload = {
        first_name: trainerData.first_name,
        last_name: trainerData.last_name,
        birth_date: trainerData.birth_date,
        level: trainerData.level,
    };

    if (trainerData.picture instanceof File) {
        const pictureBase64 = await fileToBase64(trainerData.picture);
        payload.picture = pictureBase64;
    }

    const response = await axios.post(`${API_BASE_URL}/trainers/`, payload);
    return response.data;
}

// Editar entrenador
export async function editTrainer(trainerId, trainerData) {
    let payload = {
        first_name: trainerData.first_name,
        last_name: trainerData.last_name,
        birth_date: trainerData.birth_date,
        level: trainerData.level,
    };

    if (trainerData.picture instanceof File) {
        const pictureBase64 = await fileToBase64(trainerData.picture);
        payload.picture = pictureBase64;
    }

    const response = await axios.put(`${API_BASE_URL}/trainers/${trainerId}/`, payload);
    return response.data;
}

// Eliminar entrenador
export async function deleteTrainer(trainerId) {
    const response = await axios.delete(`${API_BASE_URL}/trainers/${trainerId}/`);
    return response.data;
}