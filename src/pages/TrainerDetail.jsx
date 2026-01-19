import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { fetchTrainers } from "../services/trainerService";

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;

export default function TrainerDetail() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    fetchTrainers().then((data) => {
      const found = data.find((t) => t.id === parseInt(id));
      setTrainer(found);
    });
  }, [id]);

  if (!trainer) {
    return <Typography>Cargando entrenador...</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
      {trainer.picture && (
        <CardMedia
          component="img"
          height="300"
          image={
            trainer.picture.startsWith("data:")
              ? trainer.picture
              : `${MEDIA_URL}/${trainer.picture}`
          }
          alt={`${trainer.first_name} ${trainer.last_name}`}
        />
      )}
      <CardContent>
        <Typography variant="h5">
          {trainer.first_name} {trainer.last_name}
        </Typography>
        <Typography>Fecha de nacimiento: {trainer.birth_date}</Typography>
        <Typography>Nivel: {trainer.level}</Typography>
      </CardContent>
    </Card>
  );
}