import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';

import Home from '../features/general/pages/Home';
import About from '../features/general/pages/About';
import NotFound from '../features/general/pages/NotFound';

import Game from '../features/games/pages/Game';
import Create from '../features/games/pages/Create';
import Update from '../features/games/pages/Update';

import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
