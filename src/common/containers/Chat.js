import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Input } from 'react-bootstrap';

// import { sendMessage } from '../actions/viewer';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(event) {
        event.preventDefault();
        const message = this.refs.message.getValue();
        this.props.dispatch({ type: 'socket/message', data: { message } });
    }

    render() {
        // TODO: This should be moved somewhere where we know we have a user, and we know the user's channels.
        return (
            <form onSubmit={this.sendMessage}>
                <Input type="text" ref="message" placeholder="Skriv noe" />
            </form>
        );
    }
}

function select(state) {
    return {

    };
}

export default connect(select)(Chat);
