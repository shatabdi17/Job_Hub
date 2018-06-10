import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import axios from 'axios';
import LogoHeader from './LogoHeader';
import JobSearch from './JobSearch';
import swal from './sweetalert';
import JobSearchResults from './JobSearchResults';
import JobSaved from './JobSaved';
import Notes from './Notes';
import Footer from './Footer';
import {BrowserRouter as Router,Route,Link,NavLink} from "react-router-dom";


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
      currentPage: 0,
      user: null,
      userName: "",
      loggedIn: false,
      jobsAppliedFor: {},
      jobsSaved: {},
      location: 'Toronto',
      jobs: []
     
    };

    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
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
          userName: user.displayName
        
        });
        this.dbRef = firebase.database().ref(`users/${this.state.user}`);
        this.dbRef.on("value", snapshot => {
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
  
  signIn() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(user => {
        this.setState({
          loggedIn: true
        });
      })
      .catch(err => {
      });
  }

  
  signOut() {
    firebase.auth().signOut();
    this.dbRef.off("value");
    this.setState({
      loggedIn: false
    });
  }

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
    
    let currentDate = new Date();
    currentDate = currentDate.toString();
    currentDate = currentDate.substring(0, 15);
    appliedFor[jobkey].dateApplied = currentDate;

    let saved = this.state.jobsSaved;
    if (saved[jobkey]) {
      saved[jobkey] = jobObject;
      saved[jobkey].dateApplied = currentDate;
    }

    this.setState({
      jobsAppliedFor: appliedFor,
      jobsSaved: saved
    });

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
    let jobsSaved = this.state.jobsSaved;

    if (jobsSaved[jobkey]) {
      delete jobsSaved[jobkey];
    }

    else {
      jobsSaved[jobkey] = jobObject;
    }

    this.setState({
      jobsSaved: jobsSaved
    });

    if (this.state.loggedIn && this.state.user !== null) {
      this.dbRef = firebase
        .database()
        .ref(`users/${this.state.user}/jobsSaved`);
      this.dbRef.set(jobsSaved);
    }
  }

  nextPage(e) {
    e.preventDefault();
    this.setState({
      currentPage: this.state.currentPage + 10
    },() => { this.searchForJobs()}
  );
  }

  prevPage(e) {
    e.preventDefault();
    this.setState({
      currentPage: this.state.currentPage - 10
    },() =>  { this.searchForJobs()}
  );
 }

  render() {
    return (
      <Router>
        <div>
          <LogoHeader />

            <Route exact path="/" component={JobSearch} />
            <Route exact path="/mysavedjobs" component={JobSaved} />
            <Route exact path="/notes" component={Notes} />
            
          <Footer signOut={this.signOut} signIn={this.signIn} loggedIn={this.state.loggedIn} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
