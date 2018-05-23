import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from './firebase';


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
}

ReactDOM.render(<App />, document.getElementById('app'));
