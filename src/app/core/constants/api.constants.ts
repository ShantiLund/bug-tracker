export const API = {
  Identity: {
    Main: 'identity',
    get login() { return `/${this.Main}/login`; },
  },
  Users: {
    get users() { return `/users` }
  },
  Categories: {
    get categories() { return `/category` }
  },
  Projects: {
    get get() { return `/projects` },
    get project() { return `/project` }
  },
  Upload: {
    get upload() { return `/uploadFile` }
  }
}