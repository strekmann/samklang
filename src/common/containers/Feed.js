import React from 'react';
import Immutable from 'immutable';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import { loadSite } from '../actions/sites';

class Feed extends React.Component {
    componentWillMount() {
        this.props.dispatch(loadSite({ identifier: this.props.params.id }));
    }

    render() {
        const site = this.props.sites.get(this.props.site.get('id'));
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h1>{site && site.get('name')}</h1>
                        <p>FEED</p>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

Feed.propTypes = {
    sites: React.PropTypes.instanceOf(Immutable.Map),
    site: React.PropTypes.instanceOf(Immutable.Map),
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func,
};

function select(state) {
    return {
        sites: state.get('sites'),
        site: state.get('site'),
    };
}

export default connect(select)(Feed);
