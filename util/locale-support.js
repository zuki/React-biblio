'use strict';
import _ from 'lodash';
import areIntlLocalesSupported from 'intl-locales-supported';
import IntlMessageFormat from 'intl-messageformat';
const LOCALES_MY_APP_SUPPORTS = ['ja', 'en'];
const MESSAGES = _.reduce(LOCALES_MY_APP_SUPPORTS, (result, locale) => {
  const locale_messages = require(`../lang/${locale}`);
  result[locale] = locale_messages;
  return result;
}, {});

if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(LOCALES_MY_APP_SUPPORTS)) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and replace the constructors with need with the polyfill's.
        require('intl');
        Intl.NumberFormat   = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
} else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
}

export default class LocaleSupport {
  constructor(locale) {
    this.locale = locale || 'en';
    this.messages = this.setMessages(this.locale);
  }

  static getLocalesSupported() {
    return LOCALES_MY_APP_SUPPORTS;
  }

  getMessages() {
    return this.messages;
  }

  setMessages(locale) {
    const messages = MESSAGES[locale];
    return _.reduce(messages, (result, value, key) => {
      result[key] = new IntlMessageFormat(messages[key], locale).format();
      return result;
    }, {});
  }

  changeLocale(locale) {
    if (_.includes(LOCALES_MY_APP_SUPPORTS, locale)) {
      this.locale = locale;
      this.messages = this.setMessages(locale);
    } else {
      throw new Error(`Specified locale (${locale}) is not supported`);
    }
  }
}
