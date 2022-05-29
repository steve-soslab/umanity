import React, { useState } from "react";
import UmanityForm from "../components/UmanityForm";
import UmanityFormTwo from "../components/UmanityFormTwo";
import RaceIDForm from "./RaceIDForm";

import { Tip } from "../types/tips";
import { loadingState } from "../types/loading";
import { error } from "../types/error";

type FormProps = {
  tip: Tip;
  error: error;
  setTip: (tip: Tip) => void;
  loading: loadingState;
  createTipHandler: () => void;
  setRunnerNames: (data: any) => void;
  runnerNames: any;
};

const Form: React.FC<FormProps> = ({
  tip,
  error,
  setTip,
  loading,
  createTipHandler,
  setRunnerNames,
  runnerNames,
}) => {
  const [step, setStep] = useState<number>(0);
  return (
    <React.Fragment>
      {step === 0 && (
        <div className="form--Wrapper">
          <RaceIDForm setRunnerNames={setRunnerNames} setStep={setStep} />
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
