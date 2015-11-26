import React from 'react';
import translator from '../../server/lib/translator';
import Immutable from 'immutable';
import FluxyMixin from 'alt/mixins/FluxyMixin';
import {Grid, Row, Col, Input, Button, Alert} from 'react-bootstrap';

import AuthActions from '../actions/auth';
import AuthStore from '../stores/auth';

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

    onRegister(e) {
        var userdata = {
            name: this.refs.name.getValue(),
            email: this.refs.email.getValue(),
            password: this.refs.password.getValue(),
        };
        e.preventDefault();
        AuthActions.register(userdata);
    },

    onLogin(e) {
        e.preventDefault();
        AuthActions.login({
            email: this.refs.login_email.getValue(),
            password: this.refs.login_password.getValue(),
        });
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
                            <p>Info om awesum saus prosjekt og greier</p>
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <form onSubmit={this.onLogin}>
                            <Input required label={__('E-mail')} ref="login_email" type="email" />
                            <Input required label={__('Password')} ref="login_password" type="password" />
                            <Button type="submit" bsStyle="primary">{__('Login')}</Button>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <form onSubmit={this.onRegister}>
                            <Input
                                required
                                label={__('Name')}
                                ref="name"
                                type="text" />
                            <Input
                                required
                                label={__('Email')}
                                ref="email"
                                type="email" />
                            <Input
                                required
                                label={__('Password')}
                                ref="password"
                                type="password" />
                            <Button type="submit" bsStyle="primary">{__('Lagre')}</Button>
                        </form>
                    </Col>
                </Row>
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
                            <p>Info om awesum saus prosjekt og greier</p>
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
