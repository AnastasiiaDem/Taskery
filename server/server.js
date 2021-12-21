const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

require("./app/routes/task.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/project.routes")(app);

const PORT = process.env.PORT || 2200;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
