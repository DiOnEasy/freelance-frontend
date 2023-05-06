import React from 'react';
import axios from '../../axios'
import { useState } from 'react';
import s from './FullAnnounce.module.css';


import { useParams } from 'react-router-dom';

export const FullAnnounce = () => {
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



  return (
    <>
      {isLoading
        ?
        <p>Loading...</p>
        :
        <div className={s.full_announce_wrapper}>
          <p className={s.announce_title} >{data.title}</p>
          <p announce={s.announce_text} >{data.description}</p>
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