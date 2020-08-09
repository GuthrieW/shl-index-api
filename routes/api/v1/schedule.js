const express = require('express');
const httpStatusCodes = require('http-status-codes');
const dbConnection = require('./../../../config/database/database');
const router = express.Router();

router.get(`/`, async (request, response) => {
	dbConnection.then((connection) => {
		const leagueId = request.query.leagueId;
		const seasonId = request.query.seasonId;
		const teamId = request.query.teamId;

		connection.query(
			`SELECT * FROM schedules WHERE SeasonId=${seasonId} AND LeagueId=${leagueId} AND (HOME=${teamId} OR AWAY=${teamId})`,
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

router.get('/header', async (request, response) => {
	dbConnection.then((connection) => {
		const seasonId = request.query.seasonId;
		const leagueId = request.query.leagueId;
		0;
		connection.query(
			`SELECT * FROM schedules WHERE SeasonID=${
				seasonId
					? seasonId
					: `(SELECT DISTINCT SeasonID FROM schedules WHERE LeagueID=${leagueId} ORDER BY SeasonID DESC LIMIT 1)`
			} AND LeagueID=${leagueId}`,
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

router.get('/', async (request, response) => {
	dbConnection.then((connection) => {
		const seasonId = request.query.seasonId;
		const leagueId = request.query.leagueId;

		connection.query(
			`SELECT * FROM schedules WHERE SeasonId=${seasonId} AND LeagueId=${leagueId}`,
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
