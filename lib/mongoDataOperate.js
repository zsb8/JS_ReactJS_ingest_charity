import mongodb from "./mongodb";
module.exports = {
  async process({ oneChunk, mongoServerInfo, database, collection }) {
    let conn = null;
    let res = false;
    try {
      conn = await mongodb(mongoServerInfo);
      if (conn) {
        console.log("DB connected.");
        const test = conn.db(database).collection(collection);
        const inserActive = async (block) => {
          const bulk = test.initializeOrderedBulkOp();
          block.forEach(({ businessNumber, year, ...rest }) => {
            const id = `CA:${businessNumber}`;
            const doc = {
              countryCode: "CA",
              charityNumber: businessNumber,
              businessNumber,
            };
            bulk
              .find({ _id: id })
              .upsert()
              .updateOne({
                $set: doc,
                $pull: {
                  years: {
                    year,
                  },
                },
              });
            bulk.find({ _id: id }).updateOne({
              $push: {
                years: {
                  $each: [
                    {
                      year,
                      ...rest,
                    },
                  ],
                  $sort: { year: 1 },
                },
              },
            });
          });
          await bulk.execute();
        };
        await inserActive(oneChunk);
      } else {
        console.log("DB connect failed.");
      }
    } catch (err) {
      console.log("err：" + err.message);
      conn = null;
    } finally {
      if (conn != null) {
        conn.close();
        res = true;
      }
    }
    return res;
  },
};
