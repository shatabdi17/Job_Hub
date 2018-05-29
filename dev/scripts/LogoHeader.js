import React from 'react';
import Link from 'react-router-dom';

class LogoHeader extends React.Component {

    render() {
        return (
            <div className="logo-header">
                <img src="/dev/styles/assets/JobHub-black.svg" alt="JobHub Logo" />
            </div>
        )
    }
}

export default LogoHeader;