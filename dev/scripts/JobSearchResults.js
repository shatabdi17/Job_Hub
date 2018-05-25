import React from 'react';
import Link from 'react-router-dom';

const JobSearchResults = (props) => {
    //console.log(props.snippet);
    return (
        <div>
            <div id={props.jobKey} className="search-result">
                <div><i className="fas fa-check-circle"></i></div>
                <h3>{props.jobTitle}</h3>
                <h4>{props.company}</h4>
                {/* <p className="job-snippet" dangerouslySetInnerHTML={{ __html:props.snippet }}></p> */}
                <p>{props.snippet.replace(/<[^>]*>/g, '')}</p>
                <p>{props.formattedRelativeTime}</p>
                <a className="more-info" href={props.url} target="_blank">More Info</a>
                {/* <button id={props.url} onClick={props.goToIndeed} className="more-info">More Info<i className="fas fa-arrow-right"></i></button> */}

                {props.hideSaveButton || !props.SignIn
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