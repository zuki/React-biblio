import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import Application from './Application';
import Home from './Home';
import Item from './Item';
import Search from './Search';

const routes = (
  <Route name="app" path="/" handler={Application}>
    <Route name="item" path="item/:id" handler={Item}/>
    <Route name="search" handler={Search}/>
    <Route name="home" handler={Home}/>
    <DefaultRoute handler={Home}/>
    <NotFoundRoute handler={Home}/>
  </Route>
);

export default routes;
