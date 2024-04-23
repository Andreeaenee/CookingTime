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

function App() {
  return (
    <Router>
      <Routes>
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
          <Route element={<div>Login</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
