import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Login/Login";
import ToDoBuild from "./pages/Registro";

function App() {
  return (
    <Router>
      <div className="navBar"><NavBar items={menuItems} avatars={membersIcons} /></div>
      <div className="headerUp"><Header /> <User/></div>
      <div className="screens">
        <Routes>
          <Route path="/" element={<Groups />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
