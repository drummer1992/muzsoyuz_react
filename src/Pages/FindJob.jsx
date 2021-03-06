import React from 'react'
import s from './FindJob.module.css'
import img from '../Assets/img/drums.png'
import Header from '../Components/common/Header'
import Footer from '../Components/common/Footer'
import { MuzSoyuzRequest } from '../muzsoyuz-request'
import { connect } from 'react-redux'
import preloader from '../Assets/img/preloader.gif'
import { pageRoute } from '../actions/routingActions'


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
      <div className={s.jobsWrapper}>
        {
          data && this.state.fetchedData.map(item => {
            const date = new Date(item.date)

            let month = date.toLocaleString('default', { month: 'short' })
            month = month.charAt(0).toUpperCase() + month.slice(1, month.length - 1)

            const salary = item.salary.slice(0, -3)

            return <li key={item.id} className={s.list}>
              <div className={s.jobOfferWrapper}>
                <img src={item.imageURL} alt='Job offer'/>
                <div>
                  <p className={s.jobTitle}>{item.title}</p>
                  <p className={s.jobSalary}>Оплата: {salary}, Грн</p>
                </div>
                <p className={s.jobDate}>{date.getDate()} {month}</p>
              </div>
            </li>
          })
        }
      </div>
    )
  }

  async getAllJobOffers() {
    const response = await MuzSoyuzRequest.getJobOffers('musicalReplacement')
      .props([
        'id',
        'title',
        'date',
        'role',
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
        <div className={s.sortFilterButtons}>
          <button>Сортувати</button>
          <button>Фільтр</button>
        </div>
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
      </div>
    )
  }
}

export default connect(mapStateToProps)(FindJob)