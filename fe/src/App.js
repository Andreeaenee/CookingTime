import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import RecipesPage from "./pages/RecipesPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyRecipesPage from './pages/MyRecipesPage';
import AddRecipePage from './pages/AddRecipePage';
import FavoritesPage from './pages/FavoritesPage';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
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
          <Route path="/my-recipes" element={<MyRecipesPage />} />
          {/* Render FavoritesPage component for /favorites route */}
          <Route path="/add-recipe" element={<AddRecipePage />} />
          {/* Render FavoritesPage component for /favorites route */}
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route element={<div>Shopping List</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;