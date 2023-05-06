import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import s from './Login.module.css'

import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

import { useForm } from 'react-hook-form'

export const Login = () => {

  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch();

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: 'test@test.com',
      password: '12345',
    }
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    if (!data.payload) {
      alert('Couldn`t auth')

    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }
  console.log('is auth:', isAuth)

  return (
    <>
      {isAuth
        ?
        <Navigate to="/" />
        :
        <div className={s.login_wrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={s.login_content_wrapper} >
            <label htmlFor="email_input">Email:</label>
            <input
              id='email_input'
              className={s.email_input}
              type="email"
              {...register('email', { required: 'Please enter email' })}

            />
            <label htmlFor="email_input">{errors.email?.message}</label>
            <label htmlFor="password_input">Password:</label>
            <input
              id='password_input'
              className={s.password_input}
              type="text"
              {...register('password', { required: 'Please enter password' })}
            />
            <label htmlFor="password_input">{errors.password?.message}</label>
            <button type='submit' >Login</button>
          </form>
        </div>}
    </>
  )
}
