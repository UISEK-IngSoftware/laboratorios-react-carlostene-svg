import { Button, Card, CardActions, CardContent, CardMedia, Typography, Stack } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";


export default function PokemonCard({ pokemon, onDelete }) {
    const mediaUrl = import.meta.env.VITE_MEDIA_URL;
    pokemon.image = `${mediaUrl}/${pokemon.picture}`;
    const isLoggedIn = localStorage.getItem("access_token") !== null;



    return (
        <Card>
            <CardMedia
                component="img"
                height={200}
                image={pokemon.image}
                alt={pokemon.name}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {pokemon.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tipo: {pokemon.tipo}
                </Typography>
            </CardContent>
            <Button
                variant="contained"
                color="primary"
                size="small"
                component={Link}
                to={`/pokemon/${pokemon.id}`}
                sx={{ borderRadius: "6px" }}
            >
                Ver más
            </Button>


            {isLoggedIn && (
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="contained"
                        color="info"
                        size="small"
                        startIcon={<Edit />}
                        href={`/edit-pokemon/${pokemon.id}`}
                        sx={{
                            minWidth: "40px",
                            height: "40px",
                            borderRadius: "6px",
                            padding: 0,
                        }}

                    >

                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<Delete />}
                        onClick={() => onDelete(pokemon.id)}
                        sx={{
                            minWidth: "40px",
                            height: "40px",
                            borderRadius: "6px",
                            padding: 0,
                        }}

                    >

                    </Button>
                </Stack>
            )}
        </Card>
    );
}