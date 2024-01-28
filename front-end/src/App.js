import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthenLogin } from "./components/Header";
import PageNotFound from "./components/PageNotFound";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="container mx-auto py-4">
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/" element={<AuthenLogin />}>
            <Route path="/" exact element={<HomePage />} />
          </Route>
          <Route path="*" exact element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
