const express = require('express');
const httpStatusCodes = require('http-status-codes');
const dbConnection = require('./../../../config/database/database');
const router = express.Router();

router.get(`/`, async (request, response) => {
	dbConnection.then((connection) => {
		const seasonType = request.query.seasonType;
		const seasonId = request.query.seasonId;
		const leagueId = request.query.leagueId;
		connection.query(
			`SELECT * FROM player_goalie_stats_${seasonType} WHERE SeasonID=${seasonId} AND LeagueID=${leagueId}`,
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
