import { Box, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addTrainer, editTrainer, fetchTrainers } from "../services/trainerService";
import Spinner from "../components/Spinner";

export default function TrainerForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); 

  const [trainerData, setTrainerData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    level: "",
    picture: null,
  });

  useEffect(() => {
    if (id) {
      fetchTrainers().then((data) => {
        const found = data.find((t) => t.id === parseInt(id));
        if (found) {
          setTrainerData({
            first_name: found.first_name,
            last_name: found.last_name,
            birth_date: found.birth_date,
            level: found.level,
            picture: found.picture,
          });
        }
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      setTrainerData({ ...trainerData, picture: files[0] });
    } else {
      setTrainerData({ ...trainerData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await editTrainer(id, trainerData); 
        alert("Entrenador editado exitosamente");
      } else {
        await addTrainer(trainerData); 
        alert("Entrenador agregado exitosamente");
      }
      navigate("/entrenadores");
    } catch (error) {
      console.error("Error al guardar el entrenador:", error);
      alert("Error al guardar el entrenador");
    }finally {
        setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Formulario de Entrenador
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nombre"
          name="first_name"
          variant="outlined"
          onChange={handleChange}
          value={trainerData.first_name}
        />
        <TextField
          label="Apellido"
          name="last_name"
          variant="outlined"
          onChange={handleChange}
          value={trainerData.last_name}
        />
        <TextField
          label="Fecha de nacimiento"
          name="birth_date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          onChange={handleChange}
          value={trainerData.birth_date}
        />
        <TextField
          label="Nivel"
          name="level"
          type="number"
          variant="outlined"
          onChange={handleChange}
          value={trainerData.level}
        />
        <input name="picture" type="file" onChange={handleChange} />
        <Button variant="contained" type="submit">
          Guardar
        </Button>
      </Box>
    </>
  );
}