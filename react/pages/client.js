import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Iso from 'iso';
import routes from '../routes';
import alt from '../alt';
import moment from 'moment';

/*
  Once we bootstrap the stores, we run react-router using Router.HistoryLocation
  The element is created and we just render it into the container
*/

moment.locale(document.documentElement.getAttribute('lang'));

Iso.bootstrap((state, _, container) => {
    alt.bootstrap(state);
    ReactDOM.render(<Router history={createBrowserHistory()}>{routes}</Router>, container);
});
