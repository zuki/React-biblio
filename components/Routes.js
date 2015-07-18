import React from 'react';
import { Route, DefaultRoute, Link } from 'react-router';
import Application from './Application';
import Item from './Item';
import Search from './Search';

const routes = (
  <Route name='app' path='/' handler={Application}>
    <Route name='item' path='item/:id' handler={Item}/>
    <DefaultRoute name='search' handler={Search}/>
  </Route>
);

export default routes;
