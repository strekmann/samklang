import React from 'react';
import {Row, Col, Input, Button} from 'react-bootstrap';

import translator from '../../../server/lib/translator';
import SiteActions from '../../actions/site';


const Create = React.createClass({
    propTypes: {
        locale: React.PropTypes.string,
    },

    onCreate(e) {
        e.preventDefault();
        SiteActions.create({
            identifier: this.refs.identifier.getValue(),
            name: this.refs.name.getValue(),
        });
    },

    render() {
        const __ = translator(this.props.locale);
        return (
            <Row>
                <Col xs={12}>
                    <form onSubmit={this.onCreate}>
                        <Input
                            required
                            label={__('Identifier')}
                            help={__('Unique identifier to be part of URLs')}
                            ref="identifier"
                            type="text"
                        />
                        <Input
                            required
                            label={__('Long name')}
                            help={__('Better for humans')}
                            ref="name"
                            type="text"
                        />
                        <Button type="submit" bsStyle="primary">
                            {__('Create site')}
                        </Button>
                    </form>
                </Col>
            </Row>
        );
    },
});
export default Create;
