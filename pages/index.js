import { Roboto } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { LaunchCard } from "@/components/LaunchCard";
import { useLaunches } from "@/hooks/useLaunches";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400"] });

export default function Home() {
  const { launches, meta, loading, error } = useLaunches({
    page: 1,
    limit: 10,
  });

  if (loading) return (
    <div className={styles.loading}>
      <p>Loading launches...</p>
    </div>
  );
  
  if (error) return (
    <div className={styles.error}>
      <p>Error: {error}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );

  return (
    <>
      <Head>
        <title>SpaceX Launch Tracker</title>
        <meta
          name="description"
          content="SpaceX launch monitoring application"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={`${styles.header} ${roboto.className}`}>
        <h1 className={styles.header__title}>Space X Launch Tracker</h1>
      </header>
      <main className={`${styles.main} ${roboto.className}`}>
        <section role="card-container" className={styles.main__section}>
          {launches.map((launch) => (
            <LaunchCard key={launch.id} launch={launch} />
          ))}
        </section>
      </main>
    </>
  );
}
