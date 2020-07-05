import React from 'react';
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/users/Register'
import Login from './components/users/Login'
import Account from './components/users/Account'
import axios from 'axios'
import  CategoryList from './components/catagory/categoryList'
import AddCategory from './components/catagory/addCategory'
import EditCategory from './components/catagory/editCategory'
import DeleteCategory from './components/catagory/deleteCategory'

import ListNotes from './components/notes/List'
import AddNote from './components/notes/Add'
import  NotesDelete from './components/notes/Delete'
import EditNote from './components/notes/Edit'
// import AddNote from './notes/AddNote'


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
      <h1>App</h1>
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
                <li><Link to="/category/viewall" className="nav-item nav-link" >Category </Link></li>
                <li><Link to="/notes/view">Notes</Link></li>
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
              {/* <Route path="/notes/add" component={AddNote} exact={true} /> */}
              <Route path="/category/viewall" component={CategoryList}  />
              <Route path="/category/add" component={AddCategory}/>
              <Route path="/category/edit/:id" component={EditCategory}/>
              <Route path="/category/delete/:id" component={DeleteCategory}/>
              <Route path="/notes/view" component={ListNotes} exact/>
              <Route path="/notes/add" component={AddNote} exact/>
              <Route path="/notes/delete/:id" component={ NotesDelete}/>
              <Route path='/notes/edit/:id' component={EditNote}/>
           

         
        </Switch>

      </div>   
      {/* <AddNote/> */}
      </BrowserRouter>
    
      
    )
  }


}

export default App;
