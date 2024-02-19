import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import ProductOutlet from "./Pages/ProductOutlet";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<ProductOutlet />} />
      </Route>
    </Routes>
  );
}

export default App;
