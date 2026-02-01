import { Box, TextField, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addPokemon, editPokemon, fetchPokemons } from "../services/PokemonService";
import Spinner from "../components/Spinner";

export default function PokemonForm() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [loading, setLoading] = useState(false);
    const [pokemonData, setPokemonData] = useState({
        name: '',
        tipo: '',
        weight: '',
        height: '',
        picture: null
    });

    useEffect(() => {
        if (id) {
            fetchPokemons().then((data) => {
                const found = data.find((p) => p.id === parseInt(id));
                if (found) {
                    setPokemonData({
                        name: found.name,
                        tipo: found.tipo,
                        weight: found.weight,
                        height: found.height,
                        picture: found.picture,
                    });
                }
            });
        }
    }, [id]);


    const handChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "picture") {
            setPokemonData({ ...pokemonData, picture: files[0] });
        } else {
            setPokemonData({ ...pokemonData, [name]: value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await editPokemon(id, pokemonData); 
                alert("Pokemon editado exitosamente");
            } else {
                await addPokemon(pokemonData); 
                alert("Pokemon agregado exitosamente");
            }
            navigate("/");
        } catch (error) {
            console.error("Error al guardar el pokemon:", error);
            alert("Error al guardar el pokemon");
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
                Formulario de Pokemon.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
                <TextField label="Nombre" name="name" variant="outlined" onChange={handChange} value={pokemonData.name} />
                <TextField label="Tipo" name="tipo" variant="outlined" onChange={handChange} value={pokemonData.tipo} />
                <TextField label="Peso" name="weight" variant="outlined" onChange={handChange} value={pokemonData.weight} />
                <TextField label="Altura" name="height" variant="outlined" onChange={handChange} value={pokemonData.height} />
                <input name="picture" type="file" onChange={handChange} />
                <Button variant="contained" type="submit">Guardar</Button>
            </Box>

        </>
    );
}