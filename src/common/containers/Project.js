import React from 'react';
import Immutable from 'immutable';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { loadProject } from '../actions/projects';

class Project extends React.Component {
    componentWillMount() {
        this.props.dispatch(loadProject(
            this.props.params.projectIdentifier,
            this.props.site.get('identifier')
        ));
    }

    render() {
        const project = this.props.projects.get(this.props.project.get('id'));
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Prosjekt: {project && project.get('name')}</h1>
                        {project && project.get('identifier')}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

Project.propTypes = {
    projects: React.PropTypes.instanceOf(Immutable.Map),
    project: React.PropTypes.instanceOf(Immutable.Map),
    site: React.PropTypes.instanceOf(Immutable.Map),
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func,
};

function select(state) {
    return {
        projects: state.get('projects'),
        project: state.get('project'),
        site: state.get('site'),
    };
}

export default connect(select)(Project);
