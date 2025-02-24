import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import PrivateRoutes from '../utils/PrivateRoutes';

import Home from '../features/core/pages/Home';
import About from '../features/core/pages/About';
import NotFound from '../features/core/pages/NotFound';

import Game from '../features/games/pages/Game';
import Create from '../features/games/pages/Create';
import Update from '../features/games/pages/Update';

import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="game/:id" element={<Game />} />
          <Route element={<PrivateRoutes />}>
            <Route path="create" element={<Create />} />
            <Route path="update/:id" element={<Update />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
