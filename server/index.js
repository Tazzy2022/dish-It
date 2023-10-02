const { db } = require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require("./db/models/seed");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
