import axios from "axios";

// Global handler for expired/invalid sessions.
// When the API rejects our stored token (401), clear the stale session
// and send the user to the login page instead of failing silently.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthError = error.response?.status === 401;
    const hadSession = !!localStorage.getItem("token");
    const isLoginRequest = error.config?.url?.includes("/api/auth/login");

    if (isAuthError && hadSession && !isLoginRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.assign("/login");
    }

    return Promise.reject(error);
  }
);
