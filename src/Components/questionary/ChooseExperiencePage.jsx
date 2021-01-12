import React from 'react'
import { connect } from 'react-redux'
import { handleRedirect } from './handleRedirect'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import YearsOfExperience from './YearsOfExperience'
import Button from './Button'
import img from '../../Assets/img/start-choose-exp-background.svg'
import s from './Questionary.module.css'


const mapStateToProps = state => {
  return {
    authorized: state.authReducer.authorized,
    role      : state.authReducer.role,
  }
}

const ChooseExperiencePage = ({ authorized, role }) => {

  function renderContent() {
    return (
      <>
        <BackgroundImage
          img={img}
          imgClass={s.chooseExpImgBack}
        />
        <Text
          text="Скільки у тебе років досвіду на вказаному інструменті?"
          textWrapperClass={s.chooseExpTextWrapper}
          textClass={s.chooseExpText}
        />
        <div className={s.yearExpBtnsWrapper}>
          <YearsOfExperience count={1}/>
          <YearsOfExperience count={2}/>
          <YearsOfExperience count={3}/>
          <YearsOfExperience count={4}/>
          <YearsOfExperience count={5}/>
        </div>
        <Button
          btnText="продовжити"
          nextRoute="/quest-3"
          btnClass={s.chooseExpFinishBtn}
        />
      </>
    )
  }

  return (
    <div className={s.chooseExpPageWrapper}>
      {/*{*/}
      {/*  handleRedirect(authorized, role, renderContent)*/}
      {/*}*/}
      {renderContent()}
    </div>
  )
}

export default connect(mapStateToProps)(ChooseExperiencePage)