import React from 'react';
import TableRow from './TableRow';

function Table ({ employees }) {

    // converts date from (ex: 1957-02-11T11:20:36.868Z) to MM-DD-YYYY format
    const formatDate = (date) => {
        let newDate = new Date(date);
        let filtered = Intl.DateTimeFormat("en-US").format(newDate)
        return filtered

       
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">DOB</th>
                </tr>
            </thead>
            <tbody>
                {/* maps all employees into their own Table Row */}
                {employees.map((empl, i) => {
                    return (
                        <TableRow vv
                        key={i}
                        // picture options are large, medium, and thumbnail
                        imgURL={employees[i].picture.medium}
                        name={employees[i].name.first + ' ' + employees[i].name.last} 
                        phone={employees[i].phone}
                        email={employees[i].email}
                        dob={formatDate(employees[i].dob.date)}
                    />
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table;