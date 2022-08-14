import Head from "next/head";
import React, { useState } from "react";
import Router from "next/router";
import { Button, Spin } from "antd";
import styles from "./index.module.scss";
import ConfirmUploadPage from "./ConfirmUploadPage";
import SelectFilePage from "./SelectFilePage";

export default function Home() {
  const [result, setResult] = useState("No Result");
  const [show, setShow] = useState(true);
  const [datafile, setDatafile] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [userName, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [server, setServer] = useState("waybase-dev.wdylk.mongodb.net");
  const [database, setDatabase] = useState("charity");
  const [collection, setCollection] = useState("charities");
  // POST data to the back-end
  const saveCharityCSV = async () => {
    setResult("Processing, please wait ...");
    setShow(false);
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}charity`);
    const body = {
      type: "saveCharityCSV",
      fileName,
      userName,
      password,
      server,
      database,
      collection,
    };
    const dataSessions = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await dataSessions.json();
    const res = resData.results;
    switch (res) {
      case "success": {
        setResult("Success!");
        break;
      }
      case "error": {
        setResult("Error");
        break;
      }
      default:
        break;
    }
  };

  // Button, select file and upload file to server
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setDatafile(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", datafile);
    const response = await fetch("/api/file", {
      method: "POST",
      body,
    });
    const res = await response.json();
    setFileName(res.fileName);
  };

  const goHome = () => {
    setResult("No Result");
    setShow(true);
    setFileName(false);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Churity Input MongoDB</title>
        <link rel="icon" href="/waybase.jpg" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a className={styles.aa} href="https://www.waybase.com">
            WayBase!
          </a>
        </h1>
        <br></br>
        <div>
          <di>
            <h1 className={styles.result_word}>{result}</h1>
          </di>
          <di>
            <br />
            {result === "Success!" && (
              <div className={styles.setCenter}>
                <Button
                  onClick={goHome}
                  type="primary"
                  className={styles.bottomGoHome}
                >
                  Go Home
                </Button>
              </div>
            )}
            {result === "Processing, please wait ..." && (
              <div className={styles.setCenter}>
                <Spin />
              </div>
            )}
          </di>
        </div>

        {show && (
          <div>
            <div>
              {!fileName && (
                <div>
                  <SelectFilePage
                    uploadToClient={uploadToClient}
                    uploadToServer={uploadToServer}
                  />
                </div>
              )}
            </div>
            <div>
              {fileName && (
                <div>
                  <ConfirmUploadPage
                    saveCharityCSV={saveCharityCSV}
                    fileName={fileName}
                    setUser={setUser}
                    setPassword={setPassword}
                    setServer={setServer}
                    setDatabase={setDatabase}
                    setCollection={setCollection}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        Powered by{" "}
        <img src="/waybase.jpg" alt="Vercel" className={styles.logo} />
      </footer>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
