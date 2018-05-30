import React from 'react';
import Link from 'react-router-dom';

class LogoHeader extends React.Component {

    render() {
        return (
            <div className="logo-header">
                <img src="/dev/styles/assets/JobHub-black.svg" alt="JobHub Logo" />
                <p>Search.Save.Suceed.</p>
            </div>
        )
    }
}

export default LogoHeader;