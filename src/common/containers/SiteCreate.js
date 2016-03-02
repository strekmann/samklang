import React from 'react';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { createSite } from '../actions/sites';

class SiteCreate extends React.Component {
    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
    }

    onCreate(event) {
        event.preventDefault();
        const site = {
            identifier: this.refs.identifier.getValue(),
            name: this.refs.name.getValue(),
        };
        this.props.dispatch(createSite(site));
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Create new site</h1>

                        <form onSubmit={this.onCreate}>
                            <Input type="text" label="Name" ref="name" />
                            <Input type="text" label="Identifier" ref="identifier" />
                            <Button type="submit" bsStyle="primary">Save</Button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

SiteCreate.propTypes = {
    dispatch: React.PropTypes.func,
};

function select() {
    return {};
}

export default connect(select)(SiteCreate);
