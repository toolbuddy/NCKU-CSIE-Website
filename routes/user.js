/**
 * Router module for route `/user`.
 * This route could only be accessed by authenticated users.
 *
 * Including following sub-routes:
 * - `/user`
 * - `/user/id`
 * - `/user/faculty/profile`
 * - `/user/faculty/award`
 * - `/user/faculty/project`
 * - `/user/faculty/patent`
 * - `/user/faculty/conference`
 * - `/user/faculty/student-award`
 * - `/user/faculty/publication`
 * - `/user/faculty/technology-transfer`
 * - `/user/staff/profile`
 * - `/user/announcement`
 * - `/user/announcement/add`
 * - `/user/announcement/edit/[id]`
 * - `/user/resetPassword`
 */

const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');

const {urlEncoded, jsonParser} = require('./utils/body-parser.js');
const allowUserOnly = require('./utils/allow-user-only.js');
const noCache = require('./utils/no-cache.js');
const staticHtml = require('./utils/static-html.js');

const getFacultyMiniProfile = require('../models/faculty/operations/get-faculty-mini-profile.js');
const getFacultyDetailWithId = require('../models/faculty/operations/get-faculty-detail-with-id.js');
const addFacultyDetail = require('../models/faculty/operations/add-faculty-detail.js');
const updateFacultyDetail = require('../models/faculty/operations/update-faculty-detail.js');
const deleteFacultyDetail = require('../models/faculty/operations/delete-faculty-detail.js');
const getStaffMiniProfile = require('../models/staff/operations/get-staff-mini-profile.js');
const getStaffDetailWithId = require('../models/staff/operations/get-staff-detail-with-id.js');
const addStaffDetail = require('../models/staff/operations/add-staff-detail.js');
const updateStaffDetail = require('../models/staff/operations/update-staff-detail.js');
const deleteStaffDetail = require('../models/staff/operations/delete-staff-detail.js');
const getAnnouncement = require('../models/announcement/operations/get-announcement.js');
const postAnnouncement = require('../models/announcement/operations/post-announcement.js');
const updateAnnouncement = require('../models/announcement/operations/update-announcement.js');
const pinAnnouncement = require('../models/announcement/operations/pin-announcement.js');
const deleteAnnouncements = require('../models/announcement/operations/delete-announcements.js');
const getAdminByAccount = require('../models/auth/operations/get-admin-by-account.js');
const updateAdmin = require('../models/auth/operations/update-admin.js');

const roleUtils = require('../models/auth/utils/role.js');
const degreeUtils = require('../models/faculty/utils/degree.js');
const nationUtils = require('../models/faculty/utils/nation.js');
const projectCategoryUtils = require('../models/faculty/utils/project-category.js');
const publicationCategoryUtils = require('../models/faculty/utils/publication-category.js');
const departmentUtils = require('../models/faculty/utils/department.js');
const researchGroupUtils = require('../models/faculty/utils/research-group.js');
const tagUtils = require('../models/announcement/utils/tag.js');

const router = express.Router({
    caseSensitive: true,
    mergeParams: false,
    strict: false,
});

const upload = multer({
    storage: multer.memoryStorage(),
});

router.use(allowUserOnly);

/**
 * Resolve URL `/user`.
 */

router
.route('/')
.get(noCache, (req, res) => {
    if (req.session.user.role === roleUtils.getIdByOption('faculty'))
        res.redirect('/user/faculty');
    else if (req.session.user.role === roleUtils.getIdByOption('staff'))
        res.redirect('/user/staff');
    else
        res.redirect('/index');
});

/**
 * Resolve URL `/user/id`.
 * For frontend to get user's session data.
 */

router
.route('/id')
.get((req, res) => {
    res.json({
        role: req.session.user.role,
        roleId: req.session.user.roleId,
    });
});

/**
 * Resolve URL `/user/miniProfile`.
 * For frontend to render toolbar.
 */

