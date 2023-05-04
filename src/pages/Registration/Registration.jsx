import s from './Registration.module.css'

export const Registration = () => {
    return ( 
      <>
      <div className={s.login_wrapper}>
      <form className={s.login_content_wrapper} >
      <label htmlFor="name_input">Full name:</label>
      <input id='name_input' className={s.name_input} type="text" />
        <label htmlFor="email_input">Email:</label>
      <input id='email_input' className={s.email_input} type="text" />
      <label htmlFor="password_input">Password:</label>
      <input id='password_input' className={s.password_input} type="text" />
      <label htmlFor="avatar_input">Avatar:</label>
      <input id='avatar_input' className={s.avatarURL_input} type="text" />
      <button type='submit' >Login</button>
      </form>
      </div>
      </>
    )
  }
  
  