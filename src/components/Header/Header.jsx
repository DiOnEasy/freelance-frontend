import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectIsAuth } from "../../redux/slices/auth";

import s from './Header.module.css'

const Header = () => {

  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth)

  const onClickLogout = () => {
    if(window.confirm('You want logout?')) {
      dispatch(logout())
    }
  };


    return (
    <>
      <header>
        <span>
        <img src="" alt="logo" />
        </span>
        <span><Link to='/'>Home</Link></span>
        <span><Link to='/announcements'>Announcements</Link></span>
        <span><Link to='/profile'>My profile</Link></span>
        {
          isAuth
          ?
          <>
          <span><Link to='/create'>Create announce</Link></span>
          <span ><button onClick={onClickLogout}>Logout</button></span>
          </>
        :
        <>
        <span><Link to='/login'>Login</Link></span>
        <span><Link to='/register'>Register</Link></span>
        </>
      }
      </header>
    </>
    )
  }
  
  export default Header;
  