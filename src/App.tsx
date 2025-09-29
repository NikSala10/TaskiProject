import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import CreateGroupPage from "./pages/CreateGroup/CreateGroup";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-group" element={<CreateGroupPage/>}/>

      </Routes>
    </Router>
  );
}
export default App;
