import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/NavBar";
import SearchBar from './components/SearchBar';

class App extends Component() {
  constructor() {
    super()
    this.state = {
      employees: [],
      searchField: ''
    }
  }

  componentDidMount() {
    fetch()
    .then(res => res.json())
    .then(empls => {
      this.setState({searchField: empls.results})
    });
  }

  render() {
    return (
        <div className="App">
          <div>
            <Navbar />
          </div>
          <div>
            <SearchBar />
          </div>   
        </div>
      );
  }
  
}

export default App;
