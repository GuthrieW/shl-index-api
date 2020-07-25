const express = require('express');
const httpStatusCodes = require('http-status-codes');
const router = express.Router();
const dbConnection = require('./../../../database');

router.get(`/`, async (request, response) => {
	dbConnection.query(
		{
			sql: 'SELECT * FROM conferences',
			timeout: 40000,
		},
		[],
		(error, results, fields) => {
			console.log('fields', fields);

			if (error) {
				console.error(error);
				response
					.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
					.json(error);
			}

			response.status(httpStatusCodes.OK).json(results);
		}
	);

	dbConnection.end();
});

module.exports = router;
