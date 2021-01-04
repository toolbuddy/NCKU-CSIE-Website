/**
 * API router middleware module for `/api/faculty`.
 *
 * Including following sub-routing modules:
 * - `/api/faculty`
 * - `/api/faculty/lab`
 * - `/api/faculty/publication`
 * - `/api/faculty/[id]`
 */

const express = require('express');

const getFaculty = require('../models/faculty/operations/get-faculty.js');
const getLabs = require('../models/faculty/operations/get-labs.js');
const getPublications = require('../models/faculty/operations/get-publication.js');
const getFacultyDetail = require('../models/faculty/operations/get-faculty-detail.js');

const apis = express.Router();

/**
 * Resolve URL `/api/faculty`.
 */

apis.get('/', async (req, res, next) => {
    try {
        res.json(await getFaculty(Number(req.query.languageId)));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/api/faculty/lab`.
 */

apis.get('/lab', async (req, res, next) => {
    try {
        res.json(await getLabs(Number(req.query.languageId)));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/api/faculty/publication`.
 */

apis.get('/publication', async (req, res, next) => {
    try {
        res.json(await getPublications({
            languageId: Number(req.query.languageId),
            from: Number(req.query.from),
            to: Number(req.query.to),
        }));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/api/faculty/[id]`.
 */

apis.get('/:profileId', async (req, res, next) => {
    try {
        res.json(await getFacultyDetail({
            profileId: Number(req.params.profileId),
            languageId: Number(req.query.languageId),
        }));
    }
    catch (error) {
        next(error);
    }
});

module.exports = apis;
