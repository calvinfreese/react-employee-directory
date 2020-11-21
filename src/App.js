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

    this.sortData = this.sortData.bind(this)
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=200&nat=us', {mode: 'cors'})
    .then(res => res.json())
    .then(empls => {
      this.setState({employees: empls.results})
    });
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value })
  }

  sortData(keyOne, keyTwo) {
    let data = [...this.state.employees]; 
    let sorted = [];
    
    // only name and dob have second "keys"
    if (keyOne === 'name' || keyOne === "dob") {
      sorted = data.sort((a, b) => {
        if (a.[keyOne][keyTwo] > b.[keyOne][keyTwo] ) {
          return 1;
        } else if (a.[keyOne][keyTwo] < b.[keyOne][keyTwo]) {
          return -1;
        } else {
          return 0;
        }
        
      });
    } else {
      // phone and email 
      sorted = data.sort((a, b) => {
        if (a.[keyOne] < b.[keyOne] ) {
          
          return -1;
        } else if (a.[keyOne] > b.[keyOne]) {
          return 1;
        } else {
          return 0;
        }
        
      });
    }
   
    // After conditionals, return the sorted value
    this.setState({
      employees: sorted
    })
  }



  
  render() {
    const { employees, searchField } = this.state;

    /* can search employees via Search Bar - results in the Table will adjust to match */
    const filteredEmployees = employees.filter(empl => {

      // remove special characters and spaces from phone empl.phone (ex: (320)-555-5555 turns to 3205555555)
      let strippedPhone = empl.phone.replace(/[^\d]/g, ""); 
      let phoneMatch = strippedPhone.includes(searchField);

      // concatenate first and last name, then check for match with searchField
      let fullName = empl.name.first + ' ' + empl.name.last;
      let nameMatch = fullName.toLowerCase().includes(searchField.toLowerCase());
      
      
      let emailMatch = empl.email.includes(searchField);
      let birthdayMatch = empl.dob.date.includes(searchField);

      // conditional check and return
      if (nameMatch) {
        return nameMatch;
      } else if (phoneMatch) {
        return phoneMatch;
      } else if (emailMatch) {
        return emailMatch;
      } else if (birthdayMatch) {
        return birthdayMatch;
      } 
    });

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
            <Table employees={ filteredEmployees } sortData={ this.sortData }/>
          </div> 
        </div>
      );
  }
  
}

export default App;
