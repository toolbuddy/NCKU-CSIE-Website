import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import NavigationBar from 'static/src/js/components/user/navigation-bar.js';
import titleColumnsUnits from 'models/faculty/utils/title-columns.js';
import specialtyColumnsUnits from 'models/faculty/utils/specialty-columns.js';
import experienceColumnsUnits from 'models/faculty/utils/experience-columns.js';
import educationColumnsUnits from 'models/faculty/utils/education-columns.js';
import DefaultDataManagement from 'static/src/js/components/user/faculty/default-data-management.js';
import ProfileDataManagement from 'static/src/js/components/user/faculty/profile-data-management.js';

try {
    const headerBase = new GetHeaderBase({
        headerDOM: document.querySelector('.body__header.header.header--base'),
        allHeaderDOMs: document.querySelectorAll('.body__header.header'),
    });
    if (!(headerBase instanceof GetHeaderBase))
        throw new Error('.header.header--base not found.');
}
catch (err) {
    console.error(err);
}
try {
    const headerMedium = new GetHeaderMedium({
        headerDOM: document.querySelector('.body__header.header.header--medium'),
        allHeaderDOMs: document.querySelectorAll('.body__header.header'),
    });
    if (!(headerMedium instanceof GetHeaderMedium))
        throw new Error('.header.header--medium not found.');
}
catch (err) {
    console.error(err);
}
try {
    const headerLarge = new GetHeaderLarge({
        headerDOM: document.querySelector('.body__header.header.header--large'),
    });
    if (!(headerLarge instanceof GetHeaderLarge))
        throw new Error('.header.header--medium not found.');
    headerLarge.renderLogin();
}
catch (err) {
    console.error(err);
}

try {
    const nevagationBar = new NavigationBar({
        navigationDOM: document.getElementById('navigation'),
        languageId: WebLanguageUtils.currentLanguageId,
    });

    nevagationBar.exec();
}
catch (err) {
    console.error(err);
}

try {
    const profileDataManagement = new ProfileDataManagement({
        bodyFormDOM: document.getElementById('form'),
        porfileContentDOM: document.getElementById('content__profile'),
        patchButtonsDOM: document.getElementsByClassName('profile-card__patch'),
        departmentDOM: document.getElementsByClassName('tags__tag--department'),
        researchGroupDOM: document.getElementsByClassName('tags__tag--researchGroup'),
        languageId: WebLanguageUtils.currentLanguageId,
    });
    if (!(profileDataManagement instanceof ProfileDataManagement))
        throw new Error('profile data management error');
    profileDataManagement.exec();
}
catch (err) {
    console.error(err);
}

try {
    const titleDataManagement = new DefaultDataManagement({
        bodyFormDOM: document.getElementById('form'),
        refreshDOM: document.querySelector('.content__title > .title__refresh'),
        loadingDOM: document.querySelector('.content__title > .title__loading'),
        cardsDOM: document.getElementById('title__cards'),
        patchButtonsDOM: document.getElementsByClassName('title-card__patch'),
        deleteButtonsDOM: document.getElementsByClassName('title-card__delete'),
        postButtonsDOM: document.getElementsByClassName('local-topic__post-button--title'),
        languageId: WebLanguageUtils.currentLanguageId,
        columnUnits: titleColumnsUnits,
        table: 'title',
        dbTable: 'title',
        idColumn: 'titleId',
        deletePreview: data => `${data.title}`,
    });
    if (!(titleDataManagement instanceof DefaultDataManagement))
        throw new Error('award data management error');
    titleDataManagement.exec();
}
catch (err) {
    console.error(err);
}

try {
    const specialtyDataManagement = new DefaultDataManagement({
        bodyFormDOM: document.getElementById('form'),
        refreshDOM: document.querySelector('.content__specialty > .specialty__refresh'),
        loadingDOM: document.querySelector('.content__specialty > .specialty__loading'),
        cardsDOM: document.getElementById('specialty__cards'),
        patchButtonsDOM: document.getElementsByClassName('specialty-card__patch'),
        deleteButtonsDOM: document.getElementsByClassName('specialty-card__delete'),
        postButtonsDOM: document.getElementsByClassName('local-topic__post-button--specialty'),
        languageId: WebLanguageUtils.currentLanguageId,
        columnUnits: specialtyColumnsUnits,
        table: 'specialty',
        dbTable: 'specialty',
        idColumn: 'specialtyId',
        deletePreview: data => `${data.specialty}`,
    });
    if (!(specialtyDataManagement instanceof DefaultDataManagement))
        throw new Error('award data management error');
    specialtyDataManagement.exec();
}
catch (err) {
    console.error(err);
}

try {
    const educationDataManagement = new DefaultDataManagement({
        bodyFormDOM: document.getElementById('form'),
        refreshDOM: document.querySelector('.content__education > .education__refresh'),
        loadingDOM: document.querySelector('.content__education > .education__loading'),
        cardsDOM: document.getElementById('education__cards'),
        patchButtonsDOM: document.getElementsByClassName('education-card__patch'),
        deleteButtonsDOM: document.getElementsByClassName('education-card__delete'),
        postButtonsDOM: document.getElementsByClassName('local-topic__post-button--education'),
        languageId: WebLanguageUtils.currentLanguageId,
        columnUnits: educationColumnsUnits,
        table: 'education',
        dbTable: 'education',
        idColumn: 'educationId',
        deletePreview: data => `${data.school} ${data.major}`,
    });
    if (!(educationDataManagement instanceof DefaultDataManagement))
        throw new Error('award data management error');
    educationDataManagement.exec();
}
catch (err) {
    console.error(err);
}

try {
    const experienceDataManagement = new DefaultDataManagement({
        bodyFormDOM: document.getElementById('form'),
        refreshDOM: document.querySelector('.content__experience > .experience__refresh'),
        loadingDOM: document.querySelector('.content__experience > .experience__loading'),
        cardsDOM: document.getElementById('experience__cards'),
        patchButtonsDOM: document.getElementsByClassName('experience-card__patch'),
        deleteButtonsDOM: document.getElementsByClassName('experience-card__delete'),
        postButtonsDOM: document.getElementsByClassName('local-topic__post-button--experience'),
        languageId: WebLanguageUtils.currentLanguageId,
        columnUnits: experienceColumnsUnits,
        table: 'experience',
        dbTable: 'experience',
        idColumn: 'experienceId',
        deletePreview: data => `${data.organization} ${data.department} ${data.title}`,
    });
    if (!(experienceDataManagement instanceof DefaultDataManagement))
        throw new Error('award data management error');
    experienceDataManagement.exec();
}
catch (err) {
    console.error(err);
}
