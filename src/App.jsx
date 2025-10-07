import { Toaster } from "react-hot-toast";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";

function App() {
  return (
      <div className="bg-amber-200">
      <Toaster />
        <Routes>
          <Route path="/" element={<ChatRoom/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />          
          <Route path="/chatroom" element={<ChatRoom/>} />          

        </Routes>
      </div>
  );
}

export default App;
