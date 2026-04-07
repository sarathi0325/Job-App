import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

import {useState, useEffect} from 'react'

const ProfileData = () => {
  const [apiStatus, setApiStatus] = useState('')
  const [profileData, setProfileData] = useState({})

  const getProfile = async () => {
    setApiStatus('loading')
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jsonprofiledata = data.profile_details
      const updatedData = {
        name: jsonprofiledata.name,
        profileImageUrl: jsonprofiledata.profile_image_url,
        shortBio: jsonprofiledata.short_bio,
      }

      setApiStatus('succeed')
      setProfileData(updatedData)
    } else {
      setApiStatus('failed')
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderSuccess = () => {
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <>
        <div className="profile-container-succeed">
          <img width="50px" alt="profile" src={profileImageUrl} />
          <h2>{name}</h2>
          <p>{shortBio}</p>
        </div>
        <hr />
      </>
    )
  }

  const renderFailure = () => (
    <div className="failure-container">
      <button onClick={getProfile} type="submit">
        Retry
      </button>
    </div>
  )

  const renderProfile = () => {
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

  return renderProfile()
}

export default ProfileData
