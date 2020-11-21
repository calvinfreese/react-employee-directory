import React from 'react';


function Navbar() {
   return (
       <div>
            <nav className="navbar navbar-light bg-info text-center">
            <h1 className="navbar-brand">Employee Directory</h1>
                <span className="navbar-text">
                    
                    <p className="text-center"> Search or filter employees by name, phone, email address, or birth year. </p>
                </span>
            </nav>
       </div>
   )

}

export default Navbar;