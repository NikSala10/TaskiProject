import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import User from "./components/UserProfile/User";
import Groups from "./pages/Groups/Groups";
import { menuItems } from "./data/itemsBar";
import { membersIcons } from "./data/memberBar";
import Tasks from "./pages/Tasks/Tasks";
import PlanReview from "./pages/Plan Review/PlanReview";
import Ranking from "./pages/Ranking/Ranking";
import Profile from "./pages/Profile/Profile";
import CreateTask from "./pages/CreateTask/CreateTask";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import CreateGroupPage from "./pages/CreateGroup/CreateGroup";
import './App.css';


function App() {
  return (
    <Router>
      <div className="navBar"><NavBar items={menuItems} avatars={membersIcons} /></div>
      <div className="headerUp"><Header /> <User/></div>
      <div className="screens">
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/groups" element={<Groups />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/plan-review" element={<PlanReview />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-group" element={<CreateGroupPage/>}/>
        </Routes>
      </div>
      <Routes>

      </Routes>
    </Router>
  );
}
export default App;
