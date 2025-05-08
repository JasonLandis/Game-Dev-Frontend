import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import PrivateRoutes from '../lib/utils/PrivateRoutes';

import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';

import Home from '../features/core/pages/Home';
import About from '../features/core/pages/About';
import NotFound from '../features/core/pages/NotFound';

import Game from '../features/games/pages/Game';
import CreateGame from '../features/games/pages/CreateGame';
import UpdateGame from '../features/games/pages/UpdateGame';

import Profile from '../features/profiles/pages/Profile';
import UpdateProfile from '../features/profiles/pages/UpdateProfile';

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
          <Route path="profile/:username" element={<Profile />} />
          <Route element={<PrivateRoutes />}>
            <Route path="creategame" element={<CreateGame />} />
            <Route path="updategame/:id" element={<UpdateGame />} />
            <Route path="updateprofile" element={<UpdateProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
