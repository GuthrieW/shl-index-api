const express = require('express');
const router = express.Router();

router.get(`/`, async (request, response) => {});

router.get(`/:id`, async (request, response) => {});

router.get(`/:id/ratings`, async (request, response) => {});

router.get(`/stats`, async (request, response) => {});

module.exports = router;
