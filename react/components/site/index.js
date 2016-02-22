import React from 'react';
import { Grid, Row, Col, Input } from 'react-bootstrap';
import SocketActions from '../../actions/socket';

const Site = React.createClass({
    propTypes: {params: React.PropTypes.object},

    componentDidMount() {
        //SocketActions.setup();
    },

    sendMessage(e) {
        e.preventDefault();
        SocketActions.sendMessage(this.refs.message);
    },

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>{`${this.props.params.identifier} main page`}</h1>
                        <form onSubmit={this.sendMessage}>
                            <Input type="text" label="message" ref="message"/>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    },
});

export default Site;
