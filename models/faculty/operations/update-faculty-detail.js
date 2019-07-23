import ValidateUtils from 'models/common/utils/validate.js';
import {
    EducationI18n,
    Education,
    ExperienceI18n,
    Experience,
    ProfileI18n,
    Profile,
    SpecialtyI18n,
    Title,
    TitleI18n,
} from 'models/faculty/operations/associations.js';
import EducationValidationConstraints from 'models/faculty/constraints/update/education.js';
import EducationI18nValidationConstraints from 'models/faculty/constraints/update/education-i18n.js';
import ExperienceValidationConstraints from 'models/faculty/constraints/update/experience.js';
import ExperienceI18nValidationConstraints from 'models/faculty/constraints/update/experience-i18n.js';
import ProfileValidationConstraints from 'models/faculty/constraints/update/profile.js';
import ProfileI18nValidationConstraints from 'models/faculty/constraints/update/profile-i18n.js';
import SpecialtyI18nValidationConstraints from 'models/faculty/constraints/update/specialty-i18n.js';
import TitleValidationConstraints from 'models/faculty/constraints/update/title.js';
import TitleI18nValidationConstraints from 'models/faculty/constraints/update/title-i18n.js';
import validate from 'validate.js';


export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            profileId = null,
            education = null,
            educationI18n = null,
            experience = null,
            experienceI18n = null,
            profile = null,
            profileI18n = null,
            specialtyI18n = null,
            title = null,
            titleI18n = null,
        } = opt;

        if ( !ValidateUtils.isValidId( profileId ) ) {
            const error = new Error( 'Invalid profile id' );
            error.status = 400;
            throw error;
        }

        if ( education !== null ) {
            if ( ValidateUtils.isValidArray( education ) ) {
                for ( const data of education ) {
                    if ( typeof ( validate( data, EducationValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid education object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid education object' );
                error.status = 400;
                throw error;
            }
        }
        if ( educationI18n !== null ) {
            if ( ValidateUtils.isValidArray( educationI18n ) ) {
                for ( const data of educationI18n ) {
                    if ( typeof ( validate( data, EducationI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid educationI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid educationI18n object' );
                error.status = 400;
                throw error;
            }
        }
        if ( experience !== null ) {
            if ( ValidateUtils.isValidArray( experience ) ) {
                for ( const data of experience ) {
                    if ( typeof ( validate( data, ExperienceValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid experience object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid experience object' );
                error.status = 400;
                throw error;
            }
        }
        if ( experienceI18n !== null ) {
            if ( ValidateUtils.isValidArray( experienceI18n ) ) {
                for ( const data of experienceI18n ) {
                    if ( typeof ( validate( data, ExperienceI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid experienceI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid experienceI18n object' );
                error.status = 400;
                throw error;
            }
        }
        if ( profile !== null ) {
            if ( typeof ( validate( profile, ProfileValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid profile object' );
                error.status = 400;
                throw error;
            }
        }
        if ( profileI18n !== null ) {
            if ( ValidateUtils.isValidArray( profileI18n ) ) {
                for ( const data of profileI18n ) {
                    if ( typeof ( validate( data, ProfileI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid profileI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid profileI18n object' );
                error.status = 400;
                throw error;
            }
        }
        if ( specialtyI18n !== null ) {
            if ( ValidateUtils.isValidArray( specialtyI18n ) ) {
                for ( const data of specialtyI18n ) {
                    if ( typeof ( validate( data, SpecialtyI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid specialtyI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid specialtyI18n object' );
                error.status = 400;
                throw error;
            }
        }
        if ( title !== null ) {
            if ( ValidateUtils.isValidArray( title ) ) {
                for ( const data of title ) {
                    if ( typeof ( validate( data, TitleValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid title object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid title object' );
                error.status = 400;
                throw error;
            }
        }
        if ( titleI18n !== null ) {
            if ( ValidateUtils.isValidArray( titleI18n ) ) {
                for ( const data of titleI18n ) {
                    if ( typeof ( validate( data, TitleI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid titleI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid titleI18n object' );
                error.status = 400;
                throw error;
            }
        }


        if ( education ) {
            for ( const educationInfo of education ) {
                await Education.update( {
                    nation: educationInfo.nation,
                    degree: educationInfo.degree,
                    from:   educationInfo.from,
                    to:     educationInfo.to,
                }, {
                    where: {
                        educationId: educationInfo.educationId,
                        profileId,
                    },
                } );
            }
        }
        if ( educationI18n ) {
            for ( const educationI18nInfo of educationI18n ) {
                await EducationI18n.update( {
                    school: educationI18nInfo.school,
                    major:  educationI18nInfo.major,
                }, {
                    where: {
                        educationId: educationI18nInfo.educationId,
                        language:    educationI18nInfo.language,
                    },
                } );
            }
        }
        if ( experience ) {
            for ( const experienceInfo of experience ) {
                await Experience.update( {
                    from: experienceInfo.from,
                    to:   experienceInfo.to,
                }, {
                    where: {
                        experienceId: experienceInfo.experienceId,
                        profileId,
                    },
                } );
            }
        }
        if ( experienceI18n ) {
            for ( const experienceI18nInfo of experienceI18n ) {
                await ExperienceI18n.update( {
                    organization: experienceI18nInfo.organization,
                    department:   experienceI18nInfo.department,
                    title:        experienceI18nInfo.title,
                }, {
                    where: {
                        experienceId: experienceI18nInfo.experienceId,
                        language:     experienceI18nInfo.language,
                    },
                } );
            }
        }
        if ( profile ) {
            await Profile.update( {
                fax:         profile.fax,
                email:       profile.email,
                personalWeb: profile.personalWeb,
                nation:      profile.nation,
                photo:       profile.photo, // ???
                officeTel:   profile.officeTel,
                labTel:      profile.labTel,
                labWeb:      profile.labWeb,
                order:       profile.order,
            }, {
                where: {
                    profileId,
                },
            } );
        }
        if ( profileI18n ) {
            for ( const profileI18nInfo of profileI18n ) {
                await ProfileI18n.update( {
                    name:          profileI18nInfo.name,
                    officeAddress: profileI18nInfo.officeAddress,
                    labName:       profileI18nInfo.labName,
                    labAddress:    profileI18nInfo.labAddress,
                }, {
                    where: {
                        language: profileI18nInfo.language,
                        profileId,
                    },
                } );
            }
        }
        if ( specialtyI18n ) {
            for ( const specialtyInfo of specialtyI18n ) {
                await SpecialtyI18n.update( {
                    specialty: specialtyInfo.specialty,
                }, {
                    where: {
                        specialtyId:   specialtyInfo.specialtyId,
                        profileId,
                        language:    specialtyInfo.language,
                    },
                } );
            }
        }
        if ( title ) {
            for ( const titleInfo of title ) {
                await Title.update( {
                    from: titleInfo.from,
                    to:   titleInfo.to,
                }, {
                    where: {
                        titleId:   titleInfo.titleId,
                        profileId,
                    },
                } );
            }
        }
        if ( titleI18n ) {
            for ( const titleI18nInfo of titleI18n ) {
                await TitleI18n.update( {
                    title: titleI18nInfo.title,
                }, {
                    where: {
                        titleId:  titleI18nInfo.titleId,
                        language: titleI18nInfo.language,
                    },
                } );
            }
        }
        return;
    }
    catch ( err ) {
        if ( err.status )
            throw err;
        const error = new Error();
        error.status = 500;
        throw error;
    }
};
