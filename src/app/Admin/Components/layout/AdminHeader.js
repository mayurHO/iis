import React from 'react';

function AdminHeader() {
    return (
        <nav className="navbar d-flex position-sticky top-0"style={{ backgroundColor: '#343a40', color: 'white', padding: '10px' }}>
            <div className="d-flex align-items-center">
                <img src="/images/career/banner-shape.png" alt="Logo" style={{ height: '40px' }} />
            </div>
            <div className="mx-auto">
                <span className=" mb-0 h1">Admin Panel</span>
            </div>
            <div className="d-flex align-items-center">
                <button className="btn btn-outline-danger">Logout</button>
            </div> 
        </nav>
    );
}

export default AdminHeader;