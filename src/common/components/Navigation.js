import React from 'react';
import Immutable from 'immutable';
import { Navbar, Nav, NavItem, Label } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends React.Component {
    /*
    shouldComponentUpdate(nextProps, nextState){
        console.log('should update navbar?', this.state.user !== nextState.user);
        return this.state.user != nextState.user;
    },
    */

    render() {
        const viewerid = this.props.viewer.get('id');
        let userItem;

        if (!viewerid) {
            userItem = (
                <LinkContainer to="/login">
                    <NavItem>
                        Log in
                    </NavItem>
                </LinkContainer>
            );
        }
        else {
            userItem = (
                <LinkContainer to="/account">
                    <NavItem>
                        {this.props.users.getIn([viewerid, 'name'])}
                    </NavItem>
                </LinkContainer>
            );
        }

        let site = Immutable.fromJS({ name: 'Samklang', identifier: '' });
        if (this.props.params.siteIdentifier) {
            site = this.props.site;
        }
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={`/${site.get('identifier')}`}>{site.get('name')}</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse eventKey={0}>
                    <Nav navbar pullRight>
                        <Navbar.Text>
                            <Label bsStyle="primary">{this.props.socket.get('usercount')}</Label>
                        </Navbar.Text> {userItem}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

Navigation.propTypes = {
    viewer: React.PropTypes.object,
    site: React.PropTypes.object,
    users: React.PropTypes.object,
    socket: React.PropTypes.object,
    params: React.PropTypes.object,
};

export default Navigation;
