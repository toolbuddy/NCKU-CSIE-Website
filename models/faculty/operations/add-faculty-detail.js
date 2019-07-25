import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';
import {
    Department,
    EducationI18n,
    Education,
    ExperienceI18n,
    Experience,
    Profile,
    ResearchGroup,
    SpecialtyI18n,
    Title,
    TitleI18n,
} from 'models/faculty/operations/associations.js';

import departmentUtils from 'models/faculty/utils/department.js';
import researchGroupUtils from 'models/faculty/utils/research-group.js';
import EducationValidationConstraints from 'models/faculty/constraints/add/education.js';
import EducationI18nValidationConstraints from 'models/faculty/constraints/add/education-i18n.js';
import ExperienceValidationConstraints from 'models/faculty/constraints/add/experience.js';
import ExperienceI18nValidationConstraints from 'models/faculty/constraints/add/experience-i18n.js';
import SpecialtyI18nValidationConstraints from 'models/faculty/constraints/add/specialty-i18n.js';
import TitleValidationConstraints from 'models/faculty/constraints/add/title.js';
import TitleI18nValidationConstraints from 'models/faculty/constraints/add/title-i18n.js';
import validate from 'validate.js';

function sortByValue ( a, b ) {
    return a - b;
}

function equalArray ( a, b ) {
    if ( a === b )
        return true;
    if ( a == null || b == null )
        return false;
    if ( a.length !== b.length )
        return false;
    for ( let i = 0; i < a.length; ++i ) {
        if ( a[ i ] !== b[ i ] )
            return false;
    }

    return true;
}

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            profileId = null,
            department = null,
            education = null,
            experience = null,
            researchGroup = null,
            specialtyI18n = null,
            title = null,
        } = opt;

        if ( !ValidateUtils.isValidId( profileId ) ) {
            const error = new Error( 'Invalid profile id' );
            error.status = 400;
            throw error;
        }
        if ( department !== null ) {
            if ( !ValidateUtils.isValidArray( department ) || !department.every( id => departmentUtils.isSupportedId( id ) ) ) {
                const error = new Error( 'Invalid department object' );
                error.status = 400;
                throw error;
            }
        }
        if ( researchGroup !== null ) {
            if ( !ValidateUtils.isValidArray( researchGroup ) || !researchGroup.every( id => researchGroupUtils.isSupportedId( id ) ) ) {
                const error = new Error( 'Invalid researchGroup object' );
                error.status = 400;
                throw error;
            }
        }
        if ( education !== null ) {
            if ( ValidateUtils.isValidArray( education ) ) {
                for ( const data of education ) {
                    if ( typeof ( validate( data, EducationValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid education object' );
                        error.status = 400;
                        throw error;
                    }
                    const langArr = [];
                    for ( const i18nData of data.i18n ) {
                        if ( typeof ( validate( i18nData, EducationI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid educationI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                        const error = new Error( 'Invalid educationI18n object' );
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
                    const langArr = [];
                    for ( const i18nData of data.i18n ) {
                        if ( typeof ( validate( i18nData, ExperienceI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid experienceI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                        const error = new Error( 'Invalid experienceI18n object' );
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
        if ( specialtyI18n !== null ) {
            if ( ValidateUtils.isValidArray( specialtyI18n ) ) {
                for ( const data of specialtyI18n ) {
                    if ( !ValidateUtils.isValidArray( data ) || data.length !== LanguageUtils.supportedLanguage.length ) {
                        const error = new Error( 'Invalid specialtyI18n object' );
                        error.status = 400;
                        throw error;
                    }
                    const langArr = [];
                    for ( const i18nData of data ) {
                        if ( typeof ( validate( i18nData, SpecialtyI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid specialtyI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
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
                    const langArr = [];
                    for ( const i18nData of data.i18n ) {
                        if ( typeof ( validate( i18nData, TitleI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid titleI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                        const error = new Error( 'Invalid titleI18n object' );
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

        if ( department ) {
            for ( const type of department ) {
                await Department.create( {
                    type,
                    profileId,
                } );
            }
        }
        if ( education ) {
            for ( const educationInfo of education ) {
                await Education.create( {
                    profileId,
                    nation:        educationInfo.nation,
                    degree:        educationInfo.degree,
                    from:          educationInfo.from,
                    to:            educationInfo.to,
                    educationI18n: educationInfo.i18n,
                }, {
                    include: [ {
                        model: EducationI18n,
                        as:    'educationI18n',
                    }, ],
                } );
            }
        }
        if ( experience ) {
            for ( const experienceInfo of experience ) {
                await Experience.create( {
                    profileId,
                    from:           experienceInfo.from,
                    to:             experienceInfo.to,
                    experienceI18n: experienceInfo.i18n,
                }, {
                    include: [ {
                        model: ExperienceI18n,
                        as:    'experienceI18n',
                    }, ],
                } );
            }
        }
        if ( researchGroup ) {
            for ( const type of researchGroup ) {
                await ResearchGroup.create( {
                    type,
                    profileId,
                } );
            }
        }
        if ( specialtyI18n ) {
            for ( const specialtyInfo of specialtyI18n ) {
                const maxId = await SpecialtyI18n.max( 'specialtyId' );
                await Profile.create( {
                    specialtyI18n: specialtyInfo.map( langInfo => ( {
                        specialtyId: maxId + 1,
                        profileId,
                        language:    langInfo.language,
                        specialty:   langInfo.specialty,
                    } ) ),
                }, {
                    include: [ {
                        model: SpecialtyI18n,
                        as:    'specialtyI18n',
                    }, ],
                } );
            }
        }
        if ( title ) {
            for ( const titleInfo of title ) {
                await Title.create( {
                    from:        titleInfo.from,
                    to:          titleInfo.to,
                    profileId,
                    titleI18n: titleInfo.i18n,
                }, {
                    include: [ {
                        model: TitleI18n,
                        as:    'titleI18n',
                    }, ],
                } );
            }
        }
        return;
    }
    catch ( err ) {
        throw err;
    }
};
