// UserHeader.js
import React from 'react';
import Vdlogo from '../../assets/images/VD.png'; // Adjust the path as necessary
import Mslogo from '../../assets/images/MS.png';

const Logo = () => {
    return (
        <div className="userheader">
            <div className="header-container">
                <img src={Mslogo} alt="MS Logo" className="MSlogo" />
                <img src={Vdlogo} alt="VueData Logo" className="Vuedatalogo" />
            </div>
        </div>
    );
};

export default Logo;
