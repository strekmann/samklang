import React from "react";
import translator from "../../server/lib/translator";
import {Grid, Row, Col, Input, Button} from "react-bootstrap";

var IndexPage = React.createClass({
    displayName: "IndexPage",

    onRegister(e){
        e.preventDefault();
        console.log("Wanna register");
        alert("FOOK");
    },

    render(){
        var __ = translator(this.props.lang);
        console.log(this.props);

        return (
            <Grid>
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
    }
});

import bootstrap from "../bootstrap";
bootstrap(IndexPage);
export default IndexPage;
