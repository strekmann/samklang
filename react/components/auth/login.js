import React from 'react';
import {Row, Col, Input, Button} from 'react-bootstrap';

import translator from '../../../server/lib/translator';
import AuthActions from '../../actions/auth';

var Login = React.createClass({
    propTypes: {
        locale: React.PropTypes.string,
    },

    onLogin(e) {
        e.preventDefault();
        AuthActions.login({
            email: this.refs.email.getValue(),
            password: this.refs.password.getValue(),
        });
    },

    render() {
        var __ = translator(this.props.locale);
        return (
            <Row>
                <Col xs={12}>
                    <form onSubmit={this.onLogin}>
                        <Input
                            required
                            label={__('E-mail')}
                            ref="email" type="email"
                        />
                        <Input
                            required
                            label={__('Password')}
                            ref="password"
                            type="password"
                        />
                        <Button type="submit" bsStyle="primary">
                            {__('Login')}
                        </Button>
                    </form>
                </Col>
            </Row>
        );
    },
});
export default Login;
