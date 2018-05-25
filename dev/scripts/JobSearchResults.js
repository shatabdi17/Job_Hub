import React from 'react';
import Link from 'react-router-dom';

const JobSearchResults = (props) => {
    return (
        <div key={props.jobKey}>
            <div id={props.jobKey} className="search-result">
                <div><i className="fas fa-check-circle"></i></div>
                <h3 className="job-title">{props.jobTitle}</h3>
                <h4 className="job-company">{props.company}</h4>
                {/* <p className="job-snippet" dangerouslySetInnerHTML={{ __html:props.snippet }}></p> */}
                <p className="job-snippet">{props.snippet.replace(/<[^>]*>/g, '')}</p>
                <p className="job-time">{props.time}</p>
                <a className="more-info" href={props.url} target="_blank">More Info</a>

                {props.hideSaveButton || props.loggedIn === false
                    ? null
                    : <button onClick={() => {props.onSave(props.jobKey) }} className="save-button">
                        {!props.saved ? "Save" : "Remove From Saved Jobs"}
                    </button>
                }
            </div>
        </div>
    )
}

export default JobSearchResults;