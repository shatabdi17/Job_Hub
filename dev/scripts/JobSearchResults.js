import React from 'react';
import Link from 'react-router-dom';

const JobSearchResults = (props) => {
    const {jobkey, jobtitle, company, snippet, formattedRelativeTime, url, indeedApply} = props.job;
    return (
        <div>
            <div id={jobkey} className="search-result">
                <h3 className="job-title">{jobtitle}</h3>
                <h4 className="job-company">{company}</h4>
                <p className="job-snippet">{snippet.replace(/<[^>]*>/g, '')}</p>
                <p className="job-time">{formattedRelativeTime}</p>
                <a className="more-info" href={url} target="_blank">More Info</a>
                
                <a className="apply-now" href={`${url}#apply-state-picker-container`} target="_blank">Apply Now </a>
                
                <button onClick={() => props.onSave(props.job)} className="icon-button"><img src="/dev/styles/assets/star-green.svg" alt="Save Job" className="icon" /></button>

                <button onClick={() =>
                    props.onSave(props.job)} className="save-button"> {props.saved ? 'Delete Me' : 'Save Me'}</button>
             
                <button onClick={() => props.onApply(props.job)} className="save-button">Applied</button>
                {/* {indeedApply && <button onClick={() => props.onApply(props.job)} className="save-button">Applied</button>} */}
            </div>
        </div>
    )
}

export default JobSearchResults;

