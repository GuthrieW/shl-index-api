const express = require("express");
const httpStatusCodes = require("http-status-codes");
const dbConnection = require("./../../../config/database/database");
const router = express.Router();

router.get(`/`, async (request, response) => {
  const leagueId = request.query.leagueId ?? 0;
  const seasonId = request.query.seasonId;
  dbConnection.then((connection) => {
    connection.query(
      `SELECT * FROM conferences WHERE LeagueID=${leagueId} AND SeasonID=${
        seasonId
          ? seasonId
          : `(SELECT DISTINCT SeasonID FROM conferences WHERE LeagueID=${leagueId} ORDER BY SeasonID DESC LIMIT 1)`
      }`,
      (error, results, fields) => {
        if (error) {
          response.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json(error);
          return;
        }

        response.status(httpStatusCodes.OK).json(results);
      }
    );
  });
});

router.get(`/:conferenceId`, async (request, response) => {
  const conferenceId = request.params.conferenceId;
  const leagueId = request.query.leagueId ?? 0;
  const seasonId = request.query.seasonId;

  dbConnection.then((connection) => {
    connection.query(
      `SELECT * FROM conferences WHERE conferenceID=${conferenceId} AND LeagueID=${leagueId} AND SeasonID=${
        seasonId
          ? seasonId
          : `(SELECT DISTINCT SeasonID FROM conferences WHERE LeagueID=${leagueId} ORDER BY SeasonID DESC LIMIT 1)`
      }`,
      (error, results, fields) => {
        if (error) {
          response.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json(error);
          return;
        }

        response.status(httpStatusCodes.OK).json(results);
      }
    );
  });
});

module.exports = router;
