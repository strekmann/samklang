import React from 'react';
import translator from '../../server/lib/translator';
import Immutable from 'immutable';
import FluxyMixin from 'alt/mixins/FluxyMixin';
import {Grid, Row, Col, Alert} from 'react-bootstrap';

import SocketActions from '../actions/socket';
import AuthStore from '../stores/auth';

import Login from '../components/auth/login';
import Register from '../components/auth/register';
import SiteList from '../components/site/list';
import SiteCreateForm from '../components/site/create';

const App = React.createClass({
    mixins: [FluxyMixin],

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

    componentDidMount() {
        SocketActions.setup();
    },

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data !== nextState.data;
    },

    onAuthChange() {
        this.setState(({data}) => ({
            data: data.withMutations(map => {
                map.set('error', AuthStore.getError())
                .set('viewer', AuthStore.getViewer())
                .set('wsconnected', AuthStore.isWSConnected())
                .set('usercount', AuthStore.getUserCount())
                .set('locale', AuthStore.getLocale());
            }),
        }));
    },

    renderError() {
        var error;
        if (this.state.data.get('error')) {
            error = (
                <Row>
                    <Col xs={12}>
                        <Alert bsStyle="danger">{this.state.data.get('error')}</Alert>
                    </Col>
                </Row>
            );
        }
        return error;
    },

    renderRegister() {
        var __ = translator(this.state.data.get('locale'));
        var error = this.renderError();

        return (
            <Grid>
                {error}
                {this.state.data.get('wsconnected') ? __('ON') + ' ' + this.state.data.get('usercount') : __('OFF')}
                <Row>
                    <Col xs={12}>
                        <section>
                            <h1>Strekmann</h1>
                            <p>{__('Generic info about the project')}</p>
                        </section>
                    </Col>
                </Row>
                <Login locale={this.state.data.get('locale')} />
                <Register locale={this.state.data.get('locale')} />
            </Grid>
        );
    },

    renderSetup() {
        var __ = translator(this.state.data.get('locale'));
        var error = this.renderError();
        var viewer = this.state.data.get('viewer');

        return (
            <Grid>
                {error}
                {this.state.data.get('wsconnected') ? __('ON') + ' ' + this.state.data.get('usercount') : __('OFF')}
                <Row>
                    <Col xs={12}>
                        <section>
                            <h1>{viewer.get('name')}</h1>
                            <p>{__('More detailed info, maybe')}</p>
                        </section>
                    </Col>
                </Row>
                <SiteList locale={this.state.data.get('locale')} />
                <SiteCreateForm locale={this.state.data.get('locale')}/>
            </Grid>
        );
    },

    render() {
        var viewer = this.state.data.get('viewer');
        var page;

        if (viewer.get('_id')) {
            page = this.renderSetup();
        }
        else {
            page = this.renderRegister();
        }

        return page;
    },
});

export default App;
