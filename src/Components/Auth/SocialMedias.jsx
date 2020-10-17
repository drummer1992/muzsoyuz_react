import React from 'react'
import s from './SocialMedias.module.css'


class SocialMedias extends React.Component {

  #FORM_TYPE_MAP = {
    register: 'зарегистрироваться',
    login: 'войти',
  }

  getLinks() {
    return (
      <div className={s.socialIcons}>
        <a href="http://localhost:9000/api/v1/auth/oauth/facebook"><input type="button" className={s.facebookIcon} value="Facebook"/></a>
        <a href="http://localhost:9000/api/v1/auth/oauth/google"><input type="button" className={s.googleIcon} value="Google"/></a>
      </div>
    )
  }

  drawAuthSocialBtns(word) {
    return (
      <div className={s.socialMedias}>
        <p className={s.authWith}>{`или ${word} с помощью`}</p>
        {
          this.getLinks()
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          this.drawAuthSocialBtns(this.#FORM_TYPE_MAP[this.props.type])
        }
      </div>
    )
  }
}

export default SocialMedias