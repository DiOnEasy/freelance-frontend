import { Link } from "react-router-dom";

const Header = () => {
    return (
    <>
      <header>
        <span>
        <img src="" alt="logo" />
        </span>
        <span><Link to='/'>Home</Link></span>
        <span><Link to='/announcements'>Announcements</Link></span>
        <span><Link to='/profile'>My profile</Link></span>
      </header>
    </>
    )
  }
  
  export default Header;
  