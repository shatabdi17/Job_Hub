import React from 'react';
import Link from 'react-router-dom';
import firebase from 'firebase';
import axios from 'axios';
import JobSearchResults from './JobSearchResults';

class JobSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            user: null,
            userName: "",
            userPhoto: "",
            loggedIn: false,
            jobsAppliedFor: {},
            jobsSaved: {},
            location: 'Toronto',
            jobs: []

        };

        this.setLocationToSearch = this.setLocationToSearch.bind(this);
        this.searchForJobs = this.searchForJobs.bind(this);
        this.saveJob = this.saveJob.bind(this);
        this.applyForJob = this.applyForJob.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user !== null) {
                this.setState({
                    loggedIn: true,
                    user: user.uid,
                    userName: user.displayName,
                    userPhoto: user.photoURL
                });
                this.dbRef = firebase.database().ref(`users/${this.state.user}`);
                console.log(this.dbRef);
                this.dbRef.on("value", snapshot => {
                    console.log(snapshot.val());
                    if (snapshot.val().jobsSaved) {
                        this.setState({
                            jobsSaved: snapshot.val().jobsSaved
                        });
                        if (snapshot.val().jobsAppliedFor) {
                            this.setState({
                                jobsAppliedFor: snapshot.val().jobsAppliedFor
                            });
                        }
                    } else {
                        this.setState({
                            loggedIn: false
                        });
                    }
                });
            }
        });
    }
    componentWillUnmount() {
        this.dbRef.off('value');
    }
   
        /**
     * Signs the user in.
     */
    // signIn() {
    //     const provider = new firebase.auth.GoogleAuthProvider();

    //     firebase
    //     .auth()
    //     .signInWithPopup(provider)
    //     .then(user => {
    //         this.setState({
    //         loggedIn: true
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }

    // /**
    //  * Signs the user out.
    //  */
    // signOut() {
    //     firebase.auth().signOut();
    //     //console.log('Signed out!')
    //     this.dbRef.off("value");
    //     this.setState({
    //     loggedIn: false
    //     });
    // }


    searchForJobs() {
        axios
            .get("https://cors-anywhere.herokuapp.com/api.indeed.com/ads/apisearch", {
                params: {
                    publisher: "2117056629901044",
                    v: 2,
                    format: "json",
                    q: "Marketing",
                    l: this.state.location,
                    co: "ca",
                    start: this.state.currentPage,
                    limit: 10
                }
            })
            .then(res => {
                this.setState({
                    jobs: res.data.results
                });

                if (res.data.results.length === 0) {
                    swal({
                        title: "Please select a valid city!",
                        icon: "warning",
                        button: "OK"
                    });
                } else {
                    this.setState({
                        jobs: res.data.results
                    });
                }
            });
    }

    setLocationToSearch(e) {
        this.setState({
            location: e.target.value
        });
    }

    applyForJob(jobObject) {
        const jobkey = jobObject.jobkey;
        let appliedFor = this.state.jobsAppliedFor;
        appliedFor[jobkey] = jobObject;
        //appliedFor[jobkey].jobApplication = this.state.userApplication;

        let currentDate = new Date();
        currentDate = currentDate.toString();
        currentDate = currentDate.substring(0, 15);
        appliedFor[jobkey].dateApplied = currentDate;

        let saved = this.state.jobsSaved;
        // if job applied for has already been saved, update fields for the saved job
        if (saved[jobkey]) {
            saved[jobkey] = jobObject;
            //saved[jobkey].jobApplication = this.state.userApplication;
            saved[jobkey].dateApplied = currentDate;
        }

        // update state
        this.setState({
            jobsAppliedFor: appliedFor,
            jobsSaved: saved
        });

    //     // update database
        if (this.state.loggedIn && this.state.user !== null) {
            this.dbRef = firebase
                .database()
                .ref(`users/${this.state.user}/jobsAppliedFor`);
            this.dbRef.set(appliedFor);
            this.dbRefB = firebase
                .database()
                .ref(`users/${this.state.user}/jobsSaved`);
            this.dbRefB.set(saved);
        }
    }
    saveJob(jobObject) {
        const jobkey = jobObject.jobkey;
        // get currently saved jobs from state
        let jobsSaved = this.state.jobsSaved;

        // if job has been saved, remove saved job
        if (jobsSaved[jobkey]) {
            delete jobsSaved[jobkey];
        }
    //     // if job has not been saved, add job to saved jobs
        else {
            jobsSaved[jobkey] = jobObject;
        }
        // set state
        this.setState({
            jobsSaved: jobsSaved
        });

        if (this.state.loggedIn && this.state.user !== null) {
            this.dbRef = firebase
                .database()
                .ref(`users/${this.state.user}/jobsSaved`);
            this.dbRef.set(jobsSaved);
            //console.log("Job saved");
        }
    }

    nextPage(e) {
        e.preventDefault();
        this.setState({
            currentPage: this.state.currentPage + 10
        }, () => {
            axios
                .get("https://cors-anywhere.herokuapp.com/api.indeed.com/ads/apisearch", {
                    params: {
                        publisher: "2117056629901044",
                        v: 2,
                        format: "json",
                        q: "Marketing",
                        l: this.state.location,
                        co: "ca",

                        start: this.state.currentPage,
                        limit: 10
                    }
                }
                )
            .then(res => {
                this.setState({ jobs: res.data.results });
            })
        });
    }

    prevPage(e) {
        e.preventDefault();
        this.setState({
            currentPage: this.state.currentPage - 10
        }, () => {
            axios
                .get(
                    "https://cors-anywhere.herokuapp.com/api.indeed.com/ads/apisearch",
                    {
                        params: {
                            publisher: "2117056629901044",
                            v: 2,
                            format: "json",
                            q: "Marketing",
                            l: this.state.location,
                            co: "ca",

                            start: this.state.currentPage,
                            limit: 10
                        }
                    }
                )
            .then(res => {
                console.log(res);
                this.setState({ jobs: res.data.results });

                if (res.data.results.length === 0) {
                    swal({
                        title: "Please select a valid city!",
                        icon: "warning",
                        button: "OK"
                    });
                } else {
                    this.setState({ jobs: res.data.results });
                }
            })
        });
    }

    render() {
        return (

            <div>
                <div className="landing-page">
                    {this.state.loggedIn === false && (
                        <button className="signIn btn" onClick={this.signIn}>
                            Log in with Google
                        </button>
                    )}
                    {this.state.loggedIn === true ? (
                        <button className="signOut btn" onClick={this.signOut}>
                            Log Out {this.state.userName}
                        </button>
                    ) : null}
                </div>

                <div className="landing-page">
                    <input
                        onKeyDown={e => {
                            if (e.keyCode === 13) this.searchForJobs();
                        }}
                        onChange={this.setLocationToSearch}
                        id="location-input"
                        className="location-input"
                        type="text"
                        name=""
                        id=""
                        placeholder="Enter City"
                    />
                    <button className="search btn" onClick={this.searchForJobs}>
                        Find Jobs Now
                     </button>

                    {/* <Route exact path="/notes" component={Notes} /> */}
                </div>
                
                <div className="job-results">
                    {this.state.jobs.map(job => {
                        return (
                            <JobSearchResults
                                key={job.jobkey}
                                job={job}
                                loggedIn={this.state.loggedIn}
                                onSave={this.saveJob}
                                onApply={this.applyForJob}
                                // saved={Object.keys(this.state.jobsSaved).includes(job.jobkey)}
                                saved={job.jobkey in this.state.jobsSaved}
                                applied={job.jobkey in this.state.jobsAppliedFor}
                            />
                        );

                    })}
                    {this.state.currentPage > 0 && this.state.jobs.length != 0 ? (

                        <a href="#" className="change-page" onClick={this.prevPage}>
                            Prev
                        </a>
                    ) : null}{" "}
                    {this.state.jobs.length != 0 ? (

                        <a href="#" className="change-page" onClick={this.nextPage}>

                            Next
                        </a>
                    ) : null}

                </div>
            </div>

        );
    }
}


export default JobSearch;

