import { error } from "../types/error";

/**
 * Pre defines the useState hook for custom error messages
 * @returns null error messages to be used to set the base state
 */

const blankError = () => {
  const emptyError: error = {
    submit: false,
    download: false,
    clear: false,
    raceId_formValidation: false,
    auth: "",
  };
  return emptyError;
};
export default blankError;
