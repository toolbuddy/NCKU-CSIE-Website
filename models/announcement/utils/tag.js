const LanguageUtils = require('../../common/utils/language.js');
const I18nUtils = require('../../common/utils/i18n.js');
const {defaultOption, i18n, map} = require('../maps/tag.js');

const tagUtils = new I18nUtils({
    defaultOption,
    i18n,
    map,
});

Object.assign(tagUtils, {
    getTagAllValue (languageId = LanguageUtils.defaultLanguageId) {
        if (LanguageUtils.isSupportedLanguageId(languageId))
            return i18n[languageId].all;
    },
    get tagAllId () {
        return -1;
    },
    getTagColorById (tagId) {
        if (!tagUtils.isSupportedId(tagId))
            return;

        const tagOption = tagUtils.getOptionById(tagId);
        if (tagOption === 'course' || tagOption === 'faculty')
            return 'yellow';
        else if (tagOption === 'college' || tagOption === 'master' || tagOption === 'phd' || tagOption === 'admissions')
            return 'blue';
        else if (tagOption === 'internship' || tagOption === 'scholarship' || tagOption === 'international' || tagOption === 'award')
            return 'red';
        else if (tagOption === 'speech' || tagOption === 'conference' || tagOption === 'exhibition' || tagOption === 'competition')
            return 'purple';
        else if (tagOption === 'recruitment' || tagOption === 'rule')
            return 'green';
    },
});

module.exports = tagUtils;
