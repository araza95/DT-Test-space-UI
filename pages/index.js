//imports
import { Inter, Mooli, Roboto, Titillium_Web } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";

// component imports
import Image from "next/image";
import Head from "next/head";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400"] });
const titillium = Titillium_Web({ subsets: ["latin"], weight: "600" });

import { LaunchCard } from "@/components/LaunchCard";

export default function Home() {
  const [apiData, setApiData] = useState([]);
  console.log("🚀 ~ Home ~ apiData:", apiData);

  // API fetch logic
  useEffect(() => {
    const queryOptions = {
      select: "id name date_utc success upcoming details failures links",
      sort: "date_utc",
      limit: 1,
    };
    // fetch data from API
    const getlaunchData = async () => {
      try {
        const url = "https://api.spacexdata.com/v5/launches/query";
        const response = await axios.post(url, {
          options: queryOptions,
        });

        // Store response locally, use the docs node
        setApiData(response.data.docs);
      } catch (error) {
        console.error(error);
      }
    };
    // Call the API
    getlaunchData();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="space x monitor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={`${styles.header} ${roboto.className} `}>
        <h1 className={styles.header__title}>Space X Launch Tracker </h1>
      </header>
      <main className={`${styles.main} ${roboto.className}`}>
        <section role="card-container" className={styles.main__section}>
          {apiData.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
        </section>
      </main>
    </>
  );
}
