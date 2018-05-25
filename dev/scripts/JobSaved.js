import React from 'react';
import firebase from 'firebase';
import axios from 'axios';
import {BrowserRouter as Router, Route,Link,NavLink} from "react-router-dom";
import JobSearchResults from './JobSearchResults';


// Initialize Firebase
// const config = {
//     apiKey: "AIzaSyAHiIrKkJmdgDWIRWZEejkNxjfha7cExVs",
//     authDomain: "job-search-13455.firebaseapp.com",
//     databaseURL: "https://job-search-13455.firebaseio.com",
//     projectId: "job-search-13455",
//     storageBucket: "",
//     messagingSenderId: "959198869600"
// };

// firebase.initializeApp(config);


// class JobSaved extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: null,
//             userName: '',
//             // loggedIn: false,
//             jobsSaved: {}
//         };

//         this.signOut = this.signOut.bind(this);
//         this.signIn = this.signIn.bind(this);
//     }
//     componentDidMount() {

//         let dbRef = firebase.database().ref(`users/${this.state.user}`);

//         firebase.auth().onAuthStateChanged((user) => {
//             if (user) {
//                 this.dbRef.on('value', (snapshot) => {
//                     //console.log(snapshot.val());
//                     if (snapshot.val().jobsSaved) {
//                         this.setState({
//                             jobsSaved: snapshot.val().jobsSaved
//                         })
//                     }
//                 });
//                 this.setState({
//                     loggedIn: true,
//                     user: user.uid,
//                     userName: user.displayName
//                 });
//             } else {
//                 this.setState({
//                     user: null,
//                     userName: '',
//                     loggedIn: false,
//                     jobsSaved: {}
//                 });
//             }


//         })
//  }

//     /**
//       * Signs the user in.
//       */
//     signIn() {
//         const provider = new firebase.auth.GoogleAuthProvider();
        
//         firebase.auth().signInWithPopup(provider)
//             .catch(function (error) {
//                 console.log(error)
//             }).then((result) => {
//                 console.log(result)
//             });
//     }

//     /**
//      * Signs the user out.
//      */
//     signOut() {
//         firebase.auth().signOut().then(function (success) {
//             console.log('Signed out!')
//         }, function (error) {
//             console.log(error);
//         });
//     }


//     render() {
//         return (
//            <div>
//                 {this.state.loggedIn === false && <button onClick=
//                     {this.loginWithGoogle}>Log in with Google</button>}

//                 {this.state.loggedIn === true ? <button onClick={this.logout}
//                 >Log Out</button> : null}
//            </div>
//         )
//     }
//  }





// export default JobSaved;