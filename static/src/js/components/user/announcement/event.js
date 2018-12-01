import { changeEditorLanguage, flipTag, } from 'static/src/js/components/user/announcement/render.js';

function getDelayTime ( timeSelector ) {
    const date = new Date( timeSelector.getElementsByClassName( 'input__time--date' )[ 0 ].value );
    date.setHours( timeSelector.getElementsByClassName( 'input__time--hour' )[ 0 ].value );
    date.setMinutes( timeSelector.getElementsByClassName( 'input__time--minute' )[ 0 ].value );
    return date;
}

export function editorLanguageButtonClick ( button, editors, ) {
    const language = /editor__language--([a-zA-Z0-9-]+)/.exec( button.className )[ 1 ];
    button.addEventListener( 'click', () => {
        changeEditorLanguage( editors, language );
    } );
}

export function tagButtonClick ( announcement, button, ) {
    const tagName = /tags__tag--([a-zA-Z0-9]+)/.exec( button.id )[ 1 ];
    button.addEventListener( 'click', () => {
        const tagIsActive = flipTag( button );
        if ( tagIsActive )
            announcement.appendTag( tagName );
        else
            announcement.removeTag( tagName );
    } );
}
export function submitButtonClick (
        actionOptions,
        announcement,
        button,
        editors,
        timeSelector,
) {
    button.addEventListener( 'click', () => {
        Array.from( editors ).forEach( ( editor ) => {
            const language = /editor__editor--([a-zA-Z0-9-]+)/.exec( editor.className )[ 1 ];
            announcement.setTitleContent(
                language,
                editor.getElementsByClassName( 'editor__input--title' )[ 0 ].value,
                editor.getElementsByClassName( 'editor__input--content' )[ 0 ].value,
            );
        } );

        // TODO: set author and isPinned

        const action = Array.from( actionOptions ).filter( option => option.checked === true )[ 0 ].value;
        if ( action === 'publish' ) {
            announcement.updateTime = new Date( Date.now() );
            announcement.isPublished = true;
        }
        else if ( action === 'draft' ) {
            announcement.updateTime = new Date( Date.now() );
            announcement.isPublished = false;
        }

        // TODO: delay publishing
        else if ( action === 'delay' ) {
            announcement.updateTime = getDelayTime( timeSelector );
            announcement.isPublished = false;
        }

        announcement.update();
    } );
}

export function delayOptoinChange ( actionOptions, timeSelector ) {
    actionOptions = Array.from( actionOptions );
    const delayOption = actionOptions.filter( option => option.value === 'delay' )[ 0 ];
    actionOptions.forEach( ( option ) => {
        option.addEventListener( 'change', () => {
            if ( delayOption.checked === true )
                timeSelector.style.display = 'block';
            else
                timeSelector.style.display = 'none';
        } );
    } );
}
