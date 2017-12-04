'use strict';

const _ = require('xutil');
const path = require('path');

module.exports = appInfo => {

  const config = exports = {};

  config.keys = appInfo.name;

  config.middleware = [
    'errorHandler',
  ];

  config.notfound = {
    pageUrl: '/notfound',
  };

  config.dataHubView = {
    assetsUrl: '//unpkg.com/datahub-view@latest',
  };

  if (process.env.DATAHUB_STORE_PATH) {
    const storeDir = path.resolve(process.env.DATAHUB_STORE_PATH);

    if (_.isExistedDir(storeDir)) {
      config.dataHubStoreDir = storeDir;
    }
  }

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.i18n = {
    defaultLocale: 'en_US',
    queryField: 'locale',
    cookieField: 'locale',
    cookieMaxAge: '1y',
  };

  const databasePath = path.join(appInfo.HOME, `.${appInfo.name}`);
  _.mkdir(databasePath);

  config.sequelize = {
    dialect: 'sqlite',
    storage: process.env.DATAHUB_DATABASE || path.join(databasePath, `${appInfo.name}.data`),
    logging: false,
  };

  return config;

};

