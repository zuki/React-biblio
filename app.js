'use strict';
import Fluxible from 'fluxible';
import routes from './components/Routes';
import ApplicationStore from './stores/ApplicationStore';
import SearchStore from './stores/SearchStore';

const app = new Fluxible({
    component: routes,
    stores: [
      ApplicationStore,
      SearchStore
    ]
});

export default app;
