export class EnvService {
  constructor() { }
  apiUrl = ' http://localhost:3000/api';
  logLevel = 3;
  reqLogging = false;
  maxFileSize = 5 * 1024 * 1024; // (mb -> kb -> b);
  timer = 60;
  acceptibleExts = ['jpg', 'png', 'pdf', 'jpeg'];
  idleTimer = 6000;
  idleTimeout = 20000;
}

export const EnvServiceFactory = () => {

  let env: any = new EnvService();

  const browserWindow: any = window || {};
  const browserWindowEnv: any = browserWindow['__env'] || {};

  env = Object.assign(env, browserWindowEnv);

  return env;
};

export const EnvServiceProvider = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [],
};
