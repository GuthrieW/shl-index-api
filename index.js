const express = require("express");
const shlApi = express();
const port = 8888;
require("dotenv").config();

const leaguesRoute = require("./routes/api/v1/leagues");
const conferencesRoute = require("./routes/api/v1/conferences");
const divisionsRoute = require("./routes/api/v1/divisions");
const teamsRoute = require("./routes/api/v1/teams");
const playersRoute = require("./routes/api/v1/players");
const scheduleRoute = require("./routes/api/v1/schedule");
const gamesRoute = require("./routes/api/v1/games");
const goaliesRoute = require("./routes/api/v1/goalies");

const API_V1 = "/api/v1/";

shlApi.use(`${API_V1}leagues`, leaguesRoute);
shlApi.use(`${API_V1}conferences`, conferencesRoute);
shlApi.use(`${API_V1}divisions`, divisionsRoute);
shlApi.use(`${API_V1}teams`, teamsRoute);
shlApi.use(`${API_V1}players`, playersRoute);
shlApi.use(`${API_V1}schedule`, scheduleRoute);
shlApi.use(`${API_V1}games`, gamesRoute);
shlApi.use(`${API_V1}goalies`, goaliesRoute);

shlApi.get("/", (req, res) => res.send("SHL API V1"));

shlApi.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
