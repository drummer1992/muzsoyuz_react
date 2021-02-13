import React from 'react'
import { Redirect } from 'react-router'

class BasicAuth extends React.Component {
  handleRedirect(user) {
    const { profile } = user

    if (profile.loaded && !profile.role) {
      return <Redirect to='/quest-start'/>
    } else if (user.loaded && user.token) {
      return <Redirect to={'/'}/>
    }
  }
}

export default BasicAuth