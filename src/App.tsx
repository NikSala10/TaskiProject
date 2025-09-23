import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { menuItems } from "./data/itemsBar";
import { membersIcons } from "./data/memberBar";
import NavBar from "./components/NavBar/NavBar";
import Groups from "./pages/Groups/Groups";

function App() {
  return (
    <Router>
      <NavBar items={menuItems} avatars={membersIcons} />
      <Routes>
        <Route path="/" element={<Groups />} />
      </Routes>
    </Router>
  );
}

export default App;
