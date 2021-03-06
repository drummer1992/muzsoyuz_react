import React from 'react'
import s from './Profile.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


const handleLogoutRedux = () => ({
  type: 'LOGOUT',
})

class Profile extends React.Component {

  handleLogOut(dispatch) {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')

      dispatch(handleLogoutRedux())
    }
    catch (error) {
      alert(error.message)
    }
  }

  render() {
    return (
      <div>
        <NavLink to="" className={s.logoutButton} onClick={() => this.props.dispatch(this.handleLogOut)}>Выйти</NavLink>
      </div>
    )
  }
}

export default connect(undefined)(Profile)