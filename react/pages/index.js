import React from "react";
import translator from "../../server/lib/translator";
import Immutable from "immutable";
import FluxyMixin from "alt/mixins/FluxyMixin";
import {Grid, Row, Col, Input, Button, Alert} from "react-bootstrap";

import AuthActions from "../actions/auth";
import AuthStore from "../stores/auth";

var IndexPage = React.createClass({
    displayName: "IndexPage",

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
                registered: false,
            }),
        };
    },

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.data !== nextState.data;
    },

    onAuthChange() {
        this.setState(({data}) => ({
            data: data.withMutations(map => {
                map.set("error", AuthStore.getError())
                .set("registered", AuthStore.getRegistered());
            }),
        }));

        if (this.state.data.get("registered")) {
            window.location.href = "/";
        }
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

    render() {
        var __ = translator(this.props.lang);

        var error;
        if (this.state.data.get("error")) {
            error = (
                <Row>
                    <Col xs={12}>
                        <Alert bsStyle="danger">{this.state.data.get("error")}</Alert>
                    </Col>
                </Row>
            );
        }

        return (
            <Grid>
                {error}
                <Row>
                    <Col xs={12}>
                        <section>
                            <h1>Samklang</h1>
                            <p>Info om awesum saus prosjekt og greier</p>
                        </section>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <form onSubmit={this.onRegister}>
                            <Input
                                required
                                label={__("Name")}
                                ref="name"
                                type="text" />
                            <Input
                                required
                                label={__("Email")}
                                ref="email"
                                type="email" />
                            <Input
                                required
                                label={__("Password")}
                                ref="password"
                                type="password" />
                            <Button type="submit" bsStyle="primary">{__("Lagre")}</Button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    },
});

import bootstrap from "../bootstrap";
bootstrap(IndexPage);
export default IndexPage;
