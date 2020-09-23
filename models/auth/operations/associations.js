import Session from 'models/auth/schemas/session.js';
import Admin from 'models/auth/schemas/admin.js';

Admin.hasOne( Session, {
    as:         'session',
    foreignKey: 'sid',
    sourceKey:  'sid',
} );

export {
    Session,
    Admin,
};

export default {
    Session,
    Admin,
};
