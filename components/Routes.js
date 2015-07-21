import React from 'react';
import { Route, DefaultRoute, Link } from 'react-router';
import Application from './Application';
import Home from './Home';
import Item from './Item';
import Search from './Search';

const routes = (
  <Route name='app' path='/' handler={Application}>
    <Route name='item' path='item/:id' handler={Item}/>
    <Route name='search' handler={Search}/>
    <DefaultRoute name='home' handler={Home}/>
  </Route>
);

export default routes;
