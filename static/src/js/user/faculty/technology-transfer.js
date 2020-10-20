import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import NavigationBar from 'static/src/js/components/user/navigation-bar.js';
import technologyTransferColumnsUnits from 'models/faculty/utils/technology-transfer-columns.js';
import technologyTransferPatentColumnsUnits from 'models/faculty/utils/technology-transfer-patent-columns.js';
import DefaultDataManagement from 'static/src/js/components/user/faculty/default-data-management.js';
import TechnologyTransferPatentDataManagement from 'static/src/js/components/user/faculty/technology-transfer-patent-data-management.js';

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
    const technologyTrahsferDataManagement = new DefaultDataManagement({
        bodyFormDOM: document.getElementById('form'),
        refreshDOM: document.querySelector('.content__technology-transfer > .technology-transfer__refresh'),
        loadingDOM: document.querySelector('.content__technology-transfer > .technology-transfer__loading'),
        cardsDOM: document.getElementById('technology-transfer__cards'),
        patchButtonsDOM: document.getElementsByClassName('technology-transfer-card__patch'),
        deleteButtonsDOM: document.getElementsByClassName('technology-transfer-card__delete'),
        postButtonsDOM: document.getElementsByClassName('local-topic__post-button--technology-transfer'),
        languageId: WebLanguageUtils.currentLanguageId,
        columnUnits: technologyTransferColumnsUnits,
        table: 'technology-transfer',
        dbTable: 'technologyTransfer',
        idColumn: 'technologyTransferId',
        deletePreview: data => `${data.technology}`,
    });
    if (!(technologyTrahsferDataManagement instanceof DefaultDataManagement))
        throw new Error('award data management error');
    technologyTrahsferDataManagement.exec();
}
catch (err) {
    console.error(err);
}

try {
    const technologyTrahsferPatentDataManagement = new TechnologyTransferPatentDataManagement({
        bodyFormDOM: document.getElementById('form'),
        refreshDOM: document.querySelector('.content__technology-transfer > .technology-transfer__refresh'),
        loadingDOM: document.querySelector('.content__technology-transfer > .technology-transfer__loading'),
        cardsDOM: document.getElementById('technology-transfer__cards'),
        patchButtonsDOM: document.getElementsByClassName('technology-transfer-patent-card__patch'),
        deleteButtonsDOM: document.getElementsByClassName('technology-transfer-patent-card__delete'),
        postButtonsDOM: document.getElementsByClassName('technology-transfer-card__patent-post'),
        languageId: WebLanguageUtils.currentLanguageId,
        columnUnits: technologyTransferPatentColumnsUnits,
        table: 'technology-transfer-patent',
        dbTable: 'technologyTransferPatent',
        idColumn: 'technologyTransferPatentId',
        deletePreview: data => `${data.patent}`,
    });
    if (!(technologyTrahsferPatentDataManagement instanceof TechnologyTransferPatentDataManagement))
        throw new Error('award data management error');
    technologyTrahsferPatentDataManagement.exec();
}
catch (err) {
    console.error(err);
}
