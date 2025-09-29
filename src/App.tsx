import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import User from "./components/UserProfile/User";
import Groups from "./pages/Groups/Groups";
import { menuItems } from "./data/itemsBar";
import { membersIcons } from "./data/memberBar";
import Tasks from "./pages/Tasks/Tasks";
import PlanReview from "./pages/Plan Review/PlanReview";
import Profile from "./pages/Profile/Profile";
import CreateTask from "./pages/CreateTask/CreateTask";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import CreateGroupPage from "./pages/CreateGroup/CreateGroup";
import './App.css';
import Winners from "./pages/Winners/Winners";
import RankingPage from "./pages/Ranking/Ranking";

// 👉 Layout que envuelve las páginas que SÍ llevan NavBar y Header
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="navBar"><NavBar items={menuItems} avatars={membersIcons} /></div>
      <div className="headerUp"><Header /> <User/></div>
      <div className="screens">{children}</div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas SIN header ni navbar */}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-group" element={<CreateGroupPage />} />

        {/* Rutas CON header y navbar */}
        <Route
          path="/groups"
          element={
            <Layout>
              <Groups />
            </Layout>
          }
        />
        <Route
          path="/tasks"
          element={
            <Layout>
              <Tasks />
            </Layout>
          }
        />
        <Route
          path="/create-task"
          element={
            <Layout>
              <CreateTask />
            </Layout>
          }
        />
        <Route
          path="/plan-review"
          element={
            <Layout>
              <PlanReview />
            </Layout>
          }
        />
        <Route
          path="/ranking"
          element={
            <Layout>
              <RankingPage />
            </Layout>
          }
        />
        <Route
          path="/winner"
          element={
            <Layout>
              <Winners />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
