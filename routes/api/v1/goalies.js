const express = require("express");
const httpStatusCodes = require("http-status-codes");
const dbConnection = require("./../../../config/database/database");
const router = express.Router();

router.get(`/`, async (request, response) => {
  dbConnection.then((connection) => {
    const seasonType = request.query.seasonType ?? "rs";
    const seasonId = request.query.seasonId;
    const leagueId = request.query.leagueId ?? 0;
    connection.query(
      `SELECT * FROM player_goalie_stats_${seasonType} WHERE SeasonID=${
        seasonId
          ? seasonId
          : `(SELECT DISTINCT SeasonID FROM player_goalie_stats_${seasonType} WHERE LeagueID=${leagueId} ORDER BY SeasonID DESC LIMIT 1)`
      } AND LeagueID=${leagueId}`,
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

router.get(`/:goalieId`, async (request, response) => {
  dbConnection.then((connection) => {
    const goalieId = request.params.goalieId;
    const seasonType = request.query.seasonType ?? "rs";
    const seasonId = request.query.seasonId;
    const leagueId = request.query.leagueId ?? 0;
    connection.query(
      `SELECT * FROM player_goalie_stats_${seasonType} WHERE PlayerID=${goalieId} AND SeasonID=${
        seasonId
          ? seasonId
          : `(SELECT DISTINCT SeasonID FROM player_goalie_stats_${seasonType} WHERE LeagueID=${leagueId} ORDER BY SeasonID DESC LIMIT 1)`
      } AND LeagueID=${leagueId}`,
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
