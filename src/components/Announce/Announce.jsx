import { Link } from 'react-router-dom'
import s from './Announce.module.css'

export const Announce = (props) => {
  return (
    <>
      <div className={s.announce_wrapper}>
        <p className={s.announce_title} >{props.title}</p>
        <p announce={s.announce_text} >{props.description}</p>
        <Link to={`/announce/${props.id}`}>Read more</Link>
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