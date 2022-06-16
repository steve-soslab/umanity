import { raceSelectorForm } from "../types/raceSelectorForm";

/**
 * Used to generate empty state for the useState hook, for the first step of the form so we can get the
 * data from Data warehouse
 * @returns Empty race selector form
 */

const blankRaceSelectorForm = () => {
  const emptyForm: raceSelectorForm = {
    date: "",
    meeting: "",
    raceNumber: "",
    venueName: "",
    eventNumber: "",
  };
  return emptyForm;
};

export default blankRaceSelectorForm;
