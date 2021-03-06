import React, { useState, useEffect } from "react";
import UmanityForm from "../components/UmanityForm";
import UmanityFormTwo from "../components/UmanityFormTwo";
import RaceIDForm from "./RaceIDForm";

import { Tip } from "../types/tips";
import { loadingState } from "../types/loading";
import { error } from "../types/error";
import { raceSelectorForm } from "../types/raceSelectorForm";

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
  step: number;
  setStep: (state: number) => void;
  prevTips: Tip[];
  createTipMark: () => void;
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
  step,
  setStep,
  prevTips,
  createTipMark,
}) => {
  const formatDate = () => {
    const newDate = new Date(raceSelectorForm.date);
    const getDate = newDate.getDate();
    const getMonth = newDate.getMonth() + 1;

    return `${getDate}/${getMonth}`;
  };

  const fetchUmanityRaceId = async () => {
    const UmanityData = {
      raceDate: raceSelectorForm.date,
      venue: raceSelectorForm.venueName,
      raceNumber: raceSelectorForm.raceNumber,
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = await fetch("/api/fetchUmanityCode", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(UmanityData),
    });
    const res = await data.json();
    if (data.ok && res.message) {
      setTip({
        ...tip,
        RaceID: res.message,
        event: `${raceSelectorForm.venueName} R${
          raceSelectorForm.raceNumber
        } ${formatDate()}`,
      });
    }
  };

  useEffect(() => {
    if (step === 0) {
      return;
    }
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
          <UmanityForm
            raceSelectorForm={raceSelectorForm}
            error={error}
            tip={tip}
            setTip={setTip}
            prevTips={prevTips}
            runnerNames={runnerNames}
            createTipMark={createTipMark}
          />
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
