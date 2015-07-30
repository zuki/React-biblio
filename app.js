import Fluxible from 'fluxible';
import routes from './components/Routes';
import ApplicationStore from './stores/ApplicationStore';
import SearchStore from './stores/SearchStore';
import LanguageStore from './stores/LanguageStore';

const app = new Fluxible({
    component: routes,
    stores: [
      ApplicationStore,
      SearchStore,
      LanguageStore
    ]
});

export default app;
