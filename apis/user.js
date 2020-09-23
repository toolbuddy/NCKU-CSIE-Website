/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - `/api/staff`
 */

import express from 'express';
import cors from 'cors';

import getStaffMiniProfile from 'models/staff/operations/get-staff-mini-profile.js';
import getFacultyMiniProfile from 'models/faculty/operations/get-faculty-mini-profile.js';
import getAdminByUserId from 'models/auth/operations/get-admin-by-userId.js';
import roleUtils from 'models/auth/utils/role.js';

const apis = express.Router();

/**
 * Resolve URL `/api/user/miniProfile/[id]`.
 */

apis.get( '/miniProfile/:userId', cors(), async ( req, res ) => {
    try {
        const userData = await getAdminByUserId( {
            userId: Number( req.params.userId ),
        } );

        if ( userData.role === roleUtils.getIdByOption( 'faculty' ) ) {
            const data = await getFacultyMiniProfile( {
                language:  Number( req.query.languageId ),
                profileId:  userData.roleId,
            } );
            res.json( data );
        }
        else if ( userData.role === roleUtils.getIdByOption( 'staff' ) ) {
            const data = await getStaffMiniProfile( {
                language:  Number( req.query.languageId ),
                profileId:  userData.roleId,
            } );
            res.json( data );
        }
        else {
            const error = new Error( 'Invalid role' );
            error.status = 400;
            throw error;
        }
    }
    catch ( error ) {
        console.error( error );
    }
} );

export default apis;
