import React, { useState, useEffect } from "react";
import UmanityForm from "../components/UmanityForm";
import UmanityFormTwo from "../components/UmanityFormTwo";
import RaceIDForm from "./RaceIDForm";

import { Tip } from "../types/tips";
import { loadingState } from "../types/loading";
import { error } from "../types/error";
import { raceSelectorForm } from "../types/raceSelectorForm";

import umanityDateGenerator from "../lib/umanityDateGenerator";
import generateTrackId from "../lib/generateTrackId";
import { UmanityRaceID } from "../types/race";

type FormProps = {
  tip: Tip;
  error: error;
  setTip: (tip: Tip) => void;
  loading: loadingState;
  createTipHandler: () => void;
  setRunnerNames: (data: any) => void;
  runnerNames: any;
  raceSelectorForm: raceSelectorForm;
  setRaceSelectorForm: (state: raceSelectorForm) => void;
};

const Form: React.FC<FormProps> = ({
  tip,
  error,
  setTip,
  loading,
  createTipHandler,
  setRunnerNames,
  runnerNames,
  raceSelectorForm,
  setRaceSelectorForm,
}) => {
  const [step, setStep] = useState<number>(0);

  const fetchUmanityRaceId = async () => {
    const TrackID = generateTrackId(raceSelectorForm.venueName);
    if (TrackID.error) {
      return;
    }
    const RaceDate = umanityDateGenerator(raceSelectorForm.date);
    const RaceNumber =
      JSON.stringify(raceSelectorForm.raceNumber).length === 1
        ? `0${raceSelectorForm.raceNumber}`
        : `${raceSelectorForm.raceNumber}`;

    const UmanityData: UmanityRaceID = {
      RaceDate: RaceDate,
      TrackID: TrackID.venue,
      RaceNumber: RaceNumber,
      UmanityID: "",
    };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = await fetch("/api/readRaceID", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(UmanityData),
    });
    const res = await data.json();
    if (data.ok && res.UmanityID !== "") {
      setTip({ ...tip, RaceID: res.UmanityID });
    }
  };

  useEffect(() => {
    fetchUmanityRaceId();
  }, [step]);

  return (
    <React.Fragment>
      {step === 0 && (
        <div className="form--Wrapper">
          <RaceIDForm
            raceSelectorForm={raceSelectorForm}
            setRaceSelectorForm={setRaceSelectorForm}
            setRunnerNames={setRunnerNames}
            setStep={setStep}
          />
        </div>
      )}
      {step === 1 && (
        <div className="form--Wrapper">
          <UmanityForm error={error} tip={tip} setTip={setTip} />
          <UmanityFormTwo
            runnerNames={runnerNames}
            loading={loading}
            createTipHandler={createTipHandler}
            tip={tip}
            setTip={setTip}
            error={error}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Form;
