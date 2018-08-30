// tslint:disable:strict-boolean-expressions
// tslint:disable-next-line
const environment = require('../../../../../generated_modules/environment/environment.json').environment;

export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  DEMO = 'demo',
  PRODUCTION = 'production'
}

export class EnvironmentService {

  public static get = (): Environment => {
    const fileEnv = EnvironmentService.getEnvFromLocalFile();

    return fileEnv ? fileEnv : EnvironmentService.getEnvFromHostname();
  }

  private static getEnvFromHostname = (): Environment => {
    const urlEnvPrefix = window.location.hostname.split('.')[0];
    switch (urlEnvPrefix) {
      case 'localhost':
        return Environment.DEVELOPMENT;
      case 'dev':
        return Environment.DEVELOPMENT;
      case 'stage':
        return Environment.STAGING;
      case 'demo':
        return Environment.DEMO;
      case 'app':
        return Environment.PRODUCTION;
      default:
        return Environment.PRODUCTION;
    }
  }

  private static getEnvFromLocalFile = (): Environment | undefined =>
    // tslint:disable
    <any>Environment[environment]
}