import React from 'react';


const JobSearchResults = (props) => {
    const {jobkey, jobtitle, company, snippet, formattedRelativeTime, url, indeedApply} = props.job;
    return (
        <div>
            <div className="search-result">
                <h3 className="job-title">{jobtitle}</h3>
                <h4 className="job-company">{company}</h4>
                <p className="job-snippet">{snippet.replace(/<[^>]*>/g, '')}</p>
                <p className="job-time">{formattedRelativeTime}</p>
                <a className="more-info" href={url} target="_blank">More Info</a>
                
                <a className="apply-now" href={`${url}#apply-state-picker-container`} target="_blank">Apply Now </a>

               {props.saved !== null && <button onClick={() =>
                    props.onSave(props.job)} className="icon-button saved-button"> {props.saved ? <img src="public/assets/delete-red.svg" alt="Remove from Saved Jobs" className="icon" /> : <img src="public/assets/star-green.svg" alt="Add to Saved Jobs" className="icon" />}
               </button> }
             
                {props.applied !== null && <button onClick={() => 
                    props.onApply(props.job)} className="icon-button applied-button">
                    {props.applied ? <img src="public/assets/check-limegreen.svg" alt="Applied" className="icon" /> : null }
                </button>}

                {/* {indeedApply && <button onClick={() => props.onApply(props.job)} className="save-button">Applied</button>} */}
            </div>
        </div>
    )
}

export default JobSearchResults;