const tables = require('models/faculty/operations/associations.js');

const validate = require('validate.js');
const validateUtils = require('models/common/utils/validate.js');
const languageUtils = require('models/common/utils/language.js');

const AwardValidationConstraints = require('models/faculty/constraints/add/award.js');
const AwardI18nValidationConstraints = require('models/faculty/constraints/add/award-i18n.js');
const ConferenceValidationConstraints = require('models/faculty/constraints/add/conference.js');
const ConferenceI18nValidationConstraints = require('models/faculty/constraints/add/conference-i18n.js');
const DepartmentValidationConstraints = require('models/faculty/constraints/add/department.js');
const EducationValidationConstraints = require('models/faculty/constraints/add/education.js');
const EducationI18nValidationConstraints = require('models/faculty/constraints/add/education-i18n.js');
const ExperienceValidationConstraints = require('models/faculty/constraints/add/experience.js');
const ExperienceI18nValidationConstraints = require('models/faculty/constraints/add/experience-i18n.js');
const PatentValidationConstraints = require('models/faculty/constraints/add/patent.js');
const PatentI18nValidationConstraints = require('models/faculty/constraints/add/patent-i18n.js');
const ProjectValidationConstraints = require('models/faculty/constraints/add/project.js');
const ProjectI18nValidationConstraints = require('models/faculty/constraints/add/project-i18n.js');
const PublicationValidationConstraints = require('models/faculty/constraints/add/publication.js');
const PublicationI18nValidationConstraints = require('models/faculty/constraints/add/publication-i18n.js');
const ResearchGroupValidationConstraints = require('models/faculty/constraints/add/research-group.js');
const SpecialtyValidationConstraints = require('models/faculty/constraints/add/specialty.js');
const SpecialtyI18nValidationConstraints = require('models/faculty/constraints/add/specialty-i18n.js');
const StudentValidationConstraints = require('models/faculty/constraints/add/student.js');
const StudentI18nValidationConstraints = require('models/faculty/constraints/add/student-i18n.js');
const StudentAwardValidationConstraints = require('models/faculty/constraints/add/student-award.js');
const StudentAwardI18nValidationConstraints = require('models/faculty/constraints/add/student-award-i18n.js');
const TechnologyTransferValidationConstraints = require('models/faculty/constraints/add/technology-transfer.js');
const TechnologyTransferI18nValidationConstraints = require('models/faculty/constraints/add/technology-transfer-i18n.js');
const TechnologyTransferPatentValidationConstraints = require('models/faculty/constraints/add/technology-transfer-patent.js');
const TechnologyTransferPatentI18nValidationConstraints = require('models/faculty/constraints/add/technology-transfer-patent-i18n.js');
const TitleValidationConstraints = require('models/faculty/constraints/add/title.js');
const TitleI18nValidationConstraints = require('models/faculty/constraints/add/title-i18n.js');

const validationConstraints = {
    Award: AwardValidationConstraints,
    AwardI18n: AwardI18nValidationConstraints,
    Conference: ConferenceValidationConstraints,
    ConferenceI18n: ConferenceI18nValidationConstraints,
    Department: DepartmentValidationConstraints,
    Education: EducationValidationConstraints,
    EducationI18n: EducationI18nValidationConstraints,
    Experience: ExperienceValidationConstraints,
    ExperienceI18n: ExperienceI18nValidationConstraints,
    Patent: PatentValidationConstraints,
    PatentI18n: PatentI18nValidationConstraints,
    Project: ProjectValidationConstraints,
    ProjectI18n: ProjectI18nValidationConstraints,
    Publication: PublicationValidationConstraints,
    PublicationI18n: PublicationI18nValidationConstraints,
    ResearchGroup: ResearchGroupValidationConstraints,
    Specialty: SpecialtyValidationConstraints,
    SpecialtyI18n: SpecialtyI18nValidationConstraints,
    Student: StudentValidationConstraints,
    StudentI18n: StudentI18nValidationConstraints,
    StudentAward: StudentAwardValidationConstraints,
    StudentAwardI18n: StudentAwardI18nValidationConstraints,
    TechnologyTransfer: TechnologyTransferValidationConstraints,
    TechnologyTransferI18n: TechnologyTransferI18nValidationConstraints,
    TechnologyTransferPatent: TechnologyTransferPatentValidationConstraints,
    TechnologyTransferPatentI18n: TechnologyTransferPatentI18nValidationConstraints,
    Title: TitleValidationConstraints,
    TitleI18n: TitleI18nValidationConstraints,
};

function sortByValue (a, b) {
    return a - b;
}

function equalArray (a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }

    return true;
}

module.exports = async (opt) => {
    try {
        opt = opt || {};
        let dbTable = null;

        // Turn first letter of table name to uppercase
        // TODO: check if a valid table name?
        // TODO: check if going to create profile?
        if (typeof opt.dbTable === typeof '')
            dbTable = opt.dbTable[0].toUpperCase() + opt.dbTable.substr(1);
        else {
            const error = new Error('Invalid table name');
            error.status = 400;
            throw error;
        }

        // Check if profileId is valid
        if (!validateUtils.isPositiveInteger(opt.data.profileId)) {
            const error = new Error('Invalid profile id');
            error.status = 400;
            throw error;
        }

        // Check if data follow the validation constraint
        if (typeof (validate(opt.data, validationConstraints[dbTable])) !== 'undefined') {
            const error = new Error(`Invalid ${dbTable} object`);
            error.status = 400;
            throw error;
        }

        if (opt.data[`${opt.dbTable}I18n`]) {
            const langArr = [];
            for (const i18nData of opt.data[`${opt.dbTable}I18n`]) {
                if (typeof (validate(i18nData, validationConstraints[`${dbTable}I18n`])) !== 'undefined') {
                    const error = new Error(`Invalid ${dbTable}I18n object`);
                    error.status = 400;
                    throw error;
                }
                langArr.push(i18nData.language);
            }
            if (!equalArray(langArr.sort(sortByValue), languageUtils.supportedLanguageId.sort(sortByValue))) {
                const error = new Error(`Invalid length of ${dbTable}I18n object`);
                error.status = 400;
                throw error;
            }
        }

        // Insert data
        return tables[dbTable].create(
            opt.data,
            opt.data[`${opt.dbTable}I18n`] ?
                {
                    include: [
                        {
                            model: tables[`${dbTable}I18n`],
                            as: `${opt.dbTable}I18n`,
                        },
                    ],
                } :
                null,
        ).
        then(() => ({message: 'success'})).
        catch((err) => {
            throw err;
        });
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};
