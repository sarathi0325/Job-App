import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {IoStarSharp} from 'react-icons/io5'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'
import Header from '../Header'
import SimilarItems from '../SimilarItems'
import SkillCard from '../SkillCard'
import './index.css'

const JobsDetails = props => {
  const [apiStatus, setApiStatus] = useState('')
  const [jobItem, setJobItem] = useState({})
  const [similarItems, setSimilarItems] = useState([])

  const fetchItem = async () => {
    setApiStatus('loading')
    const {match} = props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const jsonJobItemDetail = data.job_details
      const formatedJobItemDetails = {
        companyLogoUrl: jsonJobItemDetail.company_logo_url,
        companyWebsiteUrl: jsonJobItemDetail.company_website_url,
        employmentType: jsonJobItemDetail.employment_type,
        title: jsonJobItemDetail.title,
        id: jsonJobItemDetail.id,
        jobDescription: jsonJobItemDetail.job_description,
        skills: jsonJobItemDetail.skills.map(each => ({
          name: each.name,
          imgUrl: each.image_url,
        })),
        lifeAtCompany: {
          description: jsonJobItemDetail.life_at_company.description,
          imgUrl: jsonJobItemDetail.life_at_company.image_url,
        },
        location: jsonJobItemDetail.location,
        packagePerAnnum: jsonJobItemDetail.package_per_annum,
        rating: jsonJobItemDetail.rating,
      }
      const formatedSimilarItems = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      setJobItem(formatedJobItemDetails)
      setSimilarItems(formatedSimilarItems)
      setApiStatus('succeed')
    } else {
      setApiStatus('failed')
    }
  }

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderSuccess = () => {
    const {
      companyLogoUrl,
      lifeAtCompany,
      companyWebsiteUrl,
      employmentType,
      packagePerAnnum,
      location,
      skills,
      jobDescription,
      rating,
      title,
    } = jobItem
    return (
      <div className="success-container-bg">
        <div className="item-jobcard">
          <div className="item-logo-title-container">
            <img
              width="50px"
              alt="job details company logo"
              src={companyLogoUrl}
            />
            <div className="item-company-title-con">
              <h2>{title}</h2>
              <div className="item-rating-con">
                <IoStarSharp color="#fbbf24" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="item-job-details">
            <div className="item-location-worktype-container">
              <div className="item-location">
                <MdLocationOn />
                <p>{location}</p>
              </div>
              <div className="item-work-type-container">
                <BsBriefcaseFill />
                <p>{employmentType}</p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="item-description-container">
            <div className="item-description-route">
              <h3>Description</h3>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
                className="visit-btn"
              >
                Visit <BsBoxArrowUpRight />
              </a>
            </div>
            <p>{jobDescription}</p>
          </div>
          <div className="item-skills-container">
            <h3>Skills</h3>
            <ul className="item-skill-list">
              {skills.map(each => (
                <SkillCard key={each.name} skill={each} />
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <div className="life-desc-con">
              <h1>Life At Company</h1>
              <p>{lifeAtCompany.description}</p>
            </div>
            <div className="item-img-container">
              <img alt="life at company" src={lifeAtCompany.imgUrl} />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container-bg">
          <h1>Similar Jobs</h1>
          <ul className="similar-jobs-container">
            {similarItems.map(each => (
              <SimilarItems key={each.id} similarItem={each} />
            ))}
          </ul>
        </div>
      </div>
    )
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
      <button onClick={fetchItem} type="button">
        Retry
      </button>
    </div>
  )

  const renderApp = () => {
    switch (apiStatus) {
      case 'loading':
        return renderLoader()
      case 'succeed':
        return renderSuccess()
      case 'failed':
        return renderFailure()
      default:
        return null
    }
  }

  useEffect(() => {
    fetchItem()
  }, [])

  return (
    <div className="jobs-item-container-bg">
      <Header />
      {renderApp()}
    </div>
  )
}
export default JobsDetails
