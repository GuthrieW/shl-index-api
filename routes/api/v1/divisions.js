const express = require("express");
const httpStatusCodes = require("http-status-codes");
const dbConnection = require("./../../../config/database/database");
const router = express.Router();

router.get(`/`, async (request, response) => {
  const leagueId = request.query.leagueId ?? 0;
  const conferenceId = request.query.conferenceId;
  const seasonId = request.query.seasonId;

  dbConnection.then((connection) => {
    connection.query(
      `SELECT * FROM divisions WHERE LeagueID=${leagueId} AND SeasonID=${
        seasonId
          ? seasonId
          : `(SELECT DISTINCT SeasonID FROM conferences WHERE LeagueID=${leagueId} ORDER BY SeasonID DESC LIMIT 1)`
      } ${conferenceId ? `AND ConferenceID=${conferenceId}` : ``}`,
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

router.get(`/:divisionId`, async (request, response) => {
  const divisionId = request.params.divisionId;
  const leagueId = request.query.leagueId ?? 0;
  const conferenceId = request.query.conferenceId ?? 0;
  const seasonId = request.query.seasonId;

  dbConnection.then((connection) => {
    connection.query(
      `SELECT * FROM divisions WHERE LeagueID=${leagueId} AND ConferenceID=${conferenceId} AND DivisionID=${divisionId} AND SeasonID=${
        seasonId
          ? seasonId
          : `(SELECT DISTINCT SeasonID FROM divisions WHERE LeagueID=${leagueId} ORDER BY SeasonID DESC LIMIT 1)`
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
