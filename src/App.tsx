import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { menuItems } from "./data/itemsBar";
import { membersIcons } from "./data/memberBar";
import NavBar from "./components/NavBar/NavBar";
import Groups from "./pages/Groups/Groups";
import User from "./components/UserProfile/User";

function App() {
  return (
    <Router>
      <div className="navBar"><NavBar items={menuItems} avatars={membersIcons} /></div>
      <div className="headerUp"><User/></div>
      <div className="screens">
        <Routes>
          <Route path="/" element={<Groups />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
