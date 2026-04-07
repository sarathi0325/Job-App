import {FaHome} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdExitToApp} from 'react-icons/md'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = () => {
  const history = useHistory()
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img
          className="nav-logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      <ul className="router-text-md">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/jobs">Jobs</Link>
        </li>
      </ul>

      <button onClick={onClickLogout} type="button" className="logout-btn-md">
        Logout
      </button>

      <ul className="navigate-routes-sm">
        <li>
          <Link to="/">
            <button type="button">
              <FaHome />
            </button>
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <button type="button">
              <BsBriefcaseFill />
            </button>
          </Link>
        </li>
        <button onClick={onClickLogout} type="button">
          <MdExitToApp />
        </button>
      </ul>
    </div>
  )
}
export default Header
