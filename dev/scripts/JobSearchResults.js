import React from 'react';

const JobSearchResults = (props) => {
    return (
        <div>
            <div id={props.jobKey} className="search-result">
                <div><i className="fas fa-check-circle"></i></div>
                <h3>{props.jobTitle}</h3>
                <h4>{props.company}</h4>
                <button id={props.jobKey} className="more-info">More Info<i className="fas fa-arrow-right"></i></button>
            </div>
        </div>
    )
}

export default JobSearchResults;