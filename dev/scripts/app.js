import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";


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
  constructor() {
    super();
    this.state = {
      location: 'Toronto',
      jobs: []
    };
  }
  componentDidMount() {
    axios.get(
      "https://cors-anywhere.herokuapp.com/api.indeed.com/ads/apisearch",
      {
        params: {
          publisher: "2117056629901044",
          v: 2,
          format: "json",
          q: "Marketing",
          l: this.state.locationToSearch,
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
    })
  }
  render() {
    return (
      <div>
        Hello
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
