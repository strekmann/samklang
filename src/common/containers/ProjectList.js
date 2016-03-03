import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { loadProjects } from '../actions/projects';

class ProjectList extends React.Component {
    componentWillMount() {
        this.props.dispatch(loadProjects());
    }

    render() {
        if (!this.props.projects) {
            return <div />;
        }
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <LinkContainer to={`/${this.props.params.id}/p/new`}><Button>New</Button></LinkContainer>
                        <h2>{'Projects you administer'}</h2>
                        {this.props.projects.toList().map(
                            project => <div className="project" key={project.get('id')}>
                                <h3>{project.get('name')}</h3>
                                <Link to={`/${project.get('identifier')}`}>{project.get('identifier')}</Link>
                                <p>
                                    {project.get('admins').map(user => (
                                        <span key={`${project.get('id')}-${user.get('id')}`}>
                                            {user.get('name')}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

ProjectList.propTypes = {
    projects: React.PropTypes.object,
    dispatch: React.PropTypes.func,
};

function select(state) {
    return {
        projects: state.get('projects'),
    };
}

export default connect(select)(ProjectList);
