const express = require("express");
const request = require("request");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3002;

app.get("/", (req, res) => {
  const param = req.query.sym;
  request.get(
    process.env.API_URL +
      `&keywords=${param}` +
      `&apikey=${process.env.API_KEY}`,
    (err, response, body) => {
      if (err) {
        return console.dir(err);
      }
      res.send(JSON.parse(body));
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
