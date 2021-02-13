import React from 'react'
import s from './Logout.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from "../../actions/user"


const Logout = ({ btnWrapper }) => {
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logout())
  }

  return (
    <div className={btnWrapper}>
      <NavLink
        to={'/'}
        className={s.btn}
        onClick={handleLogOut}
      >
        Вийти
      </NavLink>
    </div>
  )
}

export default Logout