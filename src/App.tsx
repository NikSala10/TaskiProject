import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import CreateGroupPage from "./pages/CreateGroup/CreateGroup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/create-group" element={<CreateGroupPage/>}/>
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}
export default App;
