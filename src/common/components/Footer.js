import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

export default ({ id }) => (
    <footer>
        <hr />
        <Grid>
            <Row>
                <Col xs={4}>
                    {id ? <a href="/auth/logout">Log out</a> : '' }
                </Col>
                <Col xs={4}>
                    <Link to="sites">All sites</Link>
                </Col>
            </Row>
        </Grid>
    </footer>
);
