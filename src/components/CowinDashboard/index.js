// Write your code here
// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccination: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    console.log(response)
    if (response.ok === true) {
      const fetchData = await response.json()
      console.log(fetchData)
      const data = fetchData.last_7_days_vaccination
      const dataFromAge = fetchData.vaccination_by_age
      const dataFromGender = fetchData.vaccination_by_gender
      this.setState({
        vaccination: data,
        vaccinationByAge: dataFromAge,
        vaccinationByGender: dataFromGender,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      console.log('error')
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderDetailsOfCowin = () => {
    const {vaccination, vaccinationByAge, vaccinationByGender} = this.state
    return (
      <div className="bg-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="logo-name">Co-WIN</h1>
        </div>
        <h1 className="main-heading">CoWIN Vaccination in India</h1>
        <VaccinationCoverage vaccination={vaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </div>
    )
  }

  renderFailureViwe = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />

      <h1>Something went wrong</h1>
    </div>
  )

  renderInProgressView = () => {
    console.log('')
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderDetailsOfCowin()
      case apiStatusConstants.failure:
        return this.renderFailureViwe()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }
}

export default CowinDashboard
