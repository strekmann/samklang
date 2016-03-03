import React from 'react';
import { Grid, Row, Col, Input, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { createProject } from '../actions/projects';

class ProjectCreate extends React.Component {
    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
    }

    onCreate(event) {
        event.preventDefault();
        const project = {
            identifier: this.refs.identifier.getValue(),
            name: this.refs.name.getValue(),
            end: this.refs.end.getValue(),
        };
        this.props.dispatch(createProject(project));
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Create new project</h1>

                        <form onSubmit={this.onCreate}>
                            <Input type="text" label="Name" ref="name" />
                            <Input type="text" label="Identifier" ref="identifier" />
                            <Input type="text" label="End date" ref="end" placeholder="1999-12-31" />
                            <Button type="submit" bsStyle="primary">Save</Button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

ProjectCreate.propTypes = {
    dispatch: React.PropTypes.func,
};

function select() {
    return {};
}

export default connect(select)(ProjectCreate);
