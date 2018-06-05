import React from 'react';
import firebase from 'firebase';
import JobSearchResults from './JobSearchResults';


class Notes extends React.Component {
    constructor() {
        super();
        this.state = {
            noteText: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const dbRefMain = firebase.database().ref(`users/${this.props.user}`);
        dbRefMain.on("value", snapshot => {
            const theActualNote = Object.values(snapshot.val())[0];
            this.setState({
                noteText: theActualNote
            });
        });
    }

    handleChange(e) {
        this.setState({
            noteText: e.target.value
        })
    }

    handleSubmit(e) {
        const dbRefNotes = firebase.database().ref(`users/${this.props.user}/note`);
        dbRefNotes.set(this.state.noteText);
    }
    render() {
        return(
            <div className="notes">
                <textarea onChange={this.handleChange} placeholder={this.state.noteText === '' ? 'Type your notes here.' : null}>{this.state.noteText !== '' ? this.state.noteText : null}</textarea>
                <button onClick={this.handleSubmit}>Save Notes</button>

            </div>
        )
    }
}


export default Notes;