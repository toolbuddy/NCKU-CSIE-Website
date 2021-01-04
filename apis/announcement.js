/**
 * API router middleware module for `/api/announcement`.
 *
 * Including following sub-routing modules:
 * - `/api/announcement/get-announcements-by-and-tags`
 * - `/api/announcement/get-announcements-by-or-tags`
 * - `/api/announcement/get-pinned-announcements-by-and-tags`
 * - `/api/announcement/get-pinned-announcements-by-or-tags`
 * - `/api/announcement/get-pages-by-and-tags`
 * - `/api/announcement/get-pages-by-or-tags`
 * - `/api/announcement/get-hot-announcements`
 * - `/api/announcement/get-news`
 * - `/api/announcement/[id]`
 */

const express = require('express');

const getAnnouncementsByAndTags = require('../models/announcement/operations/get-announcements-by-and-tags.js');
const getAnnouncementsByOrTags = require('../models/announcement/operations/get-announcements-by-or-tags.js');
const getPinnedAnnouncementsByAndTags = require('../models/announcement/operations/get-pinned-announcements-by-and-tags.js');
const getPinnedAnnouncementsByOrTags = require('../models/announcement/operations/get-pinned-announcements-by-or-tags.js');
const getPagesByAndTags = require('../models/announcement/operations/get-pages-by-and-tags');
const getPagesByOrTags = require('../models/announcement/operations/get-pages-by-or-tags.js');
const getHotAnnouncements = require('../models/announcement/operations/get-hot-announcements.js');
const getNews = require('../models/announcement/operations/get-news.js');
const getAnnouncement = require('../models/announcement/operations/get-announcement.js');

const apis = express.Router();

/**
 * Resolve URL `/api/announcement/get-announcements-by-and-tags`.
 */

apis.get('/get-announcements-by-and-tags', async (req, res, next) => {
    try {
        let tags = req.query.tags || [];
        if (!Array.isArray(tags))
            tags = [tags];
        tags = tags.map(Number);

        res.json(await getAnnouncementsByAndTags({
            tags,
            from: new Date(Number(req.query.from)),
            to: new Date(Number(req.query.to)),
            amount: Number(req.query.amount),
            page: Number(req.query.page),
            languageId: Number(req.query.languageId),
        }));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/api/announcement/get-announcements-by-or-tags`.
 */

apis.get('/get-announcements-by-or-tags', async (req, res, next) => {
    try {
        let tags = req.query.tags || [];
        if (!Array.isArray(tags))
            tags = [tags];
        tags = tags.map(Number);

        res.json(await getAnnouncementsByOrTags({
            tags,
            from: new Date(Number(req.query.from)),
            to: new Date(Number(req.query.to)),
            amount: Number(req.query.amount),
            page: Number(req.query.page),
            languageId: Number(req.query.languageId),
        }));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/api/announcement/get-pinned-announcements-by-and-tags`.
 */

apis.get('/get-pinned-announcements-by-and-tags', async (req, res, next) => {
    try {
        let tags = req.query.tags || [];
        if (!Array.isArray(tags))
            tags = [tags];
        tags = tags.map(Number);

        res.json(await getPinnedAnnouncementsByAndTags({
            tags,
            from: new Date(Number(req.query.from)),
            to: new Date(Number(req.query.to)),
            languageId: Number(req.query.languageId),
        }));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/api/announcement/get-pinned-announcements-by-or-tags`.
 */

apis.get('/get-pinned-announcements-by-or-tags', async (req, res, next) => {
    try {
        let tags = req.query.tags || [];
        if (!Array.isArray(tags))
            tags = [tags];
        tags = tags.map(Number);

        res.json(await getPinnedAnnouncementsByOrTags({
            tags,
            from: new Date(Number(req.query.from)),
            to: new Date(Number(req.query.to)),
            languageId: Number(req.query.languageId),
        }));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/api/announcement/get-pages-by-and-tags`.
 */

apis.get('/get-pages-by-and-tags', async (req, res, next) => {
    try {
        let tags = req.query.tags || [];
        if (!Array.isArray(tags))
            tags = [tags];
        tags = tags.map(Number);

        res.json(await getPagesByAndTags({
            tags,
            from: new Date(Number(req.query.from)),
            to: new Date(Number(req.query.to)),
            amount: Number(req.query.amount),
        }));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/api/announcement/get-pages-by-or-tags`.
 */

apis.get('/get-pages-by-or-tags', async (req, res, next) => {
    try {
        let tags = req.query.tags || [];
        if (!Array.isArray(tags))
            tags = [tags];
        tags = tags.map(Number);

        res.json(await getPagesByOrTags({
            tags,
            from: new Date(Number(req.query.from)),
            to: new Date(Number(req.query.to)),
            amount: Number(req.query.amount),
        }));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/api/announcement/get-hot-announcements`.
 */

apis.get('/get-hot-announcements', async (req, res, next) => {
    try {
        let tags = req.query.tags || [];
        if (!Array.isArray(tags))
            tags = [tags];
        tags = tags.map(Number);

        res.json(await getHotAnnouncements({
            amount: Number(req.query.amount),
            from: new Date(Number(req.query.from)),
            languageId: Number(req.query.languageId),
            page: Number(req.query.page),
            tags,
            to: new Date(Number(req.query.to)),
        }));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/api/announcement/get-news`.
 */

apis.get('/get-news', async (req, res, next) => {
    try {
        res.json(await getNews({
            amount: Number(req.query.amount),
            page: Number(req.query.page),
        }));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/api/announcement/[id]`.
 */

apis.get('/:announcementId', async (req, res, next) => {
    try {
        res.json(await getAnnouncement({
            announcementId: Number(req.params.announcementId),
            languageId: Number(req.query.languageId),
        }));
    }
    catch (error) {
        next(error);
    }
});

module.exports = apis;
