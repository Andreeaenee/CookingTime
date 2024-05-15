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

          <Route element={<div>My Recipes</div>} />
          <Route element={<div>Favorites</div>} />
          <Route element={<div>Shopping List</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;