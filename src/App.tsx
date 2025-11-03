import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Header from "./components/Header/Header";
import User from "./components/UserProfile/User";
import Groups from "./pages/Groups/Groups";
import { menuItems } from "./data/itemsBar";
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
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { clearUser, setLoading, setUser } from "./redux/slices/authSlice";
import { auth, db } from "./services/firebaseConfig";
import { ProtectedRoutes } from "./components/ProtectedRoutes/protectedRoutes";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";


// 👉 Layout que envuelve las páginas que SÍ llevan NavBar y Header
function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
      <div className="navBar"><NavBar items={menuItems} /></div>
      <div className="headerUp"><Header /> <User/></div>
      <div className="screens">{children}</div>
    </>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      dispatch(setLoading(true)); // activamos loading mientras se obtiene el usuario

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          dispatch(
            setUser({
              uid: user.uid,
              username: userData.username || "",
              avatar: userData.avatar || "",
            })
          );
        } else {
          dispatch(
            setUser({
              uid: user.uid,
              username: user.displayName || "",
              avatar: "",
            })
          );
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        dispatch(clearUser());
      } finally {
        dispatch(setLoading(false)); 
      }
    } else {
      dispatch(clearUser());
    }
  });

  return () => unsubscribe();
}, [dispatch]);

  
  return (
    <Router>
      <Routes>
        {/* Rutas SIN header ni navbar */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-group" element={<ProtectedRoutes><CreateGroupPage /></ProtectedRoutes>} />

        {/* Rutas CON header y navbar */}
        <Route
          path="/groups"
          element={
            <ProtectedRoutes><Layout>
              <Groups />
            </Layout></ProtectedRoutes>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoutes>
            <Layout>
              <Tasks />
            </Layout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/create-task"
          element={
            <ProtectedRoutes>
            <Layout>
              <CreateTask />
            </Layout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/plan-review"
          element={
            <ProtectedRoutes>
            <Layout>
              <PlanReview />
            </Layout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/ranking"
          element={
            <ProtectedRoutes>
            <Layout>
              <RankingPage />
            </Layout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/winner"
          element={
            <ProtectedRoutes>
            <Layout>
              <Winners />
            </Layout>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
            <Layout>
              <Profile />
            </Layout>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
