'use strict';
import { BaseStore } from 'fluxible/addons';
import LocaleSupport from '../util/locale-support';
import _ from 'lodash';

class LanguageStore extends BaseStore {
  constructor (dispatcher) {
    super(dispatcher);
    this.lang = '';
    this.msgs = {};

    this.handleLanguage('ja');
  }

  handleLanguage(newLang) {
    console.log('handleLanguage called with '+newLang);
    if (! _.includes(LocaleSupport.getLocalesSupported(), newLang)) {
      return;
    }

    if (this.lang && newLang === this.lang) {
      return;
    }

    console.log('SET New Lang: '+newLang);
    this.lang = newLang;
    this.msgs = new LocaleSupport(newLang).getMessages();
    this.emitChange();
  }

  getState() {
    return {
        lang: this.lang,
        msgs: this.msgs
    };
  }

  dehydrate() {
    return this.getState();
  }

  rehydrate(state) {
    this.lang = state.lang;
    this.msgs = state.msgs;
  }
}

LanguageStore.storeName = 'LanguageStore';
LanguageStore.handlers = {
  'CHANGE_LANG': 'handleLanguage'
};

export default LanguageStore;
