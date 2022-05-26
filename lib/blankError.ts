import { error } from "../types/error";

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
