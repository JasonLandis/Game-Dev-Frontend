import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import PrivateRoutes from '../utils/PrivateRoutes';
import { Login, Register } from '../features/auth/auth';
import { Home, About, NotFound } from '../features/core/core';
import { Game, CreateGame, UpdateGame } from '../features/games/games';
import { Profile, UpdateProfile } from '../features/profiles/profiles';

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
