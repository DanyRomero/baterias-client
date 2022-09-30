import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import { getLoggedIn, logout } from "./services/auth";
import routes from "./config/routes";
import * as USER_HELPERS from "./utils/userToken";
import LogIn from "./pages/LogIn";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Brands from "./pages/Brands";
import Batteries from "./pages/Batteries";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  function handleLogout() {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      setUser(null);
      return setIsLoading(false);
    }
    setIsLoading(true);
    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error("Logout was unsuccessful: ", res);
      }
      USER_HELPERS.removeUserToken();
      setIsLoading(false);
      return setUser(null);
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="App">
      <Navbar handleLogout={handleLogout} user={user} />
      <Routes>
       {/*  {routes({ user, authenticate, handleLogout }).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))} */}

        <Route path="/" element={<HomePage />}/>
        <Route path="/admin" element={<LogIn authenticate={authenticate} />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/marcas" element={user ? <Brands /> : <Navigate to="/admin" replace />}/>
        <Route path="/baterias" element={user ? <Batteries /> : <Navigate to="/admin" replace />}/>
        
        

      </Routes>
    </div>
  );
}
