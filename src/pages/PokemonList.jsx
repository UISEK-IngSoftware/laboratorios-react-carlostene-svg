import { useEffect, useState } from 'react';
import { Grid, Stack, Button } from '@mui/material';
import PokemonCard from '../components/PokemonCard'
import { fetchPokemons, deletePokemon } from '../services/PokemonService';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import Spinner from '../components/Spinner';

export default function PokemonList() {
  const isLoggedIn = localStorage.getItem('access_token') !== null;
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPokemons().then((data) => {
      setPokemons(data);
    }).catch((error) => {
      alert("Error obteniendo los pokemons");
      console.error("Error obteniendo los pokemons", error);
    })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    try {
      await deletePokemon(id);
      setPokemons(pokemons.filter((p) => p.id !== id));
      alert("Pokémon eliminado exitosamente");
    } catch (error) {
      console.error("Error eliminando el pokemon:", error.response || error);
      alert("Error eliminando el pokemon");
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
            onClick={() => navigate("/add-pokemon")}
            sx={{ borderRadius: "8px" }}
          >
            Agregar Pokémon
          </Button>
        </Stack>
      )}
      <Grid container spacing={2} marginTop={2}>
        {pokemons.map((pokemon, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <PokemonCard pokemon={pokemon} onDelete={handleDelete} />
          </Grid>

        ))}

      </Grid>
    </>
  );
}