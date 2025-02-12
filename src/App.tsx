import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Game from './pages/Game/Game';
import NotFound from './pages/NotFound/NotFound';
import Create from './pages/Create/Create';
import Update from './pages/Update/Update';
import { ErrorBoundary } from 'react-error-boundary';
import UnknownError from './components/UnknownError/UnknownError';

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={UnknownError}>
      <BrowserRouter>
        <AuthProvider>
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
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
