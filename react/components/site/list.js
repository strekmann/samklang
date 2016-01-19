import React from 'react';
import Immutable from 'immutable';
import FluxyMixin from 'alt/mixins/FluxyMixin';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

import translator from '../../../server/lib/translator';
import SiteStore from '../../stores/site';

const SiteList = React.createClass({
    propTypes: {
        locale: React.PropTypes.string,
    },

    mixins: [FluxyMixin],

    statics: {
        storeListeners: {
            onSitesChange: SiteStore,
        },
    },

    getInitialState() {
        return {
            data: Immutable.Map({
                error: null,
                sites: SiteStore.getSites(),
            }),
        };
    },

    onSitesChange() {
        this.setState(({data}) => ({
            data: data.withMutations(map => {
                map.set('error', SiteStore.getError())
                .set('sites', SiteStore.getSites());
            }),
        }));
    },

    render() {
        const __ = translator(this.props.locale);
        if (this.state.data.get('sites').count()) {
            return (
                <Row>
                    <Col xs={12}>
                    <h2>{__('Sites you administer')}</h2>
                    {this.state.data.get('sites').map(site =>
                        <div className="site" key={site.get('_id')}>
                            <h3>{site.get('name')}</h3>
                            <Link to={`/${site.get('identifier')}`}>{site.get('identifier')}</Link>
                            <p>{site.get('admins').map(user =>
                                <span key={`${site.get('_id')}-${user.get('_id')}`}>{user.get('name')}</span>
                            )}</p>
                        </div>
                    )}
                    </Col>
                </Row>
            );
        }
        return <div />;
    },
});

export default SiteList;
