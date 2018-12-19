import header from 'static/src/js/components/common/header/index.js';

header( document.getElementById( 'header' ) );

const iconContainer = document.getElementById("error__image--iconContainer")
const elementOriginal = document.querySelectorAll('.error__image--shape');
// const elementNum = elementOriginal.length;
const elementCopyNum = 3;

for(var element of elementOriginal){
    for(var copyNum = 0; copyNum < elementCopyNum; copyNum++){
        var elementCopy = element.cloneNode(true);

        /* eslint no-magic-numbers: 0 */
        var delayTime = Math.ceil(Math.random()*20);
        var delayTimeStr = delayTime.toString() + 's';
        elementCopy.style.animationDelay = delayTimeStr;

        /* eslint no-magic-numbers: 0 */
        var leftDist = Math.ceil(Math.random()*80);
        var leftDistStr = leftDist.toString() + '%';
        elementCopy.style.left = leftDistStr;

        iconContainer.appendChild(elementCopy);
    }
}
