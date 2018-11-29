function isChild ( child, parent ) {
    if ( child && parent ) {
        let parentNode = child.parentNode;
        while ( parentNode ) {
            if ( parent === parentNode )
                return true;
            parentNode = parentNode.parentNode;
        }
    }
    return false;
}

export function registClickModifyClass ( source, target, className, additionAction = null ) {
    source.addEventListener( 'click', () => {
        if ( !target.classList.contains( className ) )
            target.classList.add( className );
        else
            target.classList.remove( className );
    } );
    if ( additionAction ) additionAction();
}

export function registItemSwitch ( itemSwitch ) {
    const itemDropdown = itemSwitch.parentElement.querySelector( '.item__dropdown' );
    itemSwitch.addEventListener( 'click', () => {
        if ( itemSwitch.classList.contains( 'item__switch--active' ) ) {
            itemSwitch.classList.remove( 'item__switch--active' );
            itemDropdown.classList.remove( 'item__dropdown--open' );
        }
        else {
            itemSwitch.classList.add( 'item__switch--active' );
            itemDropdown.classList.add( 'item__dropdown--open' );
        }
    } );
}

export function documentClickCheck ( source, headerNavigation, headerMenu, NavigationClassName,
    headerlanguageDropdown, languageButton, LanguageClassName ) {
    source.addEventListener( 'click', ( e ) => {
        if ( headerNavigation.classList.contains( NavigationClassName ) &&
            e.target !== headerMenu &&
            e.target !== headerNavigation &&
            !isChild( e.target, headerNavigation ) )
            headerNavigation.classList.remove( NavigationClassName );
        if ( headerlanguageDropdown.classList.contains( LanguageClassName ) &&
            e.target !== languageButton &&
            !isChild( e.target, languageButton ) )
            headerlanguageDropdown.classList.remove( LanguageClassName );
    } );
}

export function registLanguageSwitch ( navigationLanguage, languageSwitch, languageDropdown, languageActive, languageOpen ) {
    navigationLanguage.addEventListener( 'click', () => {
        if ( languageSwitch.classList.contains( languageActive ) ) {
            languageSwitch.classList.remove( languageActive );
            languageDropdown.classList.remove( languageOpen );
        }
        else {
            languageSwitch.classList.add( languageActive );
            languageDropdown.classList.add( languageOpen );
        }
    } );
}
