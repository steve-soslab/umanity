import { raceSelectorForm } from "../types/raceSelectorForm";

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
