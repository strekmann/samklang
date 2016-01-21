import React from 'react';
import Immutable from 'immutable';
import {Grid, Row, Col} from 'react-bootstrap';

import SiteList from './site/list';
import SiteCreateForm from './site/create';

import AuthStore from '../stores/auth';

const Dashboard = React.createClass({
    statics: {
        storeListeners: {
            onAuthChange: AuthStore,
        },
    },

    getInitialState() {
        return {
            data: Immutable.Map({
                error: null,
                viewer: AuthStore.getViewer(),
                wsconnected: AuthStore.isWSConnected(),
                usercount: AuthStore.getUserCount(),
                locale: AuthStore.getLocale(),
            }),
        };
    },
    render() {
        if (this.state.data.get('viewer').get('_id')) {
            return (
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <h1>Dashboard</h1>
                            <SiteList locale={this.state.data.get('locale')} />
                            <SiteCreateForm locale={this.state.data.get('locale')}/>
                        </Col>
                    </Row>
                </Grid>
            );
        }
        return <div />;
    },
});

export default Dashboard;
