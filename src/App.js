import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/NavBar";
import SearchBar from './components/SearchBar';
import Table from './components/Table';

class App extends Component {
  constructor() {
    super()
    this.state = {
      employees: [],
      searchField: ''
    }
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=200&nat=us')
    .then(res => res.json())
    .then(empls => {
      this.setState({employees: empls.results})
    });
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value })
  }

  render() {
    const { employees, searchField } = this.state;
    /* can search employees via Search Bar - results in the Table will adjust to match */
    const filteredEmployees = employees.filter(empl => {
      let fullName = empl.name.first + ' ' + empl.name.last;
      let nameMatch = fullName.toLowerCase().includes(searchField.toLowerCase());
      let phoneMatch = empl.phone.includes(searchField);
      let emailMatch = empl.email.includes(searchField);
      let birthdayMatch = empl.dob.date.includes(searchField);

      if (nameMatch) {
        return nameMatch;
      } else if (phoneMatch) {
        return phoneMatch;
      } else if (emailMatch) {
        return emailMatch;
      } else if (birthdayMatch) {
        return birthdayMatch;
      }
      
    })
    return !employees.length ?
      <h3>Loading... </h3> : 
      (
        <div className="App">
          <div>
            <Navbar />
          </div>
          <div>
            <SearchBar searchChange={this.onSearchChange}/>
          </div>  
          <div>
            <Table employees={ filteredEmployees } />
          </div> 
        </div>
      );
  }
  
}

export default App;
