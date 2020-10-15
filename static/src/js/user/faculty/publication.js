import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import NavigationBar from 'static/src/js/components/user/navigation-bar.js';
import publicationColumnsUtils from 'models/faculty/utils/publication-columns.js';
import DefaultDataManagement from 'static/src/js/components/user/faculty/default-data-management.js';

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
    const publicationDataManagement = new DefaultDataManagement({
        bodyFormDOM: document.getElementById('form'),
        refreshDOM: document.querySelector('.content__publication > .publication__refresh'),
        loadingDOM: document.querySelector('.content__publication > .publication__loading'),
        cardsDOM: document.getElementById('publication__cards'),
        patchButtonsDOM: document.getElementsByClassName('publication-card__patch'),
        deleteButtonsDOM: document.getElementsByClassName('publication-card__delete'),
        postButtonsDOM: document.getElementsByClassName('local-topic__post-button--publication'),
        languageId: WebLanguageUtils.currentLanguageId,
        columnUnits: publicationColumnsUtils,
        table: 'publication',
        dbTable: 'publication',
        idColumn: 'publicationId',
        deletePreview: data => `${data.title}`,
    });
    if (!(publicationDataManagement instanceof DefaultDataManagement))
        throw new Error('award data management error');
    publicationDataManagement.exec();
}
catch (err) {
    console.error(err);
}
