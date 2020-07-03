import React from 'react';
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/users/Register'
import Login from './components/users/Login'
import Account from './components/users/Account'
import axios from 'axios'
import AddNote from './notes/AddNote'


class App extends React.Component{

  constructor(props) {
    super(props) 
    this.state = {
      isAuthenticated: false 
    }
  }

  // handle page reloading, if the user is logged in, continue to login
  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.setState(() => ({ 
        isAuthenticated: true 
      }))
    }
  }

  handleAuthentication = (boolean) => {
    this.setState(() => ({
      isAuthenticated: boolean
    }))
  }

  render()
  {
    return(
      <BrowserRouter>
    
      <div className="container">
      
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header"> 
            {/* <Link to className="navbar-brand" Link to="/">WebSiteName  */}
            </div>
            <ul className="nav navbar-nav">
              <li className="active">< Link to="/">Home</Link></li>
              { this.state.isAuthenticated ? (
                <React.Fragment>
                <li><Link to="/users/logout" className="nav-item nav-link" >Logout </Link></li>
              </React.Fragment>
              ) : (
                <React.Fragment>
                  <li> <Link to="/users/register">Register</Link></li>
                  <li> < Link to="/users/login">Login</Link></li>
                  
                </React.Fragment>
              )}

              
            </ul>
          </div>
        </nav>


        

        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/users/register" component={ Register } />
          <Route path="/users/login" render={(props) => {
              return <Login {...props} handleAuthentication={this.handleAuthentication} />
          }} />
          <Route path="/users/account" component={ Account } />
          <Route path="/users/logout" render={(props) => {
              axios.delete('http://localhost:3005/users/logout', {
                headers: {
                  'x-auth': localStorage.getItem('token')
                }
              })
                .then(response => {
                  props.history.push('/users/login')
                  this.setState(() => ({
                    isAuthenticated: false
                  }))
                  localStorage.removeItem('token')
                })
            }} />
           

         
        </Switch>

      </div>   
      <AddNote/>
      </BrowserRouter>
    
      
    )
  }


}

export default App;
