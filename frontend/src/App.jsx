import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.userSlice);
  console.log(user);
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
