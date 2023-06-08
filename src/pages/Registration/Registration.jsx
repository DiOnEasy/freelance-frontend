import { useDispatch, useSelector } from 'react-redux';
import s from './Registration.module.css'
import { useForm } from 'react-hook-form';
import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Registration = () => {

  const isAuth = useSelector(selectIsAuth)

  const dispatch = useDispatch();

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: 'Tomas Tomasovy4',
      email: 'test@test.com',
      password: '12345',
    }
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))
    if (!data.payload) {
      alert('Couldn`t register')

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
          <label htmlFor="name_input">Full name:</label>
          <input
            {...register('fullName', { required: 'Please enter you full name' })}
            id='name_input'
            className={s.name_input}
            type="text"
          />
          <label htmlFor="email_input">{errors.fullName?.message}</label>
          <label htmlFor="email_input">Email:</label>
          <input
            {...register('email', { required: 'Please enter email' })}
            id='email_input'
            className={s.email_input}
            type="email"
          />
          <label htmlFor="email_input">{errors.email?.message}</label>

          <label htmlFor="password_input">Password:</label>
          <input
            {...register('password', { required: 'Please enter password' })}
            id='password_input'
            className={s.password_input}
            type="password"
          />
          <label htmlFor="email_input">{errors.password?.message}</label>
          <button type='submit' >Register</button>
        </form>
      </div>
}
    </>
  )
}

