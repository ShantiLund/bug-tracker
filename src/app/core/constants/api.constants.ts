export const API = {
  Identity: {
    Main: 'identity',
    get login() { return `/${this.Main}/Login`; },
  },
}