import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import axios from 'axios';
import {BrowserRouter as Router,Route,Link,NavLink} from "react-router-dom";
import JobSearch from './JobSearch';
import JobSaved from './JobSaved';


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


render() {
  return (
    <div>
      Hello
    </div>
  )

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      //userName: '',
      loggedIn: false,
      jobsSaved: {}
    };

    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }
  componentDidMount() {

   this.dbRef = firebase.database().ref(`users/${this.state.user}`);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.dbRef.on('value', (snapshot) => {
          //console.log(snapshot.val());
          // if (snapshot.val().jobsSaved) {
          //   this.setState({
          //     jobsSaved: snapshot.val().jobsSaved
          //   })
          // }
        });
        this.setState({
          loggedIn: true,
          //user: user.uid,
          //userName: user.displayName
        });
      } else {
        this.setState({
          user: null,
          userName: '',
          loggedIn: false,
          jobsSaved: {}
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
  }


  render() {
    return (
      <div>
        {this.state.loggedIn === false && <button onClick=
          {this.signIn}>Log in with Google</button>}

        {this.state.loggedIn === true ? <button onClick={this.signOut}
        >Log Out</button> : null}
      </div>
    )
  }

}
  

  
  // render() {
  //   return (
  //     <Router>
  //     <div>
  //         <Link to={`/jobsaved/`}>List of Saved Jobs</Link>
  //         <Route
  //           path="jobsaved/"
  //           component={JobSaved}
            
  //         />
          

  //     </div>
  //     </Router>
  //   )
  // }


ReactDOM.render(<App />, document.getElementById('app'));
