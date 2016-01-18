import React from 'react';
import {Row, Col, Input, Button} from 'react-bootstrap';

import translator from '../../../server/lib/translator';
import AuthActions from '../../actions/auth';

var Register = React.createClass({
    propTypes: {
        locale: React.PropTypes.string,
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
        var __ = translator(this.props.locale);
        return (
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
        );
    },
});
export default Register;
