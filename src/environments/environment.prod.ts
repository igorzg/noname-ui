// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const USER_API = "http://localhost:9000";
const ROUTING = {
  UI: {
    ADMIN: "/admin",
    LOGIN: "/login",
    LOGOUT: "/logout"
  },
  API: {
    USER: {
      LIST: "/users",
      AUTHENTICATE: "/authenticate"
    }
  }
};

export const environment = {
  production: true,
  enableRouterTracing: false,
  routing: ROUTING,
  SESSION_EXPIRE_IN_DAYS: 14,
  SESSION_KEY: "u_session_id",
  API_HOSTS: {
    USERS: USER_API
  }
};
