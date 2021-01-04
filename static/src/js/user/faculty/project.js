import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import NavigationBar from 'static/src/js/components/user/navigation-bar.js';
import projectColumnsUnits from 'models/faculty/utils/project-columns.js';
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
    const patentDataManagement = new DefaultDataManagement({
        bodyFormDOM: document.getElementById('form'),
        refreshDOM: document.querySelector('.content__project > .project__refresh'),
        loadingDOM: document.querySelector('.content__project > .project__loading'),
        cardsDOM: document.getElementById('project__cards'),
        patchButtonsDOM: document.getElementsByClassName('project-card__patch'),
        deleteButtonsDOM: document.getElementsByClassName('project-card__delete'),
        postButtonsDOM: document.getElementsByClassName('local-topic__post-button--project'),
        languageId: WebLanguageUtils.currentLanguageId,
        columnUnits: projectColumnsUnits,
        table: 'project',
        dbTable: 'project',
        idColumn: 'projectId',
        deletePreview: data => `${data.name}`,
    });
    if (!(patentDataManagement instanceof DefaultDataManagement))
        throw new Error('award data management error');
    patentDataManagement.exec();
}
catch (err) {
    console.error(err);
}
