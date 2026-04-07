import './index.css'

const NotFound = () => (
  <div className="not-found-container-bg">
    <div className="not-found-container">
      <div className="img-con">
        <img
          alt="not found"
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        />
      </div>
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  </div>
)

export default NotFound
