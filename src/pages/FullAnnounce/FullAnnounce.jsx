import React from 'react';
import axios from '../../axios'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import s from './FullAnnounce.module.css';
import ReactModal from 'react-modal';



import { useNavigate, useParams } from 'react-router-dom';

export const FullAnnounce = () => {
  const navigate = useNavigate()




  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { userData } = useSelector(state => state.auth.data)

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`/announce/${id}`).then(res => {
      setData(res.data)
      setIsLoading(false)
    }).catch(() => {
      alert('Announce has not been received')
    })
  }, [])

  const [fields, setFields] = useState({
    taskId: '',
    customerId: '',
    taskName: 'taskname',
    taskDescription: 'descritption',
  }
  )

  React.useEffect(() => {
    if (!isLoading && data) {
      setFields(prevFields => ({
        ...prevFields,
        taskId: data._id,
        customerId: data.user,
      }));
    }
  }, [isLoading, data]);

  const submitOffer = async () => {
    try {
      await axios.post('/task', fields)
      await axios.post('/chat', fields)

      navigate(`/announcements`)
    }
    catch (err) {
      console.warn(err);
      alert('Didn`t create offer')
    }
  }

  console.log(data)
  console.log(userData)


  return (
    <>
      {isLoading
        ?
        <p>Loading...</p>
        :
        <div className={s.full_announce_wrapper}>
          <p className={s.announce__title} >{data.title}</p>
          <p className={s.announce__text} >{data.description}</p>
          <div className={s.announce__info}>
            <p>Price: {data.price}$</p>
            <p> Timeline: {data.timeLine} day(s)</p>
          </div>
          <div className={s.button__wrapper}>
            {
            data.user !== userData?._id
              ?
              <button onClick={openModal} className={s.offer__button}>Offer a service</button>
              :
              null
            }
            <ReactModal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Модальное окно"
            >
              <input value={fields.taskName} onChange={(e) => { setFields((exValues) => ({ ...exValues, taskName: e.target.value })) }} className={s.task__name} type="text" placeholder="The name of the task" />
              <textarea rows="10" value={fields.taskDescription} onChange={(e) => { setFields((exValues) => ({ ...exValues, taskDescription: e.target.value })) }} className={s.task__description} type="text" placeholder='How will you perform this task?' />
              <button className={s.modal__button} onClick={submitOffer}>Submit offer</button>
              <button className={s.modal__button} onClick={closeModal}>Close</button>
            </ReactModal>
          </div>
        </div>
      }
    </>
  )
}

  // <>
  //    <div key={announce.id} className={s.announce_wrapper}>
  //                           <p className={s.announce_title} >{announce.title}</p>
  //                           <p announce={s.announce_text} >{announce.text}</p>
  //                           <button>Read more</button>
  //                       </div>
  //   </>