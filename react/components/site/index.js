import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const Site = React.createClass({
    propTypes: {params: React.PropTypes.object},

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>{`${this.props.params.identifier} main page`}</h1>
                    </Col>
                </Row>
            </Grid>
        );
    },
});

export default Site;
