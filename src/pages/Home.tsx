import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Hola, bienvenido</h1>
      <div>
        <button onClick={() => navigate("/build")}>Crear tarea</button>
        <button onClick={() => navigate("/list")}>Ver lista de tareas</button>
      </div>
    </>
  );
};

export default Home;
