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
      searchField: '',
      direction: 'desc'
    }

    this.sortData = this.sortData.bind(this)
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=20&nat=us', {mode: 'cors'})
    .then(res => res.json())
    .then(empls => {
      this.setState({employees: empls.results})
    });
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value })
  }

  sortData(keyOne) {
    let data = [...this.state.employees]; 
    let sorted = [];
    let newDirection;
    let currentDirection = this.state.direction;
    
    
    
      sorted = data.sort((a, b) => {
        // only name and dob have second "keys"
        if (keyOne === 'name' || keyOne === "dob") {
          let fullNameA = a.name.first + ' ' + a.name.last;
          let fullNameB = b.name.first + ' ' + b.name.last;

        if (fullNameA > fullNameB && currentDirection === 'desc' ) {
          newDirection = 'asc';
          return 1;
        } else if (fullNameA < fullNameB && currentDirection === 'asc') {
          console.log("i've descended");
          newDirection = 'desc';
           return -1;
        } else {
          newDirection = currentDirection === 'desc' ? 'asc' : 'desc'
          return -1;
        }
        
      } else {

        if (a[keyOne] < b[keyOne && currentDirection === 'asc' ]){
          return -1;
        } else if (a[keyOne] > b[keyOne] && currentDirection === 'desc' ) {
          return +1;
        } else {
          newDirection = currentDirection === 'desc' ? 'asc' : 'desc'
          return -1;
        }

        
      }
      
      
    });
    
    // After conditionals, return the sorted value
    this.setState({
      employees: sorted,
      direction: newDirection
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
