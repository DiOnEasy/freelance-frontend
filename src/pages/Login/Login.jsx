import s from './Login.module.css'

export const Login = () => {
    return ( 
      <>
      <div className={s.login_wrapper}>
      <form className={s.login_content_wrapper} >
        <label htmlFor="email_input">Email:</label>
      <input id='email_input' className={s.email_input} type="text" />
      <label htmlFor="password_input">Password:</label>
      <input id='password_input' className={s.password_input} type="text" />
      <button type='submit' >Login</button>
      </form>
      </div>
      </>
    )
  }
    