import React from 'react';
import translator from '../../server/lib/translator';
import Immutable from 'immutable';
import FluxyMixin from 'alt/mixins/FluxyMixin';
import {Grid, Row, Col, Alert} from 'react-bootstrap';

import SocketActions from '../actions/socket';
import AuthActions from '../actions/auth';
import AuthStore from '../stores/auth';

import Login from '../components/auth/login';
import Register from '../components/auth/register';

var IndexPage = React.createClass({
    displayName: 'IndexPage',

    propTypes: {
        lang: React.PropTypes.string,
    },

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
                .set('viewer', AuthStore.getViewer());
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
        var __ = translator(this.props.lang);
        var error = this.renderError();

        return (
            <Grid>
                {error}
                <Row>
                    <Col xs={12}>
                        <section>
                            <h1>Strekmann</h1>
                            <p>{__('Generic info about the proejct')}</p>
                        </section>
                    </Col>
                </Row>
                <Login lang={this.props.lang} />
                <Register lang={this.props.lang} />
            </Grid>
        );
    },

    renderSetup() {
        var __ = translator(this.props.lang);
        var error = this.renderError();
        var viewer = this.state.data.get('viewer');

        return (
            <Grid>
                {error}
                <Row>
                    <Col xs={12}>
                        <section>
                            <h1>{viewer.get('name')}</h1>
                            <p>{__('More detailed info, maybe')}</p>
                        </section>
                    </Col>
                </Row>
            </Grid>
        );
    },

    render() {
        var viewer = this.state.data.get('viewer');
        var page;

        if (viewer) {
            page = this.renderSetup();
        }
        else {
            page = this.renderRegister();
        }

        return page;
    },
});

import bootstrap from '../bootstrap';
bootstrap(IndexPage);
export default IndexPage;
