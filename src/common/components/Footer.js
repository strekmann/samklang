import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <hr />
                <Grid>
                    <Row>
                        <Col xs={4}>
                            {this.props.id ? <a href="/auth/logout">Log out</a> : '' }
                        </Col>
                        <Col xs={4}>
                            <Link to="/sites">All sites</Link>
                        </Col>
                    </Row>
                </Grid>
            </footer>
        );
    }
}

Footer.propTypes = {
    id: React.PropTypes.string,
};

export default Footer;
