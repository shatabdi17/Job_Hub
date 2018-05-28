import React from 'react';
import firebase from 'firebase';

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
        // Go to database at the user's id, look inside to see if they have notes.
        // If they have notes, show me the value of this notes key.
        // Set state of this component to value of text area.
        // Default stuff of inside of the textarea is the state of the note.
    }

    handleChange(e) {
        this.setState({
            noteText: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('clicked');
        const dbRefNotes = firebase.database().ref(`users/${this.props.user}/note`);
        dbRefNotes.set(this.state.noteText);
    }
    render() {
        return(
            <div>
                <textarea onChange={this.handleChange}></textarea>
                <button onClick={this.handleSubmit}>Click me</button>
            </div>
        )
    }
}

export default Notes;