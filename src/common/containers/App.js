import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Chat from '../containers/Chat';
import { connect } from 'react-redux';

class App extends React.Component {

    render() {
        return (
            <div>
                <Navigation
                    viewer={this.props.viewer}
                    site={this.props.site}
                    users={this.props.users}
                    socket={this.props.socket}
                    params={this.props.params}
                />
                {this.props.children}
                <Footer id={this.props.viewer.get('id')} />
                <Chat id={this.props.viewer.get('id')} />
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.element,
    viewer: React.PropTypes.object,
    site: React.PropTypes.object,
    users: React.PropTypes.object,
    socket: React.PropTypes.object,
    params: React.PropTypes.object,
};

function select(state) {
    return {
        viewer: state.get('viewer'),
        site: state.get('site'),
        users: state.get('users'),
        socket: state.get('socket'),
    };
}

export default connect(select)(App);
