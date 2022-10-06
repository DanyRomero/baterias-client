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
import Models from "./pages/Models";
import Years from "./pages/Years";
import AdminLayout from "./components/AdminLayout";
import SelectBattery from "./pages/SelectBattery";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound"
import Address from "./pages/Address";
import Thanks from "./pages/Thanks"

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bateria" element={<SelectBattery />} />
        <Route path="/direccion" element={<Address />} />
        <Route path="/orden" element={<Order />} />
        <Route path="/confirmacion" element={<Thanks />} />
        <Route path ="*" element={<NotFound />} />
        <Route
          element={<AdminLayout handleLogout={handleLogout} user={user} />}
        >
          <Route
            path="/admin"
            element={<LogIn authenticate={authenticate} />}
          />
          <Route 
          path="/usuarios" 
          element={user ? <Signup authenticate={authenticate}/> : <Navigate to="/admin" replace /> }
          />
          <Route
            path="/marcas"
            element={user ? <Brands /> : <Navigate to="/admin" replace />}
          />
          <Route
            path="/baterias"
            element={user ? <Batteries /> : <Navigate to="/admin" replace />}
          />
          <Route
            path="/marcas/:id"
            element={user ? <Models /> : <Navigate to="/admin" replace />}
          />
          <Route
            path="/modelos/:id"
            element={user ? <Years /> : <Navigate to="/admin" replace />}
          />
          <Route
            path="/ordenes/"
            element={user ? <Orders /> : <Navigate to="/admin" replace />}
          />
        </Route>
      </Routes>
    </div>
  );
}
