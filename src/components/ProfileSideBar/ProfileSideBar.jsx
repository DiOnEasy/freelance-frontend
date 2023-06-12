import { useSelector } from "react-redux"
import s from './ProfileSideBar.module.css'


export const ProfileSideBar = () => {

  const { userData } = useSelector(state => state.auth.data)


    return (
        <div className={s.side__wrapper}>
        <div >
          <img src={`http://localhost:4000${userData?.avatar}`} alt="" />
          <p className={s.nickname}>{userData.nickName}</p>
          <p className={s.fullname}>{userData.fullName} </p>
          <p></p>
        </div>
      </div>
    )
  }
  
  