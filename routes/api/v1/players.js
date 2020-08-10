const express = require("express");
const httpStatusCodes = require("http-status-codes");
const dbConnection = require("./../../../config/database/database");
const router = express.Router();

router.get(`/`, async (request, response) => {
  dbConnection.then((connection) => {
    connection.query(
      `SELECT * FROM player_master WHERE TeamID != -1`,
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

router.get(`/:id`, async (request, response) => {
  dbConnection.then((connection) => {
    const playerId = request.query.playerId;
    connection.query(
      `SELECT * FROM player_master WHERE PlayerId=${playerId}`,
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

router.get(`/:id/ratings`, async (request, response) => {
  dbConnection.then((connection) => {
    const playerId = request.query.playerId;
    connection.query(
      `SELECT * FROM player_ratings WHERE PlayerId=${playerId}`,
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

router.get(`/stats/:seasonType`, async (request, response) => {
  dbConnection.then((connection) => {
    const seasonType = request.query.seasonType;
    connection.query(
      `SELECT * FROM player_skate_stats_${seasonType}`,
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
