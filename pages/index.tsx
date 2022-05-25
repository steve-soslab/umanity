import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import TopNavBar from "../components/TopNavBar";
import UmanityForm from "../components/UmanityForm";
import UmanityFormTwo from "../components/UmanityFormTwo";
import TipsTable from "../components/TipsTable";
import generateDate from "../lib/generateDate";

import { emptyTip } from "../lib/emptyTip";
import generateCsv from "../lib/generateCsv";
import { Tip } from "../types/tips";
import { loadingState } from "../types/loading";
import { error } from "../types/error";
import blankError from "../lib/blankError";

export default function Home() {
  const newDate = generateDate();
  const newTip = emptyTip();
  const emptyError = blankError();
  const [tip, setTip] = useState<Tip>(newTip);
  const [prevTips, setPrevTips] = useState([]);
  const [error, setError] = useState<error>(emptyError);
  const [loading, setLoading] = useState<loadingState>({
    submit: false,
    download: false,
    clear: false,
  });

  const createTipHandler = async () => {
    setError({ ...error, submit: false });
    if (tip.RaceID.trim().length === 0) {
      return setError({ ...error, raceId_formValidation: true });
    }
    setLoading({ ...loading, submit: true });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ ...tip, UUID: new Date().getTime() });

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
    setPrevTips(res);
  };

  const downloadCsvHandler = () => {
    let CSV = "";
    for (let i = 0; i < prevTips.length; i++) {
      CSV += generateCsv(prevTips[i]);
    }

    var encodedUri = encodeURI(CSV);
    var link = document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8," + encodedUri);
    link.setAttribute("download", `racelab_protips${newDate}.csv`);
    document.body.appendChild(link); // Required for FF

    link.click(); // This wil
  };

  React.useEffect(() => {
    readTipsListHandler();
  }, []);

  React.useEffect(() => {
    setError({ ...error, raceId_formValidation: false });
  }, [tip.RaceID]);

  return (
    <div>
      <Head>
        <title>RACELAB | Umanity</title>
        <meta name="description" content="RACELAB tipping site for Umanity" />
        <link rel="icon" href="/BETIA_logo_file.png" />
      </Head>
      <TopNavBar />
      <div className="form--Wrapper">
        <UmanityForm error={error} tip={tip} setTip={setTip} />
        <UmanityFormTwo
          loading={loading}
          createTipHandler={createTipHandler}
          tip={tip}
          setTip={setTip}
          error={error}
        />
      </div>
      <TipsTable
        error={error}
        loading={loading}
        deleteTipsHandler={deleteTipsHandler}
        prevTips={prevTips}
        downloadCsvHandler={downloadCsvHandler}
        readTipsListHandler={readTipsListHandler}
      />
    </div>
  );
}
