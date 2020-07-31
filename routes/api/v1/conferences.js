const express = require('express');
const httpStatusCodes = require('http-status-codes');
const router = express.Router();
// const dbConnection = require('./../../../config/database');
const dbConnection = require('./../../../config/database/database');

router.get(`/`, async (request, response) => {
	const conferenceId = request.params.conferenceId;
	const seasonId = request.params.seasonId || 54;
	dbConnection.then((connection) => {
		connection.query(
			`SELECT * FROM conferences WHERE ConferenceID=${conferenceId} AND SeasonID=${seasonId}`,
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
