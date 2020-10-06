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

import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';

import { urlEncoded, jsonParser, } from 'routes/utils/body-parser.js';
import allowUserOnly from 'routes/utils/allow-user-only.js';
import noCache from 'routes/utils/no-cache.js';
import staticHtml from 'routes/utils/static-html.js';

import getFacultyMiniProfile from 'models/faculty/operations/get-faculty-mini-profile.js';
import getFacultyDetailWithId from 'models/faculty/operations/get-faculty-detail-with-id.js';
import addFacultyDetail from 'models/faculty/operations/add-faculty-detail.js';
import updateFacultyDetail from 'models/faculty/operations/update-faculty-detail.js';
import deleteFacultyDetail from 'models/faculty/operations/delete-faculty-detail.js';
import getStaffMiniProfile from 'models/staff/operations/get-staff-mini-profile.js';
import getStaffDetailWithId from 'models/staff/operations/get-staff-detail-with-id.js';
import addStaffDetail from 'models/staff/operations/add-staff-detail.js';
import updateStaffDetail from 'models/staff/operations/update-staff-detail.js';
import deleteStaffDetail from 'models/staff/operations/delete-staff-detail.js';
import getAnnouncement from 'models/announcement/operations/get-announcement.js';
import postAnnouncement from 'models/announcement/operations/post-announcement.js';
import updateAnnouncement from 'models/announcement/operations/update-announcement.js';
import pinAnnouncement from 'models/announcement/operations/pin-announcement.js';
import deleteAnnouncements from 'models/announcement/operations/delete-announcements.js';
import getAdminByAccount from 'models/auth/operations/get-admin-by-account.js';
import updateAdmin from 'models/auth/operations/update-admin.js';

import roleUtils from 'models/auth/utils/role.js';
import degreeUtils from 'models/faculty/utils/degree.js';
import nationUtils from 'models/faculty/utils/nation.js';
import projectCategoryUtils from 'models/faculty/utils/project-category.js';
import publicationCategoryUtils from 'models/faculty/utils/publication-category.js';
import departmentUtils from 'models/faculty/utils/department.js';
import researchGroupUtils from 'models/faculty/utils/research-group.js';
import tagUtils from 'models/announcement/utils/tag.js';

const router = express.Router( {
    caseSensitive: true,
    mergeParams:   false,
    strict:        false,
} );

const upload = multer( {
    storage: multer.memoryStorage(),
} );

router.use( allowUserOnly );

/**
 * Resolve URL `/user`.
 */

router
.route( '/' )
.get( staticHtml( 'user/index' ) );

/**
 * Resolve URL `/user/id`.
 * For frontend to get user's session data.
 */

router
.route( '/id' )
.get( ( req, res ) => {
    res.json( {
        role:   req.session.user.role,
        roleId: req.session.user.roleId,
    } );
} );

/**
 * Resolve URL `/user/miniProfile`.
 * For frontend to render toolbar.
 */

