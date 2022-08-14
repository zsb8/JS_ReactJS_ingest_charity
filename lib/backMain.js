import { MongoClient } from "mongodb";
import csv from "csvtojson";
import chunk from "lodash/chunk";
import parse from "./parse";
import mongoDataOperate from "./mongoDataOperate";

module.exports = {
  async saveCharityCSV({
    fileName,
    userName,
    password,
    server,
    database,
    collection,
  }) {
    let result = "error";
    // Read CSV
    let csvFilePath = "./public_data/";
    csvFilePath = csvFilePath.concat(fileName);
    csv()
      .fromFile(csvFilePath)
      .then((jsonObj) => {
        console.log("jsonObj");
      });
    const jsonArray = await csv().fromFile(csvFilePath);
    console.log("The rows number of jsonArray is：", jsonArray.length);
    const newData = jsonArray.map(function (i) {
      const myparse = parse(i);
      return myparse;
    });
    try {
      const mychunk = chunk(newData, 50000);
      const mongoServerInfo = { userName, password, server };
      const mongooProcessResult = await Promise.all(
        mychunk.map(async (oneChunk) => {
          const res = await mongoDataOperate.process({
            oneChunk,
            mongoServerInfo,
            database,
            collection,
          });
          return res;
        })
      );
      if (mongooProcessResult[0]) {
        result = "success";
      } else {
        result = "error";
      }
    } catch (err) {
      console.log("err：" + err.message);
      result = "error";
    } finally {
      return result;
    }
  },
};
