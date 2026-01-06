import "../styles/components/navbar.scss";
import logoutIcon from "../assets/logout.svg";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { useToast } from "../hooks/useToast";

const Navbar = () => {
  const { setIsAuthenticated } = useAuth();
  const toast = useToast();
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/logout`
      );
      if (res.status == 200) {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
      toast.addToast("Logout failed. Please try again.", "error");
    }
  };

  return (
    <div className="nav-con">
      <div className="nav">
        <header>Twitter Bot Manager</header>

        <button className="logout" onClick={handleLogout}>
          <img src={logoutIcon} alt="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
