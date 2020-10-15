import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import AnnouncementEvent from 'static/src/js/components/user/announcement/announcement-event.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';

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
    let id = /edit\/(\d+)/.exec(window.location.pathname);

    if (id === null)
        id = 0;
    else
        id = id[1];

    const announcementEvent = new AnnouncementEvent({
        id: Number(id),
        languageId: WebLanguageUtils.currentLanguageId,
        editBlockDOM: document.getElementById('edit-block'),
        method: 'edit',
    });
    announcementEvent.exec();
}
catch (err) {
    console.error(err);
}
