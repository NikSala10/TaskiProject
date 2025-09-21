import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Login/Login";
import ToDoBuild from "./pages/Registro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<ToDoBuild />} />
      </Routes>
    </Router>
  );
}

export default App;
