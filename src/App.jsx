import { Route, Routes } from "react-router-dom";
import { FullAnnounce, Home, Login, Profile, Registration, Announcements, AddAnnounce } from './pages/index.js'
import Header from './components/Header/Header.jsx'
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth.js";
import { MyOrders } from "./pages/MyOrders/MyOrders.jsx";

const App = () => {
  const dispatch = useDispatch();

  const { status : userStatus } = useSelector(state => state.auth)


  const isAuth = useSelector(selectIsAuth)


  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  if(userStatus === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/announce/:id" element={<FullAnnounce />} />
        <Route path="/announce/:id/edit" element={<AddAnnounce />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/add-announce" element={<AddAnnounce />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </>
  )
}

export default App;
