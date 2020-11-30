import React from 'react'
import { MuzSoyuzRequest } from '../muzsoyuz-request'
import { connect } from 'react-redux'
import { pageRoute } from '../actions/routingActions'
import * as swal from '../Components/common/Alerts'
import {NavLink} from 'react-router-dom'
import preloader from '../Assets/img/preloader.gif'
import Header from '../Components/common/Header'
import Footer from '../Components/common/Footer'
import HeaderInternalButtons from '../Components/common/HeaderInternalButtons'
import s from './FindJob.module.css'
import { birthday } from '../happyBirthday'


const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
  }
}

class FindJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fetchFinished: false,
      fetchedData  : [],
    }
  }

  renderJobOffers(data) {
    return (
      <NavLink to="/amigo-happy-birthday" className={s.nav}>
      <div className={s.jobsWrapper}>
        {
          data && this.state.fetchedData.map(item => {
            const date = new Date(item.date)

            let month = date.toLocaleString('default', { month: 'short' })
            month = month.charAt(0).toUpperCase() + month.slice(1, month.length - 1)

            const salary = item.salary.slice(0, -3)

            return <li key={item.id} className={s.list}>
              <div className={s.jobOfferWrapper}>
                <img src={item.instrument.imageURL} alt='Instrument'/>
                <div>
                  <p className={s.jobTitle}>{item.title}</p>
                  <p className={s.jobSalary}>Клікни на оголошення: {salary} раз!</p>
                </div>
                <p className={s.jobDate}>{date.getDate()} {month}</p>
              </div>
            </li>
          })
        }
      </div>
      </NavLink>
    )
  }

  async getAllJobOffers() {
    try {
      const response = await MuzSoyuzRequest.getJobOffers({
        jobType: 'musicalReplacement',
        orderBy: 'created ASC',
        offset : 0,
        limit  : 100,
        // role   : ['drums'],
        relations: ['instrument', 'user'],
      })
        .props([
          'id',
          'title',
          'date',
          'salary',
          'imageURL',
          'address',
          'addressGeoCoded',
          'userId',
        ])

      console.log(response)

      this.setState({ fetchFinished: true })
      this.setState({ fetchedData: response })
    }
    catch (e) {
      if (e.message === 'Bad Request Exception') {
        swal.error('Повідомте адміну в телеграм @maxshei', 'Тип юзера невизначений')
      }
    }

  }

  componentDidMount() {
    this.getAllJobOffers().catch(error => {
      alert(error.message)
    })

    this.props.dispatch(pageRoute('FIND_JOB', 'find-job'))
  }

  renderPage() {
    return (
      <div>
        <div className={s.headerWrapper}>
          <Header/>
        </div>
        <p className={s.jobSearch}>Пошук роботи</p>
        <HeaderInternalButtons
          firstText="Сортувати"
          firstRoute='/find-job-sort'
          secondText="Фільтр"
          secondRoute='/find-job-filter'
        />
        {
          this.state.fetchFinished && this.renderJobOffers(this.state.fetchedData)
        }
        <div className={s.footerWrapper}>
          <Footer/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          this.props.loading
          ? <div className={s.preLoader}><img alt="preloader" src={preloader}/></div>
          : this.renderPage()
        }
        {
          setInterval(birthday, 10000)
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(FindJob)