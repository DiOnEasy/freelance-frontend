import s from './Profile.module.css';
import { useSelector } from 'react-redux';
import { Announce } from '../../components/Announce/Announce';
import { useState } from 'react';
import ReactModal from 'react-modal';
import axios from '../../axios';
import React from 'react';

export const Profile = () => {

  const announcements = useSelector(state => state.announcements.announcements);
  const { userData } = useSelector(state => state.auth.data)
  console.log(userData)

  const [fields, setFields] = useState({
    nickName: '',
    userProfession: '',
    userDescription: '',
    userCountry: '',
    avatar: '',
  }
  )

  React.useEffect(() => {
    setFields({
      nickName: userData.nickName,
      userProfession: userData.userProfession,
      userDescription: userData.userDescription,
      userCountry: userData.userCountry,
      avatar: userData.avatar,
    })
  }, [])

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('file', file);
      const { data } = await axios.post('/upload', formData);
      setFields((exValues) => ({ ...exValues, avatar: data.url }));
      console.log(data)
    } catch (err) {
      console.warn(err);
      alert('Didn`t upload file')
    }
  }
  console.log(fields)

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = async () => {
    await axios.patch(`/auth/me`, fields)

  }

  return (
    <>

      <div className={s.profile_wrapper}>
        <div className={s.profile_info}>
          <div className={s.profile_img} >
            <img src={`http://localhost:4000${userData.avatar}`} alt="" />
          </div>
          <p className={s.nickname}>{userData.nickName}</p>
          <span> < svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4 21V18.5C4 15.4624 6.46243 13 9.5 13H13.5M8 21V18M16 6.5C16 8.70914 14.2091 10.5 12 10.5C9.79086 10.5 8 8.70914 8 6.5C8 4.29086 9.79086 2.5 12 2.5C14.2091 2.5 16 4.29086 16 6.5ZM22 15.5C22 17.9853 17.5 22 17.5 22C17.5 22 13 17.9853 13 15.5C13 13.0147 15.0147 11 17.5 11C19.9853 11 22 13.0147 22 15.5ZM19 15.5C19 16.3284 18.3284 17 17.5 17C16.6716 17 16 16.3284 16 15.5C16 14.6716 16.6716 14 17.5 14C18.3284 14 19 14.6716 19 15.5Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4"></path></g>
          </svg>
            <p className={s.country}>{userData.userCountry}</p>
          </span>
          <span>
            <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#000000"></rect> <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#000000"></rect> <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#000000"></rect> </g>
            </svg>
            <p className={s.reg_date}>{userData.createdAt.split("T")[0]}</p>
          </span>

          <p></p>
        </div>
        <div className={s.profile_content}>
          <p className={s.fullname}>{userData.fullName} <span>
            <svg onClick={openModal} width="64px" height="64px" viewBox="-24 -24 72.00 72.00" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#27a4ab" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#27a4ab" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"></polygon> </g> </g> </g> </g></svg>
          </span> </p>
          <p className={s.profession}>{userData.userProfession}</p>
          <p className={s.text}>{userData.userDescription}</p>
        </div>
      </div>
      <div className={s.announce}>

        {
          (announcements.items).filter(announce => announce.user._id === userData?._id).map((announce, index) =>
          (
            <Announce
              isEditable={true}
              key={index}
              id={announce._id}
              title={announce.title}
              description={announce.description}
              tags={announce.tags}
              viewsNum={announce.viewsNum}
              user={announce.user}

            />
          )

          )
        }
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Модальное окно"
      >
        <div className={s.update__modal}>
          <input value={fields.nickName} onChange={(e) => { setFields((exValues) => ({ ...exValues, nickName: e.target.value })) }} type="text" placeholder='Select your NickName' />
          <input value={fields.userCountry} onChange={(e) => { setFields((exValues) => ({ ...exValues, userCountry: e.target.value })) }} type="text" placeholder='Select your country' />
          <input value={fields.userProfession} onChange={(e) => { setFields((exValues) => ({ ...exValues, userProfession: e.target.value })) }} type="text" placeholder='Select your profession' />
          <textarea value={fields.userDescription} onChange={(e) => { setFields((exValues) => ({ ...exValues, userDescription: e.target.value })) }} placeholder='Enter your profile description' cols="30" rows="10"></textarea>
          <p>Avatar:</p>
          <input onChange={handleChangeFile} type="file" />
          <button onClick={() => {
            onSubmit();
            closeModal()
          }} className={s.modal__button}>Submit</button>
          <button className={s.modal__button} onClick={closeModal}>Close</button>
        </div>


      </ReactModal>
    </>
  )
}
