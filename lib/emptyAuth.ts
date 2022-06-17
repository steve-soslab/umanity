import { auth } from "../types/auth";

/**
 * Helps generate blank state for the login components
 * @returns Blank auth type to be used to create Auth state
 */

const emptyAuth = () => {
  const Auth: auth = {
    username: "",
    password: "",
    resetPassword: "",
  };
  return Auth;
};

export default emptyAuth;
