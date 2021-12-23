const mongoose = require("mongoose");
require("dotenv").config();

// connect functions
const connect = () => {
  if (process.env.node_ENV !== "production") {
    mongoose.set("debug", true);
  }
  // show mongoose queries only when not in a production environment

  const uri = process.env.ATLAS_URI;
  
  mongoose.connect(
    uri,
    {
      //connnect to clubism database
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log("connection error occured", err);
      } else {
        console.log("connection success");
      }
    }
  );
};

mongoose.connection.on("error", (err) => {
  console.error("connection error occured", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("the connection has been disrupted. Try connect to it again");
  connect();
});

module.exports = connect;
