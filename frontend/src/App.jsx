import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSlice.status);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (localStorageUser) {
      dispatch(login({ data: localStorageUser }));
    }
  }, [localStorageUser, dispatch]);

  return (
    <Routes>
      <Route
        path="/auth"
        element={user ? <Navigate to={"/"} /> : <AuthPage />}
      />
      <Route
        path="/"
        element={user ? <HomePage /> : <Navigate to={"/auth"} />}
      />
    </Routes>
  );
}

export default App;
