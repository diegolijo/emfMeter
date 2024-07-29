declare const require: any;
export const environment = {
  production: false,
  appVersion: require('../../package.json').version,
  debug: false
};
