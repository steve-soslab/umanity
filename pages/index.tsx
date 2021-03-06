//React and Next imports
import React, { useState } from "react";
import Head from "next/head";

//Custom components
import Form from "../components/Form";
import generateDate from "../lib/generateDate";
import TipsTable from "../components/TipsTable";
import TopNavBar from "../components/TopNavBar";
import LoginComponent from "../components/LoginComponent";

//Helper functions and types
import { Tip } from "../types/tips";
import { user } from "../types/user";
import { error } from "../types/error";
import blankError from "../lib/blankError";
import { emptyTip } from "../lib/emptyTip";
import generateCsv from "../lib/generateCsv";
import { loadingState } from "../types/loading";
import generateComment from "../lib/generateComment";
import { raceSelectorForm } from "../types/raceSelectorForm";
import umanityDateGenerator from "../lib/umanityDateGenerator";
import blankRaceSelectorForm from "../lib/blankRaceSelectorForm";

//AWS
import "@aws-amplify/ui-react/styles.css";
import awsconfig from "../src/aws-exports";
import Amplify, { Auth } from "aws-amplify";
Amplify.configure(awsconfig);

const Home = () => {
  const newDate = generateDate();
  const newTip = emptyTip();
  const emptyError = blankError();
  //State used to store the Tip entered in the form
  const [tip, setTip] = useState<Tip>(newTip);
  //Holds the list of previous tips mapped in the table
  const [prevTips, setPrevTips] = useState([]);
  //Error handling for fetch requests
  const [error, setError] = useState<error>(emptyError);
  //Loading state for fetch requests
  const [loading, setLoading] = useState<loadingState>({
    submit: false,
    download: false,
    clear: false,
  });
  //Login state
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<user | null>(null);
  //Used to store the runners fetched from DW
  const [runnerNames, setRunnerNames] = useState(null);
  const blankRaceSelectorFormFields = blankRaceSelectorForm();
  //State for the the form used to choose the race you want to tip on
  const [raceSelectorForm, setRaceSelectorForm] = useState<raceSelectorForm>(
    blankRaceSelectorFormFields
  );
  //The form is multi step, this tracks which step you're on
  const [step, setStep] = useState<number>(0);

  const createTipHandler = async () => {
    setError({ ...error, submit: false });
    if (tip.RaceID.trim().length === 0) {
      return setError({ ...error, raceId_formValidation: true });
    }
    setLoading({ ...loading, submit: true });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ...tip,
      UUID: new Date().getTime(),
      sub: "",
      bet_ticket: true,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    try {
      const data = await fetch("/api/createTip", requestOptions);
      const res = await data.json();
      await readTipsListHandler();
      setLoading({ ...loading, submit: false });
    } catch (error) {
      console.log(error);
      setError({ ...error, submit: true });
      setLoading({ ...loading, submit: false });
    }
  };
  const createTipMark = async () => {
    setError({ ...error, submit: false });
    if (tip.RaceID.trim().length === 0) {
      return setError({ ...error, raceId_formValidation: true });
    }
    var runnerList = {};
    runnerNames.forEach((data, index) => {
      runnerList = { ...runnerList, [index + 1]: data.competitor.name };
    });

    setLoading({ ...loading, submit: true });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ...tip,
      UUID: new Date().getTime(),
      sub: "",
      runnerNames: runnerList,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      bet_ticket: false,
    };
    try {
      const data = await fetch("/api/createTip", requestOptions);
      const res = await data.json();
      await readTipsListHandler();
      setLoading({ ...loading, submit: false });
    } catch (error) {
      console.log(error);
      setError({ ...error, submit: true });
      setLoading({ ...loading, submit: false });
    }
  };

  const deleteTipsHandler = async () => {
    setLoading({ ...loading, clear: true });
    const d = await fetch("/api/deleteDatabaseEntries");
    const res = await d.json();

    await readTipsListHandler();
    setLoading({ ...loading, clear: false });
  };

  const readTipsListHandler = async () => {
    const data = await fetch("/api/readDatabaseEntries");
    const res = await data.json();
    if (Array.isArray(res)) {
      return setPrevTips(res);
    } else {
      return setPrevTips([]);
    }
  };

  const downloadFirstCsvHandler = () => {
    const betTicket = prevTips.filter((data) => data.bet_ticket);
    let CSV = "";
    for (let i = 0; i < betTicket.length; i++) {
      CSV += generateCsv(betTicket[i]);
    }

    var encodedUri = encodeURI(CSV);
    var link = document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8," + encodedUri);
    link.setAttribute("download", `racelab_protips${newDate}.csv`);
    document.body.appendChild(link); // Required for FF

    link.click(); // This wil
  };
  const downloadSecondCsvHandler = () => {
    const tipMark = prevTips.filter((data) => !data.bet_ticket);
    let CSV = "";
    for (let i = 0; i < tipMark.length; i++) {
      CSV += generateComment(tipMark[i]);
    }

    var encodedUri = encodeURI(CSV);
    var link = document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8," + encodedUri);
    link.setAttribute("download", `racelab_comments${newDate}.csv`);
    document.body.appendChild(link); // Required for FF

    link.click(); // This wil
  };

  const checkUser = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    if (attributes) {
      setUser(attributes);
      return setLoggedIn(true);
    }
  };
  React.useEffect(() => {
    checkUser();
    readTipsListHandler();
  }, []);

  React.useEffect(() => {
    setError({ ...error, raceId_formValidation: false });
  }, [tip.RaceID]);

  if (!loggedIn) {
    return (
      <div>
        <Head>
          <title>RACELAB | Umanity</title>
          <meta name="description" content="RACELAB tipping site for Umanity" />
          <link rel="icon" href="https://rlab.racelab.global/favicon.ico" />
        </Head>
        <TopNavBar setLoggedIn={setLoggedIn} />
        <Form
          step={step}
          setStep={setStep}
          tip={tip}
          error={error}
          setTip={setTip}
          loading={loading}
          createTipHandler={createTipHandler}
          setRunnerNames={setRunnerNames}
          runnerNames={runnerNames}
          prevTips={prevTips}
          raceSelectorForm={raceSelectorForm}
          setRaceSelectorForm={setRaceSelectorForm}
          createTipMark={createTipMark}
        />
        <TipsTable
          error={error}
          loading={loading}
          deleteTipsHandler={deleteTipsHandler}
          prevTips={prevTips}
          downloadFirstCsvHandler={downloadFirstCsvHandler}
          downloadSecondCsvHandler={downloadSecondCsvHandler}
          readTipsListHandler={readTipsListHandler}
        />
      </div>
    );
  }

  return (
    <LoginComponent
      error={error}
      setError={setError}
      setLoggedIn={setLoggedIn}
      setUser={setUser}
    />
  );
};

export default Home;
