import { useNavigate } from "react-router";
import type { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const User = () => {
  const navigate = useNavigate();
  const avatar = useSelector((state: RootState) => state.auth.avatar);

  return (
    <div className="user"  onClick={() => navigate("/profile")}>
       <img
        src={avatar}
        alt="User avatar"
        style={{ width: "70px", height: "70px", borderRadius: "50%" }}
       />
    </div>
  );
};

export default User;