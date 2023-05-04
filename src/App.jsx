import { Route, Routes } from "react-router-dom";
import { Announce, Home, Login, Profile, Registration, Announcements } from './pages/index.js'
import Header from "./components/Header/Header.jsx";

const App = () => {
  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/announce/:id" element={<Announce />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/announcements" element={<Announcements/>} />
      </Routes>
    </>
  )
}

export default App;
