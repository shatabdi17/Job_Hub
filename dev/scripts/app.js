import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import axios from 'axios';
import {BrowserRouter as Router,Route,Link,NavLink} from "react-router-dom";
import JobSearchResults from './JobSearchResults';
import swal from './sweetalert'
// import JobSaved from './JobSaved';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAHiIrKkJmdgDWIRWZEejkNxjfha7cExVs",
  authDomain: "job-search-13455.firebaseapp.com",
  databaseURL: "https://job-search-13455.firebaseio.com",
  projectId: "job-search-13455",
  storageBucket: "",
  messagingSenderId: "959198869600"
};

firebase.initializeApp(config);


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userName: '',
      loggedIn: false,
      jobsSaved: {},
      location: 'Toronto',
      jobs: []
    };

    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.setLocationToSearch = this.setLocationToSearch.bind(this);
    this.searchForJobs = this.searchForJobs.bind(this);
    this.saveJob = this.saveJob.bind(this);
   
  }
  componentDidMount() {


    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        this.setState({
          loggedIn: true,
          user: user.uid,
          userName: user.displayName
        });
        this.dbRef = firebase.database().ref(`users/${this.state.user}`);
        console.log(this.dbRef);
        this.dbRef.on('value', (snapshot) => {
          //console.log(snapshot.val());
          // if (snapshot.val().jobsSaved) {
          //   this.setState({
          //     jobsSaved: snapshot.val().jobsSaved
          //   })
          // }
          
        });
      } else {
        this.setState({
          loggedIn: false
        });
      }


    })
  }


  /**
    * Signs the user in.
    */
  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((user) => {
      console.log(user);
      this.setState({
        loggedIn: true
      })
    })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Signs the user out.
   */
  signOut() {
    firebase.auth().signOut() 
      //console.log('Signed out!')
    this.dbRef.off('value');
    this.setState({
      loggedIn: false
    })
  }

  searchForJobs() {
    axios.get(
      "https://cors-anywhere.herokuapp.com/api.indeed.com/ads/apisearch",
      {
        params: {
          publisher: "2117056629901044",
          v: 2,
          format: "json",
          q: "Marketing",
          l: this.state.location,
          co: "ca",

          start: this.state.currentPage * 10,
          limit: 10
        }
      }
    ).then((res) => {

      console.log(res);
      this.setState({
        jobs: res.data.results
      })

      if (res.data.results.length === 0) {
        swal({
          title: "Please select a valid city!",
          icon: "warning",
          button: "OK"
        });
      } else {
        this.setState({
          jobs: res.data.results
        })
      }

    })
  }

  setLocationToSearch(e) {
    this.setState({
      location: e.target.value
    })
  }

  saveJob(key, e) {
    e.preventDefault();
    console.log(key);
  }
  


  render() {
    return (
      <div>
        {this.state.loggedIn === false && <button className="signIn btn" onClick=
          {this.signIn}>Log in with Google</button>}

        {this.state.loggedIn === true ? <button className="signOut btn" onClick={this.signOut}
        >Log Out{this.state.userName}</button> : null}


        <input onKeyDown={(e) => { if (e.keyCode === 13) this.searchForJobs() }} onChange={this.setLocationToSearch} id="location-input" type="text" name="" id="" placeholder="Enter City" />
        <button className="Search btn" onClick={this.searchForJobs}>Find Jobs Now</button>
        
        {this.state.jobs.map((job) => {
          return <JobSearchResults jobKey={job.key} jobTitle={job.jobtitle} company={job.company} snippet={job.snippet} time={job.formattedRelativeTime} url={job.url} onSave={this.saveJob} loggedIn={this.state.loggedIn} />
        })}

        {/* {Object.keys(this.state.jobsSaved).length !== 0 ?
          <div className="change-page-controls">
            <button className="test" onClick={this.changePage} id="page-last">Previous Page</button>
            <button onClick={this.changePage} id="page-next">Next Page</button>
          </div>
          :
          null
        } */}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
