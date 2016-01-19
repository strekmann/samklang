import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../react/components/App';
import Dashboard from '../react/components/Dashboard';
import Site from '../react/components/site/index';


const routes = (
    <Route>
        <Route path="/" component={App}>
            <Route path=":identifier" component={Site}/>
            <IndexRoute component={Dashboard} />
        </Route>
    </Route>
);

export default routes;
