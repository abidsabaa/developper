import React, { Component } from 'react';
import Footer from './components/layout/footer/footer';
import Header from './components/layout/header/header';
import Landing from './components/layout/landing/landing';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import {Route} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/Login' component={Login}/>
        <Route exact path='/Register' component={Register}/>
        <Footer/>
      </div>
    );
  }
}

export default App;
