import s from './Home.module.css'

export const Home = () => {
  return (
    <div className={s.home__wrapper}>
      <img src="/home-logo.svg" alt="" />
      <p>CatLancer is an innovative freelance marketplace that specialises in providing a platform for clients and freelancers looking for collaboration opportunities in software development, design, writing services, marketing and many other fields.</p>
      <p>This bachelor's thesis was developed by a 4th year student of group 2kn-19b, Denys Stasyshen</p>
    </div>
  )
}

