import { Link } from 'react-router-dom'
import s from './Announce.module.css'
import { useDispatch, useSelector } from 'react-redux';

import { fetchRemoveAnnounce } from '../../redux/slices/announcements';



export const Announce = ( { isEditable, id, title, description, tags, user, viewsNum, key, }) => {


  const dispath = useDispatch();

  const onClickRemove = () => {
    if (window.confirm('You want delete this post?')) {
      dispath(fetchRemoveAnnounce(id))
    }
  }

  return (
    <>
      <div className={s.announce_wrapper}>
        <p className={s.announce_title} >{title}</p>
        <p className={s.announce_text} >{description}</p>
        <Link className={s.read__more} to={`/announce/${id}`}>Read more</Link>
        <div className={s.buttons}>

          {isEditable 
          ?
          <>
          <button className={s.remove_button} onClick={onClickRemove}>Delete</button>
          <Link className={s.edit_button} to={`/announce/${id}/edit`}> Edit</Link>
          </>
          :
          null
          }
        
        </div>
      </div>
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