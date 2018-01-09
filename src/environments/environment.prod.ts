const USER_API = "http://localhost:9000";
const ROUTING = {
  UI: {
    ADMIN: "/admin",
    LOGIN: "/login",
    LOGOUT: "/logout"
  },
  API: {
    USER: {
      AUTHENTICATE: "/authenticate"
    }
  }
};

export const environment = {
  production: false,
  routing: ROUTING,
  SESSION_EXPIRE_IN_DAYS: 14,
  SESSION_KEY: "u_session_id",
  API_HOSTS: {
    USERS: USER_API
  }
};

