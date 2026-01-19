import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { fetchPokemons } from "../services/PokemonService";

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;

export default function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetchPokemons().then((data) => {
      const found = data.find((p) => p.id === parseInt(id));
      setPokemon(found);
    });
  }, [id]);

  if (!pokemon) {
    return <Typography>Cargando Pokémon...</Typography>;
  }

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", mt: 4 }}>
      {pokemon.picture && (
        <CardMedia
          component="img"
          height="300"
          image={
            pokemon.picture.startsWith("data:")
              ? pokemon.picture
              : `${MEDIA_URL}/${pokemon.picture}`
          }
          alt={pokemon.name}
        />
      )}
      <CardContent>
        <Typography variant="h5">{pokemon.name}</Typography>
        <Typography>Tipo: {pokemon.tipo}</Typography>
        <Typography>Peso: {pokemon.weight} kg</Typography>
        <Typography>Altura: {pokemon.height} m</Typography>
      </CardContent>
    </Card>
  );
}