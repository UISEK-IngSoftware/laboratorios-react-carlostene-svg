import { Container, Grid } from '@mui/material'
import Header from './components/Header'
import PokemonList from './pages/PokemonList'
import PokemonForm from './pages/PokemonForm'
import LoginPage from './pages/LoginPage'
import TrainerList from './pages/TrainerList'
import TrainerForm from './pages/TrainerForm' 
import TrainerDetail from './pages/TrainerDetail'
import PokemonDetail from './pages/PokemonDetail' 


import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'






function App() {

  return (
    <>

      <Container>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<PokemonList />} />
            <Route path='/add-pokemon' element={<PokemonForm />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/edit-pokemon/:id' element={<PokemonForm />} />
            <Route path='/delete-pokemon/:id' element={<PokemonList />} />
            <Route path="/entrenadores" element={<TrainerList />} />
            <Route path="/add-trainer" element={<TrainerForm />} />
            <Route path="/edit-trainer/:id" element={<TrainerForm />} />
            <Route path="/delete-trainer/:id" element={<TrainerList />} />
            <Route path="/trainer/:id" element={<TrainerDetail />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />           
        


          </Routes>
        </BrowserRouter>
      </Container>

    </>
  )
}

export default App
