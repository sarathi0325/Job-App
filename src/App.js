import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import LoginPage from './component/LoginPage'
import ProtectedRoutes from './component/ProtectedRoutes'
import Home from './component/Home'
import Jobs from './component/Jobs'
import NotFound from './component/NotFound'
import JobsDetails from './component/JobsDetails'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoutes exact path="/" component={Home} />
    <ProtectedRoutes exact path="/jobs" component={Jobs} />
    <ProtectedRoutes exact path="/jobs/:id" component={JobsDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
