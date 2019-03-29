import BusinessI18n from 'models/staff/schemas/business-i18n.js';
import ProfileI18n from 'models/staff/schemas/profile-i18n.js';
import Profile from 'models/staff/schemas/profile.js';
import TitleI18n from 'models/staff/schemas/title-i18n.js';

Profile.hasMany( BusinessI18n, {
    as:         'businessI18n',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Profile.hasMany( ProfileI18n, {
    as:         'profileI18n',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Profile.hasMany( TitleI18n, {
    as:         'titleI18n',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

export {
    BusinessI18n,
    ProfileI18n,
    Profile,
    TitleI18n,
};

export default {
    BusinessI18n,
    ProfileI18n,
    Profile,
    TitleI18n,
};
