import GetHeaderBase from 'static/src/js/components/common/header-base.js';
import GetHeaderMedium from 'static/src/js/components/common/header-medium.js';
import GetHeaderLarge from 'static/src/js/components/common/header-large.js';
import WebLanguageUtils from 'static/src/js/utils/language.js';
import resetPasswordUtils from 'models/user/utils/reset-password.js';
import {classAdd, classRemove} from 'static/src/js/utils/style.js';

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
    const newPwdDOM = document.getElementById('form__passwordNew');
    const checkPwdDOM = document.getElementById('form__passwordConfirm');
    const errorDOM = document.getElementById('error');
    document.getElementById('form__submit').addEventListener('click', (e) => {
        e.preventDefault();

        new Promise((res, rej) => {
            let errorMessage = '';
            Array.from(document.getElementsByTagName('input')).forEach((element) => {
                const column = resetPasswordUtils.getValueByOption({
                    option: element.getAttribute('column'),
                    languageId: WebLanguageUtils.currentLanguageId,
                });
                let error = '';
                if (element.validity.patternMismatch) {
                    error = resetPasswordUtils.getValueByOption({
                        option: 'patternMismatch',
                        languageId: WebLanguageUtils.currentLanguageId,
                    });
                    errorMessage = `${column}${error}`;
                }
                else if (element.validity.valueMissing) {
                    error = resetPasswordUtils.getValueByOption({
                        option: 'valueMissing',
                        languageId: WebLanguageUtils.currentLanguageId,
                    });
                    errorMessage = `${column}${error}`;
                }
            });

            if (newPwdDOM.value !== checkPwdDOM.value) {
                errorMessage = resetPasswordUtils.getValueByOption({
                    option: 'checkMismatch',
                    languageId: WebLanguageUtils.currentLanguageId,
                });
            }

            if (errorMessage.length > 0)
                rej(errorMessage);
            else
                res();
        }).
        then(() => {
            classRemove(errorDOM, 'form__error--show');
            document.getElementById('form').submit();
        }).
        catch((message) => {
            classAdd(errorDOM, 'form__error--show');
            errorDOM.innerText = message;
        });
    });
}
catch (err) {
    console.error(err);
}
