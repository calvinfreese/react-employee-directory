import React from 'react';
import TableRow from './TableRow';

function Table({ employees }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>DOB</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((empl, i) => {
                    <TableRow vv
                    key={i}
                    imgURL={employees[i].picture.thumbnail}
                    name={employees[i].name.first + ' ' + employees[i].name.last} 
                    phone={employees[i].phone}
                    email={employees[i].email}
                    dob={employees[i].dob.date}
                    />
                })}
            </tbody>
        </table>
    )
}