import { Card, CardContent, Typography, Stack, Button, CardMedia } from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;

export default function TrainerCard({ trainer, onDelete }) {
    const isLoggedIn = localStorage.getItem("access_token") !== null;

    return (
        <Card sx={{ maxWidth: 345 }}>
            {trainer.picture && (
                <CardMedia
                    component="img"
                    height="200"
                    image={
                        trainer.picture.startsWith("data:")
                            ? trainer.picture
                            : `${MEDIA_URL}/${trainer.picture}`
                    }
                    alt={`${trainer.first_name} ${trainer.last_name}`}
                />
            )}

            <CardContent>
                <Typography variant="h6">
                    {trainer.first_name} {trainer.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Fecha de nacimiento: {trainer.birth_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Nivel: {trainer.level}
                </Typography>

                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        component={Link}
                        to={`/trainer/${trainer.id}`}
                        sx={{ borderRadius: "6px" }}
                    >
                        Ver más
                    </Button>
                    {isLoggedIn && (
                        <>
                            <Button
                                variant="contained"
                                color="info"
                                size="small"
                                component={Link}
                                to={`/edit-trainer/${trainer.id}`}
                                sx={{ borderRadius: "6px" }}
                            >
                                <Edit />
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => onDelete(trainer.id)}
                                sx={{ borderRadius: "6px" }}
                            >
                                <Delete />
                            </Button>
                        </>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}