router
.route('/miniProfile')
.get(async (req, res, next) => {
    try {
        if (req.session.user.role === roleUtils.getIdByOption('faculty')) {
            res.json(await getFacultyMiniProfile({
                profileId: req.session.user.roleId,
                languageId: Number(req.query.languageId),
            }));
        }
        else if (req.session.user.role === roleUtils.getIdByOption('staff')) {
            res.json(await getStaffMiniProfile({
                profileId: req.session.user.roleId,
                languageId: Number(req.query.languageId),
            }));
        }
        else {
            const error = new Error('Invalid role');
            error.status = 400;
            throw error;
        }
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/user/profile`.
 * Redirect to correct profile page according to role.
 */

router
.route('/profile')
.get(noCache, (req, res) => {
    if (req.session.user.role === roleUtils.getIdByOption('faculty'))
        res.redirect('/user/faculty/profile');
    else if (req.session.user.role === roleUtils.getIdByOption('staff'))
        res.redirect('/user/staff/profile');
    else
        res.redirect('/index');
});

/**
 * Resolve URL `/faculty/facultyWithId`.
 * Return teacher's profile detail records with its id.
 */

router
.route('/profileWithId')
.get(async (req, res, next) => {
    try {
        if (req.session.user.role === roleUtils.getIdByOption('faculty')) {
            res.json(await getFacultyDetailWithId({
                profileId: req.session.user.roleId,
                languageId: req.query.languageId,
            }));
        }
        else if (req.session.user.role === roleUtils.getIdByOption('staff')) {
            res.json(await getStaffDetailWithId({
                profileId: req.session.user.roleId,
                languageId: req.query.languageId,
            }));
        }
        else {
            const error = new Error('Invalid role.');
            error.status = 403;
            throw error;
        }
    }
    catch (error) {
        next(error);
    }
});

router
.route('/staff')
.get(staticHtml('user/staff/index'));

router
.route('/staff/staffWithId/:id')
.get(async (req, res, next) => {
    try {
        res.json(await getStaffDetailWithId({
            profileId: req.session.user.roleId,
            languageId: req.query.languageId,
        }));
    }
    catch (error) {
        next(error);
    }
});

router
.route('/faculty')
.get(staticHtml('user/faculty/index'));

/**
 * Resolve URL `/user/faculty/profile`
 * For teacher to manage his / her profile detail.
 */

router
.route('/faculty/profile')
.get(noCache, async (req, res, next) => {
    try {
        const data = await getFacultyDetailWithId({
            profileId: req.session.user.roleId,
            languageId: req.query.languageId,
        });

        res.locals.UTILS.faculty = {
            departmentUtils,
            researchGroupUtils,
            degreeUtils,
            nationUtils,
        };

        await new Promise((resolve, reject) => {
            res.render('user/faculty/profile.pug', {
                data,
            }, (err, html) => {
                if (err)
                    reject(err);
                else {
                    res.send(html);
                    resolve();
                }
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
})
.post(urlEncoded, jsonParser, async (req, res, next) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption('faculty') ||
            req.session.user.roleId !== req.body.data.profileId
        ) {
            const error = new Error('Try to modify profile that doesn\'t belong to this user.');
            error.status = 401;
            throw error;
        }

        res.send(await addFacultyDetail(req.body));
    }
    catch (error) {
        next(error);
    }
})
.patch(urlEncoded, jsonParser, async (req, res, next) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption('faculty') ||
            req.session.user.roleId !== req.body.profileId
        ) {
            const error = new Error('Try to modify profile that doesn\'t belong to this user.');
            error.status = 401;
            throw error;
        }
        res.send(await updateFacultyDetail(req.body));
    }
    catch (error) {
        next(error);
    }
})
.put(upload.single('file'), async (req, res, next) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption('faculty') ||
            req.session.user.roleId !== Number(req.body.profileId)
        ) {
            const error = new Error('Try to modify profile that doesn\'t belong to this user.');
            error.status = 401;
            throw error;
        }

        res.send(await updateFacultyDetail({
            dbTable: 'profile',
            profileId: Number(req.body.profileId),
            dbTableItemId: Number(req.body.profileId),
            item: {
                photo: req.file.buffer,
            },
            i18n: [],
        }));
    }
    catch (error) {
        next(error);
    }
})
.delete(urlEncoded, jsonParser, async (req, res, next) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption('faculty') ||
            req.session.user.roleId !== req.body.profileId
        ) {
            const error = new Error('Try to modify profile that doesn\'t belong to this user.');
            error.status = 401;
            throw error;
        }

        res.send(await deleteFacultyDetail(req.body));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/user/faculty/award`.
 */

router
.route('/faculty/award')
.get(noCache, async (req, res, next) => {
    try {
        const data = await getFacultyDetailWithId({
            profileId: req.session.user.roleId,
            languageId: req.query.languageId,
        });

        await new Promise((resolve, reject) => {
            res.render('user/faculty/award.pug', {
                data,
            }, (err, html) => {
                if (err)
                    reject(err);
                else {
                    res.send(html);
                    resolve();
                }
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
});

/**
 * Resolve URL `/user/faculty/project`.
 */

router
.route('/faculty/project')
.get(noCache, async (req, res, next) => {
    try {
        const data = await getFacultyDetailWithId({
            profileId: req.session.user.roleId,
            languageId: req.query.languageId,
        });

        res.locals.UTILS.faculty = {
            projectCategoryUtils,
        };

        await new Promise((resolve, reject) => {
            res.render('user/faculty/project.pug', {
                data,
            }, (err, html) => {
                if (err)
                    reject(err);
                else {
                    res.send(html);
                    resolve();
                }
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
});

/**
 * Resolve URL `/user/faculty/patent`.
 */

router
.route('/faculty/patent')
.get(noCache, async (req, res, next) => {
    try {
        const data = await getFacultyDetailWithId({
            profileId: req.session.user.roleId,
            languageId: req.query.languageId,
        });

        res.locals.UTILS.faculty = {
            nationUtils,
        };

        await new Promise((resolve, reject) => {
            res.render('user/faculty/patent.pug', {
                data,
            }, (err, html) => {
                if (err)
                    reject(err);
                else {
                    res.send(html);
                    resolve();
                }
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
});

/**
 * Resolve URL `/user/faculty/conference`.
 */

router
.route('/faculty/conference')
.get(noCache, async (req, res, next) => {
    try {
        const data = await getFacultyDetailWithId({
            profileId: req.session.user.roleId,
            languageId: req.query.languageId,
        });

        await new Promise((resolve, reject) => {
            res.render('user/faculty/conference.pug', {
                data,
            }, (err, html) => {
                if (err)
                    reject(err);
                else {
                    res.send(html);
                    resolve();
                }
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
});

/**
 * Resolve URL `/user/faculty/student-award`.
 */

router
.route('/faculty/student-award')
.get(noCache, async (req, res, next) => {
    try {
        const data = await getFacultyDetailWithId({
            profileId: req.session.user.roleId,
            languageId: req.query.languageId,
        });

        res.locals.UTILS.faculty = {
            degreeUtils,
        };

        await new Promise((resolve, reject) => {
            res.render('user/faculty/student-award.pug', {
                data,
            }, (err, html) => {
                if (err)
                    reject(err);
                else {
                    res.send(html);
                    resolve();
                }
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
});

/**
 * Resolve URL `/user/faculty/publication`.
 */

router
.route('/faculty/publication')
.get(noCache, async (req, res, next) => {
    try {
        const data = await getFacultyDetailWithId({
            profileId: req.session.user.roleId,
            languageId: req.query.languageId,
        });

        res.locals.UTILS.faculty = {
            publicationCategoryUtils,
        };

        await new Promise((resolve, reject) => {
            res.render('user/faculty/publication.pug', {
                data,
            }, (err, html) => {
                if (err)
                    reject(err);
                else {
                    res.send(html);
                    resolve();
                }
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
});

/**
 * Resolve URL `/user/faculty/technology-transfer`.
 */

router
.route('/faculty/technology-transfer')
.get(noCache, async (req, res, next) => {
    try {
        const data = await getFacultyDetailWithId({
            profileId: req.session.user.roleId,
            languageId: req.query.languageId,
        });

        await new Promise((resolve, reject) => {
            res.render('user/faculty/technology-transfer.pug', {
                data,
            }, (err, html) => {
                if (err)
                    reject(err);
                else {
                    res.send(html);
                    resolve();
                }
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
});

/**
 * Resolve URL `/user/staff/profile`
 */

router
.route('/staff/profile')
.get(noCache, async (req, res, next) => {
    try {
        const data = await getStaffDetailWithId({
            profileId: req.session.user.roleId,
            languageId: req.query.languageId,
        });

        await new Promise((resolve, reject) => {
            res.render('user/staff/profile.pug', {
                data,
            }, (err, html) => {
                if (err)
                    reject(err);
                else {
                    res.send(html);
                    resolve();
                }
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
})
.post(urlEncoded, jsonParser, async (req, res, next) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption('staff') ||
            req.session.user.roleId !== req.body.data.profileId
        ) {
            const error = new Error('Try to modify profile that doesn\'t belong to this user.');
            error.status = 401;
            throw error;
        }

        res.send(await addStaffDetail(req.body));
    }
    catch (error) {
        next(error);
    }
})
.patch(urlEncoded, jsonParser, async (req, res, next) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption('staff') ||
            req.session.user.roleId !== req.body.profileId
        ) {
            const error = new Error('Try to modify profile that doesn\'t belong to this user.');
            error.status = 401;
            throw error;
        }
        res.send(await updateStaffDetail(req.body));
    }
    catch (error) {
        next(error);
    }
})
.put(upload.single('file'), async (req, res, next) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption('staff') ||
            req.session.user.roleId !== Number(req.body.profileId)
        ) {
            const error = new Error('Try to modify profile that doesn\'t belong to this user.');
            error.status = 401;
            throw error;
        }

        res.send(await updateStaffDetail({
            dbTable: 'profile',
            profileId: Number(req.body.profileId),
            dbTableItemId: Number(req.body.profileId),
            item: {
                photo: req.file.buffer,
            },
            i18n: [],
        }));
    }
    catch (error) {
        next(error);
    }
})
.delete(urlEncoded, jsonParser, async (req, res, next) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption('staff') ||
            req.session.user.roleId !== req.body.profileId
        ) {
            const error = new Error('Try to modify profile that doesn\'t belong to this user.');
            error.status = 401;
            throw error;
        }

        res.send(await deleteStaffDetail(req.body));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/user/announcement`.
 * For user to manage announcements.
 */

router
.route('/announcement')
.get(staticHtml('user/announcement/index'))
.post(upload.array('files'), async (req, res, next) => {
    try {
        req.body.announcementI18n.forEach((i18nData) => {
            i18nData.languageId = Number(i18nData.languageId);
        });
        req.body.tags.forEach((tag) => {
            tag.tagId = Number(tag.tagId);
        });
        res.send(await postAnnouncement({
            author: Number(req.body.author),
            image: req.body.image === 'null' ? null : req.body.image,
            announcementI18n: req.body.announcementI18n,
            tags: req.body.tags,
            files: req.files.map(file => ({
                name: file.originalname,
                content: file.buffer,
            })),
        }));
    }
    catch (error) {
        next(error);
    }
})
.put(upload.array('addedFiles'), async (req, res, next) => {
    try {
        res.send(await updateAnnouncement({
            announcementId: Number(req.body.announcementId),
            image: req.body.image === 'null' ? null : req.body.image,
            announcementI18n: req.body.announcementI18n,
            addedFiles: req.files.map(file => ({
                name: file.originalname,
                content: file.buffer,
            })),
            deletedFiles: req.body.deletedFiles,
            tags: req.body.tags,
        }));
    }
    catch (error) {
        next(error);
    }
})
.patch(urlEncoded, jsonParser, async (req, res, next) => {
    try {
        res.send(await pinAnnouncement({
            announcementId: Number(req.body.announcementId),
            isPinned: req.body.isPinned,
        }));
    }
    catch (error) {
        next(error);
    }
})
.delete(urlEncoded, jsonParser, async (req, res, next) => {
    try {
        res.send(await deleteAnnouncements({
            announcementIds: req.body.announcementIds.map(id => Number(id)),
        }));
    }
    catch (error) {
        next(error);
    }
});

/**
 * Resolve URL `/user/announcement/add`.
 */

router
.route('/announcement/add')
.get(staticHtml('user/announcement/add'));

/**
 * Resolve URL `/user/announcement/edit/[id]`.
 */

router
.route('/announcement/edit/:announcementId')
.get(async (req, res, next) => {
    try {
        const data = await getAnnouncement({
            announcementId: Number(req.params.announcementId),
            languageId: req.query.languageId,
        });

        res.locals.UTILS.announcement = {
            tagUtils,
        };

        await new Promise((resolve, reject) => {
            res.render('user/announcement/edit.pug', {
                data,
            }, (err, html) => {
                if (err) {
                    reject(err);
                    return;
                }
                res.send(html);
                resolve();
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
});

/**
 * Resolve URL `/user/resetPassword`.
 */

router
.route('/resetPassword')
.get(noCache, async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            res.render('user/resetPassword.pug', {
                error: '',
            }, (err, html) => {
                if (err)
                    reject(err);
                else {
                    res.send(html);
                    resolve();
                }
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
})
.post(urlEncoded, jsonParser, async (req, res, next) => {
    try {
        const user = await getAdminByAccount(req.session.user.account);
        if (!await bcrypt.compare(req.body.oldPassword, user.password)) {
            const error = new Error('Wrong password.');
            error.status = 401;
            throw error;
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            const error = new Error('Confirm password failed.');
            error.status = 400;
            throw error;
        }

        await updateAdmin({
            userId: req.session.user.userId,
            password: bcrypt.hashSync(req.body.newPassword, 10),
        });

        res.send('密碼修改成功，請重新登入！<br>本頁面即將跳轉...<script>setTimeout(()=>{ window.location = window.location.origin + \'/auth/logout\'; }, 3000)</script>');
    }
    catch (error) {
        if (error.status === 500)
            next(error);
        else {
            const errorMessage = {
                401: '舊密碼不正確，請重新輸入',
                400: '新密碼以及確認密碼不一致',
            };
            await new Promise((resolve, reject) => {
                res.render('user/resetPassword.pug', {
                    error: errorMessage[error.status],
                }, (err, html) => {
                    if (err)
                        reject(err);
                    else {
                        res.send(html);
                        resolve();
                    }
                });
            })
            .catch(next);
        }
    }
});

/**
 * Resolve URL `/user/announcement/news`.
 */

router
.route('/announcement/news')
.get(async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            res.render('user/announcement/news.pug', {
                briefing: {
                    title: '',
                    updateTime: '',
                    url: '',
                    image: '',
                },
                method: 'post',
            }, (err, html) => {
                if (err) {
                    reject(err);
                    return;
                }
                res.send(html);
                resolve();
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
});

/**
 * Resolve URL `/user/announcement/news-list`.
 */

router
.route('/announcement/news-list')
.get(staticHtml('user/announcement/news-list'));

/**
 * Resolve URL `/user/announcement/edit/[id]`.
 */

router
.route('/announcement/news/:newsId')
.get(async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            res.render('user/announcement/news.pug', {
                briefing: {
                    title: 'news title',
                    updateTime: '2020-02-11',
                    url: 'https://www.google.com.tw',
                    image: '',
                },
                method: 'update',
            }, (err, html) => {
                if (err) {
                    reject(err);
                    return;
                }
                res.send(html);
                resolve();
            });
        });
    }
    catch (error) {
        if (error.status === 404)
            next();
        else
            next(error);
    }
});

module.exports = router;
