import {IoStarSharp} from 'react-icons/io5'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarItems = props => {
  const {similarItem} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = similarItem
  return (
    <li className="similar-jobcard">
      <div className="similar-logo-title-container">
        <img width="50px" alt="similar job company logo" src={companyLogoUrl} />
        <div className="similar-company-title-con">
          <h1>{title}</h1>
          <div className="similar-rating-con">
            <IoStarSharp color="#fbbf24" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <div className="similar-description-container">
        <h2>Description</h2>
        <p>{jobDescription}</p>
      </div>
      <div className="similar-location-worktype-container">
        <div className="similar-location">
          <MdLocationOn />
          <p>{location}</p>
        </div>
        <div className="similar-work-type-container">
          <BsBriefcaseFill />
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarItems
