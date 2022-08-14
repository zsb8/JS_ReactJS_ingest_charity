const { MongoClient } = require("mongodb");
const envMongo = process.env.MONGO;

module.exports = ({ userName, password, server }) => {
  let url;
  if (userName != null && password != null) {
    switch (server) {
      case "waybase-dev.wdylk.mongodb.net" || "waybase-prod.wdylk.mongodb.net":
        url = `mongodb+srv://${userName}:${password}@${server}`;
        break;
      case "192.168.1.101": // my local vm server, only for test
        url = `mongodb://${userName}:${password}@${server}`;
        break;
      default:
        url = null;
        break;
    }
  } else {
    if (envMongo) {
      url = envMongo;
    } else {
      url = null;
    }
  }
  return MongoClient.connect(url);
};
