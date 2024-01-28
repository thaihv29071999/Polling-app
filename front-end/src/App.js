import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthenLogin } from "./components/Header";
import { io } from 'socket.io-client';
import PageNotFound from "./components/PageNotFound";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NewPoll from "./pages/NewPoll";
import Poll from "./pages/Poll";
const socket = io('http://localhost:3100', {transports : ["websocket", "polling"],  withCredentials: true});
function App() {
  return (
    <div className="container mx-auto py-4">
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/" element={<AuthenLogin />}>
            <Route path="/" exact element={<HomePage socket={socket} />} />
            <Route path="/new-poll" element={<NewPoll socket={socket}  />} />
            <Route path="/poll/:pollId" element={<Poll socket={socket}/>} />
          </Route>
          <Route path="*" exact element={<PageNotFound />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
