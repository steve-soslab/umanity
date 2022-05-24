import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import TopNavBar from "../components/TopNavBar";
import UmanityForm from "../components/UmanityForm";
import UmanityFormTwo from "../components/UmanityFormTwo";
import TipsTable from "../components/TipsTable";

import { emptyTip } from "../lib/emptyTip";
import generateCsv from "../lib/generateCsv";
import { Tip } from "../types/tips";
import { loadingState } from "../types/loading";

export default function Home() {
  const newTip = emptyTip();
  const [tip, setTip] = useState<Tip>(newTip);
  const [prevTips, setPrevTips] = useState([]);
  const [loading, setLoading] = useState<loadingState>({
    submit: false,
    download: false,
    clear: false,
  });

  const createTipHandler = async () => {
    setLoading({ ...loading, submit: true });
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ ...tip, UUID: new Date().getTime() });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const data = await fetch("/api/createTip", requestOptions);
    const res = await data.json();
    await readTipsListHandler();
    setLoading({ ...loading, submit: false });
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
    console.log(CSV);
    var encodedUri = encodeURI(CSV);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This wil
  };

  React.useEffect(() => {
    readTipsListHandler();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNavBar />
      <div className="form--Wrapper">
        <UmanityForm tip={tip} setTip={setTip} />
        <UmanityFormTwo
          loading={loading}
          createTipHandler={createTipHandler}
          tip={tip}
          setTip={setTip}
        />
      </div>
      <TipsTable
        loading={loading}
        deleteTipsHandler={deleteTipsHandler}
        prevTips={prevTips}
        downloadCsvHandler={downloadCsvHandler}
      />
    </div>
  );
}
