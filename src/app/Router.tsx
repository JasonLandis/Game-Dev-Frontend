import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import { Home, About, NotFound } from '../features/core/core';
import { Game } from '../features/games/games';
import { Profile } from '../features/profiles/profiles';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="game/:id" element={<Game />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
