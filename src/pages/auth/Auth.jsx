import React from 'react'
import { NavLink } from 'react-router-dom'
import AuthForm from './AuthForm'
import SocialMedias from './SocialMedias'
import s from './Auth.module.css'
import logo from '../../assets/img/logo.svg'

const Auth = ({ type }) => (
  <div className={s.wrapper}>
    <div>
      <NavLink to='/'><img src={logo} alt="Logo" className={s.logo}/></NavLink>
    </div>
    <AuthForm type={type}/>
    <SocialMedias type={type}/>
  </div>
)

export default Auth