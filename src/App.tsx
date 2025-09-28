import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Login/Login";
import ToDoBuild from "./pages/Register/Register";
import FormLogin from "./components/FormLogin/FormLogin";
import Register from "./components/FormRegister/FormRegister";
import CreateGroup from "./pages/CreateGroup/CreateGroup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/build" element={<ToDoBuild />} />
        <Route path="/Register" element={<Register />}/>
        <Route path="/create-group" element={<CreateGroup/>}/>
        <Route path="/Login" element={<FormLogin />} />


      </Routes>
    </Router>
  );
}
export default App;
