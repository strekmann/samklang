import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

class SiteList extends React.Component {
    render() {
        if (!this.props.sites) {
            return <div />;
        }
        return (
            <Row>
                <Col xs={12}>
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
        );
    }
}

SiteList.propTypes = {
    sites: React.PropTypes.object,
};

export default SiteList;
