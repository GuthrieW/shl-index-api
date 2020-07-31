const express = require('express');
const httpStatusCodes = require('http-status-codes');
const dbConnection = require('./../../../config/database/database');
const router = express.Router();

router.get(`/`, async (request, response) => {
	dbConnection.then((connection) => {
		connection.query(
			`SELECT * FROM league_data`,
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
