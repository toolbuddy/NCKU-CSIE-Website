import ValidateUtils from 'models/common/utils/validate.js';
import LanguageUtils from 'models/common/utils/language.js';
import {
    AwardI18n,
    Award,
    ConferenceI18n,
    Conference,
    Department,
    EducationI18n,
    Education,
    ExperienceI18n,
    Experience,
    PatentI18n,
    Patent,
    Profile,
    ProjectI18n,
    Project,
    PublicationI18n,
    Publication,
    ResearchGroup,
    SpecialtyI18n,
    StudentAwardI18n,
    StudentAward,
    StudentI18n,
    Student,
    TechnologyTransferPatentI18n,
    TechnologyTransferPatent,
    TechnologyTransferI18n,
    TechnologyTransfer,
    Title,
    TitleI18n,
} from 'models/faculty/operations/associations.js';

import departmentUtils from 'models/faculty/utils/department.js';
import researchGroupUtils from 'models/faculty/utils/research-group.js';
import AwardValidationConstraints from 'models/faculty/constraints/add/award.js';
import AwardI18nValidationConstraints from 'models/faculty/constraints/add/award-i18n.js';
import ConferenceValidationConstraints from 'models/faculty/constraints/add/conference.js';
import ConferenceI18nValidationConstraints from 'models/faculty/constraints/add/conference-i18n.js';
import EducationValidationConstraints from 'models/faculty/constraints/add/education.js';
import EducationI18nValidationConstraints from 'models/faculty/constraints/add/education-i18n.js';
import ExperienceValidationConstraints from 'models/faculty/constraints/add/experience.js';
import ExperienceI18nValidationConstraints from 'models/faculty/constraints/add/experience-i18n.js';
import PatentValidationConstraints from 'models/faculty/constraints/add/patent.js';
import PatentI18nValidationConstraints from 'models/faculty/constraints/add/patent-i18n.js';
import ProjectValidationConstraints from 'models/faculty/constraints/add/project.js';
import ProjectI18nValidationConstraints from 'models/faculty/constraints/add/project-i18n.js';
import PublicationValidationConstraints from 'models/faculty/constraints/add/publication.js';
import PublicationI18nValidationConstraints from 'models/faculty/constraints/add/publication-i18n.js';
import SpecialtyI18nValidationConstraints from 'models/faculty/constraints/add/specialty-i18n.js';
import StudentValidationConstraints from 'models/faculty/constraints/add/student.js';
import StudentI18nValidationConstraints from 'models/faculty/constraints/add/student-i18n.js';
import StudentAwardValidationConstraints from 'models/faculty/constraints/add/student-award.js';
import StudentAwardI18nValidationConstraints from 'models/faculty/constraints/add/student-award-i18n.js';
import TechnologyTransferValidationConstraints from 'models/faculty/constraints/add/technology-transfer.js';
import TechnologyTransferI18nValidationConstraints from 'models/faculty/constraints/add/technology-transfer-i18n.js';
import TechnologyTransferPatentValidationConstraints from 'models/faculty/constraints/add/technology-transfer-patent.js';
import TechnologyTransferPatentI18nValidationConstraints from 'models/faculty/constraints/add/technology-transfer-patent-i18n.js';
import TitleValidationConstraints from 'models/faculty/constraints/add/title.js';
import TitleI18nValidationConstraints from 'models/faculty/constraints/add/title-i18n.js';
import validate from 'validate.js';
import { faculty, } from 'models/common/utils/connect.js';

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

