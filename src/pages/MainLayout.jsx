import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, logout, setAuthToken } from "../api/auth";
import { AppBar, LeftNav, Logo, RightNav } from "../components/AppBar";
import { Button } from "../components/Button";

export default function MainLayout() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken();

    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUsername(user.username);
      } catch (err) {
        logout();
        navigate("/");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <AppBar>
        <LeftNav>
          <Logo>Foine</Logo>
          <NavLink to="/landing">Gallery</NavLink>
          <NavLink to="/create">Create</NavLink>
        </LeftNav>

        <RightNav>
          <h4>{username}</h4>
          <Button variant="text" onClick={handleLogout}>
            Logout
          </Button>
        </RightNav>
      </AppBar>

      
      <Outlet />
    </>
  );
}
