import {IoStarSharp} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobCardDetails

  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobcard">
        <div className="logo-title-container">
          <img
            width="50px"
            alt="job details company logo"
            src={companyLogoUrl}
          />
          <div className="company-title-con">
            <h2>{title}</h2>
            <div className="rating-con">
              <IoStarSharp color="#fbbf24" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details">
          <div className="location-worktype-container">
            <div className="location">
              <MdLocationOn />
              <p>{location}</p>
            </div>
            <div className="work-type-container">
              <BsBriefcaseFill />
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="description-container">
          <h2>Description</h2>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
