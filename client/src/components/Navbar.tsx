import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar'>
        <div className="left">

        <h1>Puppies</h1>
        </div>
        <div className="right">
            <Link to="/">Home</Link>
            <Link to="/addpuppies">Add-Puppy</Link>
        </div>
        
    </div>
  )
}

export default Navbar