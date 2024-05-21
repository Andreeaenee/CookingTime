import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import RecipesPage from './pages/RecipesPage';
import LoginPage from './pages/LoginPage';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <div>
              <Sidebar />
              <Outlet />
            </div>
          }
        >
          <Route path="/" element={<RecipesPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route element={<div>Favorites</div>} />
          <Route element={<div>Shopping List</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
