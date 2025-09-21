import React from 'react';
import { MdSearch } from "react-icons/md";


function AdminHeader() {
    return (
        <nav className="Admin-header navbar d-flex position-sticky top-0">
            <div className="d-flex align-items-center">
                <span className='search-icon'><MdSearch /></span>
                <input type="text" placeholder="Find Somthing..." className="form-control pe-5 admin-search" />
            </div>
            <div className="d-flex align-items-center">
                <button className="btn btn-outline-danger">Logout</button>
            </div>
        </nav>
    );
}

export default AdminHeader;