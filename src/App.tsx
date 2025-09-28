import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateGroup from "./pages/CreateGroup/CreateGroup";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Register/>}/>
        <Route path="/create-group" element={<CreateGroup/>}/>
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}
export default App;