/**
 * A function for adding information of a specific faculty by a given profileId. Given columns will be added.
 *
 * @async
 * @param   {number}    profileId                - ProfileId of the staff. Deciding which user information to get.
 * @param   {object []} award                    - Given information will be added to the specific user.
 * @param   {object []} conference               - Given information will be added to the specific user.
 * @param   {number []} department               - Given information will be added to the specific user.
 * @param   {number []} researchGroup            - Given information will be added to the specific user.
 * @param   {object []} education                - Given information will be added to the specific user.
 * @param   {object []} experience               - Given information will be added to the specific user.
 * @param   {object []} patent                   - Given information will be added to the specific user.
 * @param   {object []} project                  - Given information will be added to the specific user.
 * @param   {object []} publication              - Given information will be added to the specific user.
 * @param   {object []} specialtyI18n            - Given information will be added to the specific user.
 * @param   {object []} student                  - Given information will be added to the specific user.
 * @param   {object []} studentAward             - Given information will be added to the specific user.
 * @param   {object []} technologyTransfer       - Given information will be added to the specific user.
 * @param   {object []} technologyTransferPatent - Given information will be added to the specific user.
 * @param   {object []} title                    - Given information will be added to the specific user.
 *
 */

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            profileId = null,
            award = null,
            conference = null,
            department = null,
            education = null,
            experience = null,
            patent = null,
            project = null,
            publication = null,
            researchGroup = null,
            specialtyI18n = null,
            student = null,
            studentAward = null,
            technologyTransfer = null,
            technologyTransferPatent = null,
            title = null,
        } = opt;

        if ( !ValidateUtils.isValidId( profileId ) ) {
            const error = new Error( 'Invalid profile id' );
            error.status = 400;
            throw error;
        }
        if ( award !== null ) {
            if ( ValidateUtils.isValidArray( award ) ) {
                for ( const data of award ) {
                    if ( typeof ( validate( data, AwardValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid award object' );
                        error.status = 400;
                        throw error;
                    }
                    const langArr = [];
                    for ( const i18nData of data.i18n ) {
                        if ( typeof ( validate( i18nData, AwardI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid awardI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                        const error = new Error( 'Invalid awardI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid award object' );
                error.status = 400;
                throw error;
            }
        }
        if ( conference !== null ) {
            if ( ValidateUtils.isValidArray( conference ) ) {
                for ( const data of conference ) {
                    if ( typeof ( validate( data, ConferenceValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid conference object' );
                        error.status = 400;
                        throw error;
                    }
                    const langArr = [];
                    for ( const i18nData of data.i18n ) {
                        if ( typeof ( validate( i18nData, ConferenceI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid conferenceI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                        const error = new Error( 'Invalid conferenceI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid conference object' );
                error.status = 400;
                throw error;
            }
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
        if ( patent !== null ) {
            if ( ValidateUtils.isValidArray( patent ) ) {
                for ( const data of patent ) {
                    if ( typeof ( validate( data, PatentValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid patent object' );
                        error.status = 400;
                        throw error;
                    }
                    const langArr = [];
                    for ( const i18nData of data.i18n ) {
                        if ( typeof ( validate( i18nData, PatentI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid patentI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                        const error = new Error( 'Invalid patentI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid patent object' );
                error.status = 400;
                throw error;
            }
        }
        if ( project !== null ) {
            if ( ValidateUtils.isValidArray( project ) ) {
                for ( const data of project ) {
                    if ( typeof ( validate( data, ProjectValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid project object' );
                        error.status = 400;
                        throw error;
                    }
                    const langArr = [];
                    for ( const i18nData of data.i18n ) {
                        if ( typeof ( validate( i18nData, ProjectI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid projectI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                        const error = new Error( 'Invalid projectI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid project object' );
                error.status = 400;
                throw error;
            }
        }
        if ( publication !== null ) {
            if ( ValidateUtils.isValidArray( publication ) ) {
                for ( const data of publication ) {
                    if ( typeof ( validate( data, PublicationValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid publication object' );
                        error.status = 400;
                        throw error;
                    }
                    const langArr = [];
                    for ( const i18nData of data.i18n ) {
                        if ( typeof ( validate( i18nData, PublicationI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid publicationI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                        const error = new Error( 'Invalid publicationI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid publication object' );
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
        if ( student !== null ) {
            if ( ValidateUtils.isValidArray( student ) ) {
                for ( const data of student ) {
                    if ( typeof ( validate( data, StudentValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid student object' );
                        error.status = 400;
                        throw error;
                    }
                    const langArr = [];
                    for ( const i18nData of data.i18n ) {
                        if ( typeof ( validate( i18nData, StudentI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid studentI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                        const error = new Error( 'Invalid studentI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid student object' );
                error.status = 400;
                throw error;
            }
        }
        if ( studentAward !== null ) {
            if ( ValidateUtils.isValidArray( studentAward ) ) {
                for ( const data of studentAward ) {
                    if ( typeof ( validate( data, StudentAwardValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid studentAward object' );
                        error.status = 400;
                        throw error;
                    }
                    const langArr = [];
                    for ( const i18nData of data.i18n ) {
                        if ( typeof ( validate( i18nData, StudentAwardI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid studentAwardI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                        const error = new Error( 'Invalid studentAwardI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid studentAward object' );
                error.status = 400;
                throw error;
            }
        }
        if ( technologyTransfer !== null ) {
            if ( ValidateUtils.isValidArray( technologyTransfer ) ) {
                for ( const data of technologyTransfer ) {
                    if ( typeof ( validate( data, TechnologyTransferValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid technologyTransfer object' );
                        error.status = 400;
                        throw error;
                    }
                    const langArr = [];
                    for ( const i18nData of data.i18n ) {
                        if ( typeof ( validate( i18nData, TechnologyTransferI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid technologyTransferI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                        const error = new Error( 'Invalid technologyTransferI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid technologyTransfer object' );
                error.status = 400;
                throw error;
            }
        }
        if ( technologyTransferPatent !== null ) {
            if ( ValidateUtils.isValidArray( technologyTransferPatent ) ) {
                for ( const data of technologyTransferPatent ) {
                    if ( typeof ( validate( data, TechnologyTransferPatentValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid technologyTransferPatent object' );
                        error.status = 400;
                        throw error;
                    }
                    const langArr = [];
                    for ( const i18nData of data.i18n ) {
                        if ( typeof ( validate( i18nData, TechnologyTransferPatentI18nValidationConstraints ) ) !== 'undefined' ) {
                            const error = new Error( 'Invalid technologyTransferPatentI18n object' );
                            error.status = 400;
                            throw error;
                        }
                        langArr.push( i18nData.language );
                    }
                    if ( !equalArray( langArr.sort( sortByValue ), LanguageUtils.supportedLanguageId.sort( sortByValue ) ) ) {
                        const error = new Error( 'Invalid technologyTransferPatentI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid technologyTransferPatent object' );
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

        if ( award ) {
            await faculty.transaction( t => Promise.all( award.map( awardInfo => Award.create( {
                profileId,
                receivedYear:  awardInfo.receivedYear,
                awardI18n:     awardInfo.i18n,
            }, {
                include: [ {
                    model: AwardI18n,
                    as:    'awardI18n',
                }, ],
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( conference ) {
            await faculty.transaction( t => Promise.all( conference.map( conferenceInfo => Conference.create( {
                profileId,
                hostYear:       conferenceInfo.hostYear,
                conferenceI18n: conferenceInfo.i18n,
            }, {
                include: [ {
                    model: ConferenceI18n,
                    as:    'conferenceI18n',
                }, ],
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( department ) {
            await faculty.transaction( t => Promise.all( department.map( type => Department.create( {
                type,
                profileId,
            }, {
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( education ) {
            await faculty.transaction( t => Promise.all( education.map( educationInfo => Education.create( {
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
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( experience ) {
            await faculty.transaction( t => Promise.all( experience.map( experienceInfo => Experience.create( {
                profileId,
                from:           experienceInfo.from,
                to:             experienceInfo.to,
                experienceI18n: experienceInfo.i18n,
            }, {
                include: [ {
                    model: ExperienceI18n,
                    as:    'experienceI18n',
                }, ],
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( patent ) {
            await faculty.transaction( t => Promise.all( patent.map( patentInfo => Patent.create( {
                profileId,
                nation:              patentInfo.nation,
                certificationNumber: patentInfo.certificationNumber,
                applicationDate:     patentInfo.applicationDate,
                issueDate:           patentInfo.issueDate,
                expireDate:          patentInfo.expireDate,
                patentI18n:          patentInfo.i18n,
            }, {
                include: [ {
                    model: PatentI18n,
                    as:    'patentI18n',
                }, ],
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( project ) {
            await faculty.transaction( t => Promise.all( project.map( projectInfo => Project.create( {
                profileId,
                from:        projectInfo.from,
                to:          projectInfo.to,
                category:    projectInfo.category,
                projectI18n: projectInfo.i18n,
            }, {
                include: [ {
                    model: ProjectI18n,
                    as:    'projectI18n',
                }, ],
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( publication ) {
            await faculty.transaction( t => Promise.all( publication.map( publicationInfo => Publication.create( {
                profileId,
                issueYear:       publicationInfo.issueYear,
                issueMonth:      publicationInfo.issueMonth,
                category:        publicationInfo.category,
                international:   publicationInfo.international,
                refereed:        publicationInfo.refereed,
                publicationI18n: publicationInfo.i18n,
            }, {
                include: [ {
                    model: PublicationI18n,
                    as:    'publicationI18n',
                }, ],
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( researchGroup ) {
            await faculty.transaction( t => Promise.all( researchGroup.map( type => ResearchGroup.create( {
                type,
                profileId,
            }, {
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( specialtyI18n ) {
            await faculty.transaction( t => Promise.all( specialtyI18n.map( async ( specialtyInfo ) => {
                const maxId = await SpecialtyI18n.max( 'specialtyId' );
                return Profile.create( {
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
                    transaction: t,
                } );
            } ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( studentAward ) {
            await faculty.transaction( t => Promise.all( studentAward.map( studentAwardInfo => StudentAward.create( {
                profileId,
                receivedYear:     studentAwardInfo.receivedYear,
                studentAwardI18n: studentAwardInfo.i18n,
            }, {
                include: [ {
                    model: StudentAwardI18n,
                    as:    'studentAwardI18n',
                }, ],
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( student ) {
            await faculty.transaction( t => Promise.all( student.map( studentInfo => Student.create( {
                studentAwardId:       studentInfo.studentAwardId,
                degree:         studentInfo.degree,
                studentI18n:    studentInfo.i18n,
            }, {
                include: [ {
                    model: StudentI18n,
                    as:    'studentI18n',
                }, ],
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( technologyTransfer ) {
            await faculty.transaction( t => Promise.all( technologyTransfer.map( technologyTransferInfo => TechnologyTransfer.create( {
                profileId,
                from:                   technologyTransferInfo.from,
                to:                     technologyTransferInfo.to,
                technologyTransferI18n: technologyTransferInfo.i18n,
            }, {
                include: [ {
                    model: TechnologyTransferI18n,
                    as:    'technologyTransferI18n',
                }, ],
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( technologyTransferPatent ) {
            await faculty.transaction( t => Promise.all( technologyTransferPatent.map( technologyTransferPatentInfo => TechnologyTransferPatent.create( {
                technologyTransferId:         technologyTransferPatentInfo.technologyTransferId,
                technologyTransferPatentI18n: technologyTransferPatentInfo.i18n,
            }, {
                include: [ {
                    model: TechnologyTransferPatentI18n,
                    as:    'technologyTransferPatentI18n',
                }, ],
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        if ( title ) {
            await faculty.transaction( t => Promise.all( title.map( titleInfo => Title.create( {
                from:        titleInfo.from,
                to:          titleInfo.to,
                profileId,
                titleI18n: titleInfo.i18n,
            }, {
                include: [ {
                    model: TitleI18n,
                    as:    'titleI18n',
                }, ],
                transaction: t,
            } ) ) ) ).catch( ( err ) => {
                throw err;
            } );
        }
        return;
    }
    catch ( err ) {
        throw err;
    }
};
