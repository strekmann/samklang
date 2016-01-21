import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const Site = React.createClass({
    propTypes: {params: React.PropTypes.object},

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>{`HEIAA ${this.props.params.identifier}`}</h1>
                    </Col>
                </Row>
            </Grid>
        );
    },
});

export default Site;
