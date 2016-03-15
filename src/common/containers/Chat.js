import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';

// import { sendMessage } from '../actions/viewer';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            message: '',
        };
    }

    sendMessage(event) {
        event.preventDefault();
        const message = this.state.message;
        this.props.dispatch({ type: 'socket/message', data: { message } });
        this.setState({
            message: '',
        });
    }

    onChange() {
        this.setState({
            message: this.refs.message.getValue(),
        });
    }

    render() {
        // TODO: This should be moved somewhere where we know we have a user,
        // and we know the user's channels.
        const viewerId = this.props.id;
        if (viewerId) {
            return (
                <Grid>
                    <Row>
                        <Col xs={12}>
                            {this.props.socket.get('messages').map(
                                (message, index) => <div key={index}>
                                    <strong>{message.name}</strong>: {message.message}
                                </div>)}
                            <form onSubmit={this.sendMessage}>
                                <Input
                                    type="text"
                                    ref="message"
                                    placeholder="Skriv noe"
                                    onChange={this.onChange}
                                    value={this.state.message}
                                    buttonAfter={
                                        <Button
                                            type="submit"
                                            bsStyle="primary"
                                        >
                                            Send
                                        </Button>
                                    }
                                />
                            </form>
                        </Col>
                    </Row>
                </Grid>
            );
        }
        return null;
    }
}

function select(state) {
    return {
        socket: state.get('socket'),
    };
}

export default connect(select)(Chat);
