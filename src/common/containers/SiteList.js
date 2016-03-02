import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import { loadSites } from '../actions/sites';

class SiteList extends React.Component {
    componentWillMount() {
        this.props.dispatch(loadSites());
    }

    render() {
        if (!this.props.sites) {
            return <div />;
        }
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <LinkContainer to="/sites/new"><Button>New</Button></LinkContainer>
                        <h2>{'Sites you administer'}</h2>
                        {this.props.sites.toList().map(
                            site => <div className="site" key={site.get('id')}>
                                <h3>{site.get('name')}</h3>
                                <Link to={`/${site.get('identifier')}`}>{site.get('identifier')}</Link>
                                <p>
                                    {site.get('admins').map(user => (
                                        <span key={`${site.get('id')}-${user.get('id')}`}>
                                            {user.get('name')}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        )}
                    </Col>
                </Row>
            </Grid>
        );
    }
}

SiteList.propTypes = {
    sites: React.PropTypes.object,
    dispatch: React.PropTypes.func,
};

function select(state) {
    return {
        sites: state.get('sites'),
    };
}

export default connect(select)(SiteList);
