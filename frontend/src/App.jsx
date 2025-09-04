import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
