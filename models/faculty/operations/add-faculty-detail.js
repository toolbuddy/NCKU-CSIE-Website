import ValidateUtils from 'models/common/utils/validate.js';
import {
    Department,
    EducationI18n,
    Education,
    ExperienceI18n,
    Experience,
    ProfileI18n,
    Profile,
    ResearchGroup,
    SpecialtyI18n,
    Title,
    TitleI18n,
} from 'models/faculty/operations/associations.js';

// Import DepartmentValidationConstraints from 'models/faculty/constraints/add/department.js';
// import EducationValidationConstraints from 'models/faculty/constraints/add/education.js';
// import ExperienceValidationConstraints from 'models/faculty/constraints/add/experience.js';
// import ProfileValidationConstraints from 'models/faculty/constraints/add/profile.js';
// import ResearchGroupValidationConstraints from 'models/faculty/constraints/add/research-group.js';
// import SpecialtyI18nValidationConstraints from 'models/faculty/constraints/add/specialty-i18n.js';
// import TitleValidationConstraints from 'models/faculty/constraints/add/title.js';
import validate from 'validate.js';


export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            profileId = null,
            department = null,
            education = null,
            experience = null,
            profile = null,
            researchGroup = null,
            specialtyI18n = null,
            title = null,
        } = opt;

        if ( !ValidateUtils.isValidId( profileId ) ) {
            const error = new Error( 'Invalid profile id' );
            error.status = 400;
            throw error;
        }

        /*
        If ( education !== null ) {
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
        if ( profile !== null ) {
            if ( typeof ( validate( profile, ProfileValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid profile object' );
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
        */

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
