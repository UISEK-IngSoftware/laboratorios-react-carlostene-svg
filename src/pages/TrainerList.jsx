import { useEffect, useState } from "react";
import { Grid, Stack, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { fetchTrainers, deleteTrainer } from "../services/trainerService";
import TrainerCard from "../components/TrainerCard";

export default function TrainerList() {
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetchTrainers()
      .then((data) => setTrainers(data))
      .catch((error) => {
        alert("Error obteniendo entrenadores");
        console.error(error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTrainer(id);
      setTrainers(trainers.filter((t) => t.id !== id));
      alert("Entrenador eliminado exitosamente");
    } catch (error) {
      alert("Error eliminando entrenador");
      console.error(error);
    }
  };

  return (
    <>
      {isLoggedIn && (
        <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<Add />}
            onClick={() => navigate("/add-trainer")}
            sx={{ borderRadius: "8px" }}
          >
            Agregar Entrenador
          </Button>
        </Stack>
      )}

      <Grid container spacing={2} marginTop={2}>
        {trainers.map((trainer) => (
          <Grid item xs={12} sm={6} md={4} key={trainer.id}>
            <TrainerCard trainer={trainer} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}