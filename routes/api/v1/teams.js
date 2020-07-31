const express = require('express');
const httpStatusCodes = require('http-status-codes');
const dbConnection = require('./../../../config/database/database');
const router = express.Router();

router.get(`/`, async (request, response) => {
	dbConnection.then((connection) => {
		const leagueId = request.query.leagueId;
		connection.query(
			`SELECT * FROM team_data WHERE LeagueId=${leagueId}`,
			(error, results, fields) => {
				if (error) {
					response
						.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
						.json(error);
					return;
				}

				response.status(httpStatusCodes.OK).json(results);
			}
		);
	});
});

router.get(`/:teamId`, async (request, response) => {
	dbConnection.then((connection) => {
		const teamId = request.params.teamId;
		const leagueId = request.query.leagueId;
		connection.query(
			`SELECT * FROM team_data WHERE TeamId=${teamId} AND LeagueId=${leagueId}`,
			(error, results, fields) => {
				if (error) {
					response
						.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
						.json(error);
					return;
				}

				response.status(httpStatusCodes.OK).json(results);
			}
		);
	});
});

router.get(`/:id/roster`, async (request, response) => {
	const teamId = request.query.teamId;
	dbConnection.then((connection) => {
		connection.query(
			`SELECT * FROM player_master WHERE TeamId=${teamId}`,
			(error, results, fields) => {
				if (error) {
					response
						.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
						.json(error);
					return;
				}

				response.status(httpStatusCodes.OK).json(results);
			}
		);
	});
});

module.exports = router;
