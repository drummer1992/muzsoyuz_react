import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { pageRoute } from '../../actions/routingActions'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import { fetchAuthStatusFailure } from '../../actions/getProfileActions'
import HeaderInternal from '../common/HeaderInternal'
import HeaderInternalButtons from '../common/HeaderInternalButtons'
import AboutMe from './AboutMe'
import s from './Profile.module.css'


const mapStateToProps = state => {
  return {
    loading   : state.authReducer.loading,
    authorized: state.authReducer.authorized,
    prevRoute : state.pageReducer.prevRoute
  }
}

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userProfile: {},
    }
  }

  // noinspection JSCheckFunctionSignatures
  async componentDidMount() {
    this.props.dispatch(pageRoute('PROFILE', this.props.prevRoute))

    await this.getUserData()
  }

  async getUserData() {
    try {
      const response = await MuzSoyuzRequest.getUserProfile()

      console.log(response)

      this.setState({ userProfile: response })
    }
    catch (e) {
      this.props.dispatch(fetchAuthStatusFailure(e.message))
    }
  }

  userAuthorized() {
    const user = this.state.userProfile

    return (
      <div className={s.profileWrapper}>
        <HeaderInternal
          prevRoute={this.props.prevRoute}
          heading="Профіль"
          wrapperClass={s.headerWrapper}
          btnTextClass={s.headerBtnText}
          redirectTo=""
        />
        <div className={s.headerButtons}>
          <HeaderInternalButtons
            firstText="Про себе"
            firstRoute="/profile"
            secondText="Налаштування"
            secondRoute="/settings"
            btnClass={s.btnClass}
            active={s.active}
          />
        </div>
        <div className={s.row}/>
        <AboutMe user={user}/>
      </div>
    )
  }


  render() {
    return (
      <div>
        {
          this.props.authorized === false
          ? <Redirect to='/login'/>
          : this.userAuthorized()
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Profile)