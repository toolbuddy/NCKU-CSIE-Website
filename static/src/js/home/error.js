import header from 'static/src/js/components/common/header/index.js';

header( document.getElementById( 'header' ) );

const iconContainer = document.getElementById( 'error__image--iconContainer' );
const elementOriginal = document.querySelectorAll( '.error__image--shape' );

// Const elementNum = elementOriginal.length;
const elementCopyNum = 3;

for ( const element of elementOriginal ) {
    for ( let copyNum = 0; copyNum < elementCopyNum; copyNum++ ) {
        const elementCopy = element.cloneNode( true );

        /* eslint no-magic-numbers: 0 */
        const delayTime = Math.ceil( Math.random() * 20 );
        const delayTimeStr = `${ delayTime.toString() }s`;
        elementCopy.style.animationDelay = delayTimeStr;

        /* eslint no-magic-numbers: 0 */
        const leftDist = Math.ceil( Math.random() * 80 );
        const leftDistStr = `${ leftDist.toString() }%`;
        elementCopy.style.left = leftDistStr;

        iconContainer.appendChild( elementCopy );
    }
}