router
.route( '/miniProfile' )
.get( async ( req, res, next ) => {
    try {
        if ( req.session.user.role === roleUtils.getIdByOption( 'faculty' ) ) {
            res.json( await getFacultyMiniProfile( {
                profileId: req.session.user.roleId,
                language:  Number( req.query.languageId ),
            } ) );
        }
        else if ( req.session.user.role === roleUtils.getIdByOption( 'staff' ) ) {
            res.json( await getStaffMiniProfile( {
                profileId: req.session.user.roleId,
                language:  Number( req.query.languageId ),
            } ) );
        }
        else {
            const error = new Error( 'Invalid role' );
            error.status = 400;
            throw error;
        }
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/user/profile`.
 * Redirect to correct profile page according to role.
 */

router
.route( '/profile' )
.get( noCache, ( req, res ) => {
    if ( req.session.user.role === roleUtils.getIdByOption( 'faculty' ) )
        res.redirect( '/user/faculty/profile' );
    else if ( req.session.user.role === roleUtils.getIdByOption( 'staff' ) )
        res.redirect( '/user/staff/profile' );
    else
        res.redirect( '/index' );
} );

/**
 * Resolve URL `/faculty/facultyWithId`.
 * Return teacher's profile detail records with its id.
 */

router
.route( '/profileWithId' )
.get( async ( req, res, next ) => {
    try {
        if ( req.session.user.role === roleUtils.getIdByOption( 'faculty' ) ) {
            res.json( await getFacultyDetailWithId( {
                profileId: req.session.user.roleId,
                language:  req.query.languageId,
            } ) );
        }
        else if ( req.session.user.role === roleUtils.getIdByOption( 'staff' ) ) {
            res.json( await getStaffDetailWithId( {
                profileId: req.session.user.roleId,
                language:  req.query.languageId,
            } ) );
        }
        else {
            const error = new Error( 'Invalid role.' );
            error.status = 403;
            throw error;
        }
    }
    catch ( error ) {
        next( error );
    }
} );

router
.route( '/staff/staffWithId/:id' )
.get( async ( req, res, next ) => {
    try {
        res.json( await getStaffDetailWithId( {
            profileId: req.session.user.roleId,
            language:  req.query.languageId,
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/user/faculty/profile`
 * For teacher to manage his / her profile detail.
 */

router
.route( '/faculty/profile' )
.get( noCache, async ( req, res, next ) => {
    try {
        const data = await getFacultyDetailWithId( {
            profileId: req.session.user.roleId,
            language:  req.query.languageId,
        } );

        res.locals.UTILS.faculty = {
            departmentUtils,
            researchGroupUtils,
            degreeUtils,
            nationUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/profile.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
            } );
        } );
    }
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} )
.post( urlEncoded, jsonParser, async ( req, res, next ) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption( 'faculty' ) ||
            req.session.user.roleId !== req.body.data.profileId
        ) {
            const error = new Error( "Try to modify profile that doesn't belong to this user." );
            error.status = 401;
            throw error;
        }

        res.send( await addFacultyDetail( req.body ) );
    }
    catch ( error ) {
        next( error );
    }
} )
.patch( urlEncoded, jsonParser, async ( req, res, next ) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption( 'faculty' ) ||
            req.session.user.roleId !== req.body.profileId
        ) {
            const error = new Error( "Try to modify profile that doesn't belong to this user." );
            error.status = 401;
            throw error;
        }
        res.send( await updateFacultyDetail( req.body ) );
    }
    catch ( error ) {
        next( error );
    }
} )
.put( upload.single( 'file' ), async ( req, res, next ) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption( 'faculty' ) ||
            req.session.user.roleId !== Number( req.body.profileId )
        ) {
            const error = new Error( "Try to modify profile that doesn't belong to this user." );
            error.status = 401;
            throw error;
        }

        res.send( await updateFacultyDetail( {
            dbTable:       'profile',
            profileId:     Number( req.body.profileId ),
            dbTableItemId: Number( req.body.profileId ),
            item:          {
                photo: req.file.buffer,
            },
            i18n: [],
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} )
.delete( urlEncoded, jsonParser, async ( req, res, next ) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption( 'faculty' ) ||
            req.session.user.roleId !== req.body.profileId
        ) {
            const error = new Error( "Try to modify profile that doesn't belong to this user." );
            error.status = 401;
            throw error;
        }

        res.send( await deleteFacultyDetail( req.body ) );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/user/faculty/award`.
 */

router
.route( '/faculty/award' )
.get( noCache, async ( req, res, next ) => {
    try {
        const data = await getFacultyDetailWithId( {
            profileId: req.session.user.roleId,
            language:  req.query.languageId,
        } );

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/award.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
            } );
        } );
    }
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} );

/**
 * Resolve URL `/user/faculty/project`.
 */

router
.route( '/faculty/project' )
.get( noCache, async ( req, res, next ) => {
    try {
        const data = await getFacultyDetailWithId( {
            profileId: req.session.user.roleId,
            language:  req.query.languageId,
        } );

        res.locals.UTILS.faculty = {
            projectCategoryUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/project.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
            } );
        } );
    }
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} );

/**
 * Resolve URL `/user/faculty/patent`.
 */

router
.route( '/faculty/patent' )
.get( noCache, async ( req, res, next ) => {
    try {
        const data = await getFacultyDetailWithId( {
            profileId: req.session.user.roleId,
            language:  req.query.languageId,
        } );

        res.locals.UTILS.faculty = {
            nationUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/patent.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
            } );
        } );
    }
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} );

/**
 * Resolve URL `/user/faculty/conference`.
 */

router
.route( '/faculty/conference' )
.get( noCache, async ( req, res, next ) => {
    try {
        const data = await getFacultyDetailWithId( {
            profileId: req.session.user.roleId,
            language:  req.query.languageId,
        } );

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/conference.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
            } );
        } );
    }
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} );

/**
 * Resolve URL `/user/faculty/student-award`.
 */

router
.route( '/faculty/student-award' )
.get( noCache, async ( req, res, next ) => {
    try {
        const data = await getFacultyDetailWithId( {
            profileId: req.session.user.roleId,
            language:  req.query.languageId,
        } );

        res.locals.UTILS.faculty = {
            degreeUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/student-award.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
            } );
        } );
    }
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} );

/**
 * Resolve URL `/user/faculty/publication`.
 */

router
.route( '/faculty/publication' )
.get( noCache, async ( req, res, next ) => {
    try {
        const data = await getFacultyDetailWithId( {
            profileId: req.session.user.roleId,
            language:  req.query.languageId,
        } );

        res.locals.UTILS.faculty = {
            publicationCategoryUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/publication.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
            } );
        } );
    }
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} );

/**
 * Resolve URL `/user/faculty/technology-transfer`.
 */

router
.route( '/faculty/technology-transfer' )
.get( noCache, async ( req, res, next ) => {
    try {
        const data = await getFacultyDetailWithId( {
            profileId: req.session.user.roleId,
            language:  req.query.languageId,
        } );

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/faculty/technology-transfer.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
            } );
        } );
    }
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} );

/**
 * Resolve URL `/user/staff/profile`
 */

router
.route( '/staff/profile' )
.get( noCache, async ( req, res, next ) => {
    try {
        const data = await getStaffDetailWithId( {
            profileId: req.session.user.roleId,
            language:  req.query.languageId,
        } );

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/staff/profile.pug', {
                data,
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
            } );
        } );
    }
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} )
.post( urlEncoded, jsonParser, async ( req, res, next ) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption( 'staff' ) ||
            req.session.user.roleId !== req.body.data.profileId
        ) {
            const error = new Error( "Try to modify profile that doesn't belong to this user." );
            error.status = 401;
            throw error;
        }

        res.send( await addStaffDetail( req.body ) );
    }
    catch ( error ) {
        next( error );
    }
} )
.patch( urlEncoded, jsonParser, async ( req, res, next ) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption( 'staff' ) ||
            req.session.user.roleId !== req.body.profileId
        ) {
            const error = new Error( "Try to modify profile that doesn't belong to this user." );
            error.status = 401;
            throw error;
        }
        res.send( await updateStaffDetail( req.body ) );
    }
    catch ( error ) {
        next( error );
    }
} )
.put( upload.single( 'file' ), async ( req, res, next ) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption( 'staff' ) ||
            req.session.user.roleId !== Number( req.body.profileId )
        ) {
            const error = new Error( "Try to modify profile that doesn't belong to this user." );
            error.status = 401;
            throw error;
        }

        res.send( await updateStaffDetail( {
            dbTable:       'profile',
            profileId:     Number( req.body.profileId ),
            dbTableItemId: Number( req.body.profileId ),
            item:          {
                photo: req.file.buffer,
            },
            i18n: [],
        } ) );
    }
    catch ( error ) {
        next( error );
    }
} )
.delete( urlEncoded, jsonParser, async ( req, res, next ) => {
    try {
        if (
            req.session.user.role !== roleUtils.getIdByOption( 'staff' ) ||
            req.session.user.roleId !== req.body.profileId
        ) {
            const error = new Error( "Try to modify profile that doesn't belong to this user." );
            error.status = 401;
            throw error;
        }

        res.send( await deleteStaffDetail( req.body ) );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/user/announcement`.
 * For user to manage announcements.
 */

router
.route( '/announcement' )
.get( staticHtml( 'user/announcement/index' ) )
.post( upload.array( 'files' ), async ( req, res, next ) => {
    try {
        req.body.files = req.files.map( file => ( {
            name:    file.originalname,
            content: file.buffer,
        } ) );
        res.send( await postAnnouncement( req.body ) );
    }
    catch ( error ) {
        next( error );
    }
} )
.put( upload.array( 'addedFiles' ), async ( req, res, next ) => {
    try {
        req.body.addedFiles = req.files.map( file => ( {
            name:    file.originalname,
            content: file.buffer,
        } ) );
        res.send( await updateAnnouncement( req.body ) );
    }
    catch ( error ) {
        next( error );
    }
} )
.patch( urlEncoded, jsonParser, async ( req, res, next ) => {
    try {
        res.send( await pinAnnouncement( req.body ) );
    }
    catch ( error ) {
        next( error );
    }
} )
.delete( urlEncoded, jsonParser, async ( req, res, next ) => {
    try {
        res.send( await deleteAnnouncements( req.body ) );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/user/announcement/add`.
 */

router
.route( '/announcement/add' )
.get( staticHtml( 'user/announcement/add' ) );

/**
 * Resolve URL `/user/announcement/edit/[id]`.
 */

router
.route( '/announcement/edit/:announcementId' )
.get( async ( req, res, next ) => {
    try {
        const data = await getAnnouncement( {
            announcementId: Number( req.params.announcementId ),
            language:       req.query.languageId,
        } );

        res.locals.UTILS.announcement = {
            tagUtils,
        };

        await new Promise( ( resolve, reject ) => {
            res.render( 'user/announcement/edit.pug', {
                data,
            }, ( err, html ) => {
                if ( err ) {
                    reject( err );
                    return;
                }
                res.send( html );
                resolve();
            } );
        } );
    }
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} );

/**
 * Resolve URL `/user/resetPassword`.
 */

router
.route( '/resetPassword' )
.get( noCache, async ( req, res, next ) => {
    try {
        await new Promise( ( resolve, reject ) => {
            res.render( 'user/resetPassword.pug', {
                error: '',
            }, ( err, html ) => {
                if ( err )
                    reject( err );
                else {
                    res.send( html );
                    resolve();
                }
            } );
        } );
    }
    catch ( error ) {
        if ( error.status === 404 )
            next();
        else
            next( error );
    }
} )
.post( urlEncoded, jsonParser, async ( req, res, next ) => {
    try {
        const user = await getAdminByAccount( req.session.user.account );
        if ( !await bcrypt.compare( req.body.oldPassword, user.password ) ) {
            const error = new Error( 'Wrong password.' );
            error.status = 401;
            throw error;
        }

        if ( req.body.newPassword !== req.body.confirmPassword ) {
            const error = new Error( 'Confirm password failed.' );
            error.status = 400;
            throw error;
        }

        res.send( await updateAdmin( {
            userId:   req.session.user.userId,
            password: bcrypt.hashSync( req.body.newPassword, 10 ),
        } ) );
    }
    catch ( error ) {
        if ( error.status === 500 )
            next( error );
        else {
            const errorMessage = {
                401: '舊密碼不正確，請重新輸入',
                400: '新密碼確認失敗，請確認第二次密碼與第一次輸入的內容相同',
            };
            await new Promise( ( resolve, reject ) => {
                res.render( 'auth/login.pug', {
                    error: errorMessage[ error.status ],
                }, ( err, html ) => {
                    if ( err )
                        reject( err );
                    else {
                        res.send( html );
                        resolve();
                    }
                } );
            } )
            .catch( next );
        }
    }
} );

export default router;
