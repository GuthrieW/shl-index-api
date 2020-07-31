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

module.exports = router;
