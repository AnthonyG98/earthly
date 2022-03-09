import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Setup from "./components/Setup";
import Submit from "./components/Submit";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
function App() {
      return (
            <>
                  <Router>
                        <Routes>
                              <Route path="/" element={<Login />} />
                              <Route path="/signup" element={<Signup />} />
                              <Route path="/dashboard" element={<Dashboard />} />
                              <Route path="/setup" element={<Setup />} />
                              <Route path="/submit" element={<Submit />} />
                              <Route path="/profile" element={<Profile />} />
                        </Routes>
                  </Router>
                  <Footer />
            </>
      );
}

export default App;
