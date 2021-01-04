import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import tagUtils from 'models/announcement/utils/tag.js';
import {GetAllAnnouncement, GetAdmissionAnnouncement} from 'static/src/js/components/home/get-announcement.js';
import GetNews from 'static/src/js/components/home/get-news.js';
import GetTvAnnouncements from 'static/src/js/components/home/get-tv-announcements.js';

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
    const getTvAnnouncements = new GetTvAnnouncements({
        amount: 6,
        tvDOM: document.getElementById('tv'),
        languageId: WebLanguageUtils.currentLanguageId,
        tags: tagUtils.supportedOptions,
    });

    getTvAnnouncements.exec();
}
catch (err) {
    console.error(err);
}
try {
    const getAllAnnouncement = new GetAllAnnouncement({
        amount: 5,
        announcementDOM: document.getElementById('announcement'),
        from: new Date('2019/01/01'),
        languageId: WebLanguageUtils.currentLanguageId,
        tags: tagUtils.supportedOptions,
        to: new Date(Date.now()),
        page: 1,
    });

    getAllAnnouncement.exec();
}
catch (err) {
    console.error(err);
}
try {
    const getAdmissionAnnouncement = new GetAdmissionAnnouncement({
        amount: 7,
        announcementDOM: document.getElementById('admission-announcement'),
        from: new Date('2010/01/01'),
        languageId: WebLanguageUtils.currentLanguageId,
        tags: ['admission'],
        to: new Date(Date.now()),
        page: 1,
    });

    getAdmissionAnnouncement.exec();
}
catch (err) {
    console.error(err);
}
try {
    const getNews = new GetNews({
        amount: 6,
        announcementDOM: document.getElementById('news'),
        controlForwordDOM: document.getElementById('control--forword'),
        controlBackwordDOM: document.getElementById('control--backword'),
        from: new Date('2019/01/01'),
        languageId: WebLanguageUtils.currentLanguageId,
        tags: ['course'],
        to: new Date(Date.now()),
        page: 1,
    });

    getNews.exec();
}
catch (err) {
    console.error(err);
}
