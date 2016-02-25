import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';

import SiteList from './SiteList';
import { loadSites } from '../actions/sites';

class Home extends React.Component {

    render() {
        const viewerid = this.props.viewer.get('id');
        if (!viewerid) {
            return (
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <PageHeader>Welcome! <small>Here be dragons</small></PageHeader>
                            <p>You need to log in</p>
                        </Col>
                    </Row>
                </Grid>
            );
        }
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <PageHeader>Welcome! <small>Here be dragons</small></PageHeader>
                        <ul>
                            <li>{this.props.users.getIn([viewerid, 'name'])}</li>
                            <li>{this.props.users.getIn([viewerid, 'email'])}</li>
                        </ul>
                        <SiteList sites={this.props.sites}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

Home.fetchData = function fetchData(store, params, cookie) {
    const viewer = store.getState().get('viewer');
    if (viewer.get('id')) {
        return Promise.all([
            store.dispatch(loadSites(cookie)),
        ]);
    }
};

Home.propTypes = {
    viewer: React.PropTypes.object,
    users: React.PropTypes.object,
    sites: React.PropTypes.object,
};

function select(state) {
    return {
        viewer: state.get('viewer'),
        users: state.get('users'),
        sites: state.get('sites'),
    };
}

export default connect(select)(Home);
