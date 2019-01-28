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
    `${process.env.API_URL}
      ?function=SYMBOL_SEARCH&keywords=${param}
      &apikey=${process.env.API_KEY}`,
    (err, response, body) => {
      if (err) {
        return console.dir(err);
      }
      res.send(JSON.parse(body));
    }
  );
});

app.get("/detail", (req, res) => {
  const param = req.query.sym;
  request.get(
    `${
      process.env.API_URL
    }?function=TIME_SERIES_INTRADAY&symbol=${param}&interval=1min&apikey=${
      process.env.API_KEY
    }`,
    (err, response, body) => {
      if (err) {
        return console.dir(err);
      }
      res.send(JSON.parse(body));
    }
  );
});

app.get("/detailWtihSSE", (req, res) => {
  const param = req.query.sym;
  console.log(param);
  request.get(
    `${
      process.env.API_URL
    }?function=TIME_SERIES_INTRADAY&symbol=${param}&interval=1min&apikey=${
      process.env.API_KEY
    }`,
    (err, response, body) => {
      if (err) {
        return console.dir(err);
      }

      res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
      });
      setTimeout(() => {
        res.write("data:" + JSON.stringify(JSON.parse(body)));
        res.write("\n\n");
      }, 3000);
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
