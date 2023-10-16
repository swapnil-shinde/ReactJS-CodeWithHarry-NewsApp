import './App.css';
import React, { Component } from 'react'
import News from './components/News'
import NavBar from './components/NavBar'

export default class App extends Component {

  hanleCountry = () => {
    console.log('Country Selected');
  }

  render() {
    return (
      <div>
        <NavBar hanleCountry={this.hanleCountry}/>
        <News pageSize={6} category={'science'} country='in'/>
      </div>
    )
  }
}
