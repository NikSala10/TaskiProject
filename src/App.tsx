import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import NavBar from "./components/NavBar/NavBar";
// import Header from "./components/Header/Header";
// import User from "./components/UserProfile/User";
import Groups from "./pages/Groups/Groups";
// import { menuItems } from "./data/itemsBar";
// import { membersIcons } from "./data/memberBar";
import SignUpPage from "./pages/Register/Register";


function App() {
  return (
    <Router>
      {/* <div className="navBar"><NavBar items={menuItems} avatars={membersIcons} /></div>
      <div className="headerUp"><Header /> <User/></div> */}
      <div className="screens">
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/groups" element={<Groups />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
