import {
    editorLanguageButtonClick,
    tagButtonClick,
    submitButtonClick,
    delayOptoinChange,
} from 'static/src/js/components/user/announcement/event.js';
import DefaultTagFilter from 'static/src/js/components/announcement/default-tag.js';

function initTimeSelector ( timeSelector ) {
    const now = new Date( Date.now() );
    timeSelector.getElementsByClassName( 'input__time--date' )[ 0 ].value = DefaultTagFilter.formatUpdateTime( now );
    timeSelector.getElementsByClassName( 'input__time--hour' )[ 0 ].value = now.getHours();
    timeSelector.getElementsByClassName( 'input__time--minute' )[ 0 ].value = now.getMinutes();
    timeSelector.style.display = 'none';
}

export default ( {
    actionOptions = null,
    announcement = null,
    editorLanguageButtons = null,
    editors = null,
    submitButton = null,
    tagButtons = null,
    timeSelector = null,
} ) => {
    initTimeSelector( timeSelector );

    Array.from(
        editorLanguageButtons
    ).forEach( button => editorLanguageButtonClick(
        button,
        editors,
    ) );
    editorLanguageButtons[ 0 ].click();

    Array.from(
        tagButtons
    ).slice( 1, tagButtons.length ).forEach( button => tagButtonClick(
        announcement,
        button,
    ) );

    submitButtonClick(
        actionOptions,
        announcement,
        submitButton,
        editors,
        timeSelector,
    );

    delayOptoinChange(
        actionOptions,
        timeSelector,
    );
};
