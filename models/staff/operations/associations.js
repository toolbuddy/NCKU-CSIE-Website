import Business from 'models/staff/schemas/business.js';
import BusinessI18n from 'models/staff/schemas/business-i18n.js';
import ProfileI18n from 'models/staff/schemas/profile-i18n.js';
import Profile from 'models/staff/schemas/profile.js';
import Title from 'models/staff/schemas/title.js';
import TitleI18n from 'models/staff/schemas/title-i18n.js';

Profile.hasMany( ProfileI18n, {
    as:         'profileI18n',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Business.hasMany( BusinessI18n, {
    as:         'businessI18n',
    foreignKey: 'businessId',
    sourceKey:  'businessId',
} );

Profile.hasMany( Business, {
    as:         'business',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

Title.hasMany( TitleI18n, {
    as:         'titleI18n',
    foreignKey: 'titleId',
    sourceKey:  'titleId',
} );

Profile.hasMany( Title, {
    as:         'title',
    foreignKey: 'profileId',
    sourceKey:  'profileId',
} );

export {
    Business,
    BusinessI18n,
    ProfileI18n,
    Profile,
    Title,
    TitleI18n,
};

export default {
    Business,
    BusinessI18n,
    ProfileI18n,
    Profile,
    Title,
    TitleI18n,
};
