import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import RecipesPage from './pages/RecipesPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MyRecipesPage from './pages/MyRecipesPage';
import AddRecipePage from './pages/AddRecipePage';
import FavoritesPage from './pages/FavoritesPage';
import RecipeDetails from './pages/RecipeDetails';
import ShoppingList from './pages/ShoppingList';
import EditRecipePage from './pages/EditRecipePage'; // Import the EditRecipePage component
import AuthProvider from './context/AuthContext'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <AuthProvider>
        <Sidebar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<RecipesPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/my-recipes" element={<ProtectedRoute><MyRecipesPage /></ProtectedRoute>} />
          <Route path="/add-recipe" element={<ProtectedRoute><AddRecipePage /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
          <Route path="/edit-recipe/:id" element={<ProtectedRoute><EditRecipePage /></ProtectedRoute>} />
          <Route path="/shopping-list" element={<ProtectedRoute><ShoppingList /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
