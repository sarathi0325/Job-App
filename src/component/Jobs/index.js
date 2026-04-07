import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import ProfileData from '../ProfileData'
import FilterGroup from '../FilterGroup'
import JobCard from '../JobCard'
import Header from '../Header'
import './index.css'

const Jobs = () => {
  const [typeOfEmployment, setTypeOfEmployement] = useState([])
  const [jobsList, setJobsList] = useState([])
  const [apiStatus, setApiStatus] = useState('')
  const [salaryRange, setSalaryRange] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const onChangeSearch = event => {
    setSearchValue(event.target.value)
  }

  const onChangeSalaryRange = salaryRangeId => {
    setSalaryRange(salaryRangeId)
  }

  const onRemoveEmploymentTypeList = value => {
    setTypeOfEmployement(prev => prev.filter(each => each !== value))
  }

  const onAddEmploymentTypeList = value => {
    setTypeOfEmployement(prev => [...prev, value])
  }

  const getJobsList = async () => {
    setApiStatus('loading')
    const employmentTypeQuery = typeOfEmployment.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${salaryRange}&search=${searchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const jsonData = data.jobs
      const formatedData = jsonData.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      setJobsList(formatedData)
      setApiStatus('succeed')
    } else {
      setApiStatus('failed')
    }
  }

  const onSearch = () => {
    getJobsList()
  }

  const renderFailure = () => (
    <div className="failure-container">
      <div className="img-failure-con">
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        />
      </div>
      <h1>Oops! Something Went Wrong</h1>
      <p> We cannot seem to find the page you are looking for.</p>
      <button onClick={getJobsList} type="submit">
        Retry
      </button>
    </div>
  )

  const renderSuccess = () =>
    jobsList.length > 0 ? (
      <ul className="jobs-list">
        {jobsList.map(each => (
          <JobCard key={each.id} jobCardDetails={each} />
        ))}
      </ul>
    ) : (
      <div className="no-products-container">
        <div className="img-failure-con">
          <img
            alt="no jobs"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          />
        </div>
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. try other filters.</p>
      </div>
    )

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderApp = () => {
    switch (apiStatus) {
      case 'loading':
        return renderLoader()
      case 'failed':
        return renderFailure()
      case 'succeed':
        return renderSuccess()
      default:
        return null
    }
  }

  useEffect(() => {
    getJobsList()
  }, [typeOfEmployment, salaryRange, searchValue])

  return (
    <div className="jobs-portal-container-bg">
      <Header />
      <div className="jobs-portal-container">
        <div className="input-container-search-sm">
          <input
            placeholder="Search"
            className="search-input"
            onChange={onChangeSearch}
            value={searchValue}
            type="search"
          />
          <button data-testid="searchButton" onClick={onSearch} type="button">
            <FaSearch />
          </button>
        </div>
        <div className="profile-and-filter-container">
          <ProfileData />
          <FilterGroup
            onAddEmploymentTypeList={onAddEmploymentTypeList}
            onRemoveEmploymentTypeList={onRemoveEmploymentTypeList}
            onChangeSalaryRange={onChangeSalaryRange}
            typeOfEmployment={typeOfEmployment}
            salaryRange={salaryRange}
          />
        </div>
        <div className="jobs-portal">
          <div className="input-container-search-md">
            <input
              placeholder="Search"
              className="search-input"
              onChange={onChangeSearch}
              value={searchValue}
              type="search"
            />
            <button data-testid="searchButton" onClick={onSearch} type="button">
              <FaSearch />
            </button>
          </div>
          {renderApp()}
        </div>
      </div>
    </div>
  )
}
export default Jobs
