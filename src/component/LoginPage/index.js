import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {useState} from 'react'
import './index.css'

const LoginPage = props => {
  const [username, setUserName] = useState('')
  const [password, setPassWord] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

  const onChangeUserName = event => {
    console.log(event.target.value)
    setUserName(event.target.value)
  }

  const onChangePassWord = event => {
    console.log(event.target.value)
    setPassWord(event.target.value)
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken) {
    return <Redirect to="/" />
  }

  const handleSuccess = jwtTokenn => {
    const {history} = props
    Cookies.set('jwt_token', jwtTokenn, {expires: 30})
    history.replace('/')
  }

  const handleFailure = errMsg => {
    setShowError(true)
    setErrorMsg(errMsg)
  }

  const onHandleSubmit = async event => {
    event.preventDefault()
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      handleSuccess(data.jwt_token)
    } else {
      handleFailure(data.error_msg)
    }
  }

  return (
    <div className="login-bg">
      <form onSubmit={onHandleSubmit} className="form-container">
        <img
          className="logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
        <div className="user-inputs-containers">
          <div className="username-container">
            <label htmlFor="username">USERNAME</label>
            <input
              value={username}
              placeholder="Username"
              id="username"
              onChange={onChangeUserName}
              type="text"
            />
          </div>
          <div className="password-container">
            <label htmlFor="password">PASSWORD</label>
            <input
              value={password}
              placeholder="Password"
              id="password"
              onChange={onChangePassWord}
              type="password"
            />
          </div>
        </div>
        <button className="submit-btn" type="submit">
          Login
        </button>
        {showError && <p className="error-text">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginPage
