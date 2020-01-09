global.Promise = require("bluebird");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger/swagger.json");
const fs = require("fs").promises;
const card = require("./routes/card");
const score = require("./routes/score");
const logger = require("./utils/logger");

require("dotenv").config();

const port = process.env.PORT;
const fileName = process.env.SCORE_FILE_NAME;

const app = express();

app.use(express.json());
app.use(cors());
logger.debug("Overriding 'Express' logger");
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: false }));

(async () => {
  await fs.writeFile(fileName, "[]");
})();

app.get("/", (req, res) => res.json({ msg: "Hello World" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/card", card);
app.use("/api/score", score);

app.listen(port, function() {
  console.log(`Node server listening on port ${port}`);
});
