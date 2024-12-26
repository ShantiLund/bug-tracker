(function (window) {
  window.__env = {
    ...(window.__env || {}),
    apiUrl: "http://3.96.248.242:105/api",
    logLevel: 1,
    reqLogging: false,
    idleTimer: 6000,
    idleTimeout: 20000,
    timer: 60, // in seconds/swagger
    maxFileSize: 5 * 1024 * 1024,// (mb -> kb -> b);
    acceptibleExts: ['jpg', 'png', 'pdf', 'jpeg'],
  }
})(this);
