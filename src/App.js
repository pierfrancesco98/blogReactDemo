import React, {useEffect, useState} from "react";
import Login from './components/Login/Login';
import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import { auth } from "./components/Firebase/Firebase";
import Profile from "./components/Profile/Profile";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home  user={user}/> : <Login />}
      />
       <Route
        path="/Profile"
        element={user ? <Profile user={user}/> : <Login />}
      />
    </Routes>
  );
}

export default App;