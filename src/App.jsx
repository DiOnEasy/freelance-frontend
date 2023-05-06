import { Route, Routes } from "react-router-dom";
import { FullAnnounce, Home, Login, Profile, Registration, Announcements } from './pages/index.js'
import Header from './components/Header/Header.jsx'
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth.js";

const App = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth)


  React.useEffect(() =>{
    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/announce/:id" element={<FullAnnounce />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/announcements" element={<Announcements/>} />
      </Routes>
    </>
  )
}

export default App;
