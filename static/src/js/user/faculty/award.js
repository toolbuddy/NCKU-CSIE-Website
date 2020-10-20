import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import NavigationBar from 'static/src/js/components/user/navigation-bar.js';
import awardColumnsUnits from 'models/faculty/utils/award-columns.js';
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
    const awardDataManagement = new DefaultDataManagement({
        bodyFormDOM: document.getElementById('form'),
        refreshDOM: document.querySelector('.content__award > .award__refresh'),
        loadingDOM: document.querySelector('.content__award > .award__loading'),
        cardsDOM: document.getElementById('award__cards'),
        patchButtonsDOM: document.getElementsByClassName('award-card__patch'),
        deleteButtonsDOM: document.getElementsByClassName('award-card__delete'),
        postButtonsDOM: document.getElementsByClassName('local-topic__post-button--award'),
        languageId: WebLanguageUtils.currentLanguageId,
        columnUnits: awardColumnsUnits,
        table: 'award',
        dbTable: 'award',
        idColumn: 'awardId',
        deletePreview: data => `${data.receivedYear} ${data.award}`,
    });
    if (!(awardDataManagement instanceof DefaultDataManagement))
        throw new Error('award data management error');
    awardDataManagement.exec();
}
catch (err) {
    console.error(err);
}
