import React from 'react';

function TableRow({imgURL, name, phone, email, dob}) {
    return (
            <tr>
                <td><img src={imgURL} alt={name}/></td>
                <td>{name}</td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>{dob}</td>
            </tr>
    )
}
export default TableRow;