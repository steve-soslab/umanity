import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import TopNavBar from "../components/TopNavBar";
import UmanityForm from "../components/UmanityForm";
import UmanityFormTwo from "../components/UmanityFormTwo";

import { emptyTip } from "../lib/emptyTip";
import { Tip } from "../types/tips";

export default function Home() {
  const newTip = emptyTip();
  const [tip, setTip] = useState<Tip>(newTip);
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
        <UmanityFormTwo tip={tip} setTip={setTip} />
      </div>
    </div>
  );
}