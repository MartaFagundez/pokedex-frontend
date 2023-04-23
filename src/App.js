import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import "./index.css";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import CreatePokemonPage from "./pages/CreatePokemonPage";
import NotFoundPage from './pages/NotFoundPage';
import { AnimatePresence } from 'framer-motion/dist/framer-motion';

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.key} >
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailsPage />} />
        <Route path="/pokemon/create" element={<CreatePokemonPage />} />
        <Route path="/*" element={ <NotFoundPage /> } />
      </Routes>
    </AnimatePresence>
  );
};
