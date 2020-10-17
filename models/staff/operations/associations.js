const Business = require('../schemas/business.js');
const BusinessI18n = require('../schemas/business-i18n.js');
const ProfileI18n = require('../schemas/profile-i18n.js');
const Profile = require('../schemas/profile.js');
const Title = require('../schemas/title.js');
const TitleI18n = require('../schemas/title-i18n.js');

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

module.exports = {
    Business,
    BusinessI18n,
    ProfileI18n,
    Profile,
    Title,
    TitleI18n,
};
