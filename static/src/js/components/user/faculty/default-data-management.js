import ValidateUtils from 'models/common/utils/validate.js';
import {classAdd, classRemove} from 'static/src/js/utils/style.js';
import LanguageUtils from 'models/common/utils/language.js';
import errorMessageUtils from 'models/user/utils/error-message.js';
import {host} from 'settings/server/config.js';

export default class DefaultDataManagement {
    constructor (opt) {
        opt = opt || {};

        if (
            !ValidateUtils.isDomElement(opt.bodyFormDOM) ||
            !ValidateUtils.isDomElement(opt.refreshDOM) ||
            !ValidateUtils.isDomElement(opt.loadingDOM) ||
            !ValidateUtils.isDomElement(opt.cardsDOM) ||
            !LanguageUtils.isSupportedLanguageId(opt.languageId) ||
            !ValidateUtils.isValidString(opt.table)
        )
            throw new TypeError('invalid arguments');

        this.config = {
            languageId: opt.languageId,
            table: opt.table,
            dbTable: opt.dbTable,
            idColumn: opt.idColumn,
        };

        this.status = {
            itemId: -1,
            patchButton: null,
        };

        this.deletePreview = opt.deletePreview;
        this.columnUnits = opt.columnUnits;

        const checkButtonQuerySelector = method => ` #form-${opt.table}-${method} > .form-input__button > .button__check`;
        const cancelButtonQuerySelector = method => ` #form-${opt.table}-${method} > .form-input__button > .button__cancel`;
        const errorMessageQuerySelector = method => ` #form-${opt.table}-${method} > .form-input__content > .content__error-message`;
        const inputQuerySelector = method => `input[ method = ${method}][table = ${opt.table}]`;
        const formQuerySelector = method => `#form-${opt.table}-${method}`;

        this.DOM = {
            patch: {
                checkButton: opt.bodyFormDOM.querySelector(checkButtonQuerySelector('patch')),
                cancelButton: opt.bodyFormDOM.querySelector(cancelButtonQuerySelector('patch')),
                errorMessage: opt.bodyFormDOM.querySelector(errorMessageQuerySelector('patch')),
                input: opt.bodyFormDOM.querySelectorAll(inputQuerySelector('patch')),
                form: opt.bodyFormDOM.querySelector(formQuerySelector('patch')),
            },
            post: {
                checkButton: opt.bodyFormDOM.querySelector(checkButtonQuerySelector('post')),
                cancelButton: opt.bodyFormDOM.querySelector(cancelButtonQuerySelector('post')),
                errorMessage: opt.bodyFormDOM.querySelector(errorMessageQuerySelector('post')),
                input: opt.bodyFormDOM.querySelectorAll(inputQuerySelector('post')),
                form: opt.bodyFormDOM.querySelector(formQuerySelector('post')),
            },
            delete: {
                checkButton: opt.bodyFormDOM.querySelector(checkButtonQuerySelector('delete')),
                cancelButton: opt.bodyFormDOM.querySelector(cancelButtonQuerySelector('delete')),
                preview: opt.bodyFormDOM.querySelector(`#form-${opt.table}-delete > .form-input__content > .content__delete-preview`),
                form: opt.bodyFormDOM.querySelector(formQuerySelector('delete')),
            },
            formBackground: opt.bodyFormDOM,
            cards: {
                cards: opt.cardsDOM,
            },
            postButtons: Array.from(opt.postButtonsDOM).map((node) => {
                const buttonId = node.getAttribute('data-id');
                if (buttonId === null)
                    throw new Error('DOM attribute `data-id` not found.');
                return {
                    node,
                    id: Number(buttonId),
                };
            }),
            patchButtons: Array.from(opt.patchButtonsDOM).map((node) => {
                const buttonId = node.getAttribute('data-id');
                if (buttonId === null)
                    throw new Error('DOM attribute `data-id` not found.');
                return {
                    node,
                    id: Number(buttonId),
                };
            }),
            deleteButtons: Array.from(opt.deleteButtonsDOM).map((node) => {
                const buttonId = node.getAttribute('data-id');
                if (buttonId === null)
                    throw new Error('DOM attribute `data-id` not found.');
                return {
                    node,
                    id: Number(buttonId),
                };
            }),
            refresh: opt.refreshDOM,
            loading: opt.loadingDOM,
        };
    }

    renderLoading () {
        classAdd(this.DOM.refresh, 'refresh--hidden');
        classRemove(this.DOM.loading, 'loading--hidden');
        classAdd(this.DOM.cards.cards, 'cards--hidden');
    }

    renderSuccess () {
        classAdd(this.DOM.refresh, 'refresh--hidden');
        classAdd(this.DOM.loading, 'loading--hidden');
        classRemove(this.DOM.cards.cards, 'cards--hidden');
    }

    subscribeCancelButton () {
        const methods = [
            'post',
            'patch',
            'delete',
        ];
        methods.forEach((method) => {
            this.DOM[method].cancelButton.addEventListener('click', (element) => {
                element.preventDefault();
                this.hideForm();
            });
        });
    }

    subscribePostButton (element) {
        element.target.setAttribute('post', 'post');
        this.showPostForm();
    }

    subscribePostCheckButton () {
        this.DOM.post.checkButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const isValid = await this.dataValidation('post');

            if (isValid) {
                const data = await this.formatFormData('post');
                e.target.disabled = true;
                fetch(`${host}/user/faculty/profile`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        dbTable: this.config.dbTable,
                        data,
                    }),
                }).
                then((res) => {
                    this.hideForm();
                    this.renderLoading();
                    return res;
                }).
                then((res) => {
                    this.renderSuccess();
                    e.target.disabled = false;
                    if (res.ok)
                        window.location.reload();
                });
            }
        });
    }

    subscribePatchButton (element) {
        Promise.all(LanguageUtils.supportedLanguageId.map(languageId => this.fetchData(languageId))).
        then((data) => {
            this.status.itemId = Number(element.target.getAttribute('data-id'));

            const itemData = data.map(dbData => dbData[this.config.dbTable].filter(item => item[this.config.idColumn] === this.status.itemId)[0]);
            this.showPatchForm(itemData);
        });
    }

    subscribePatchCheckButton () {
        this.DOM.patch.checkButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const isValid = await this.dataValidation('patch');

            if (isValid) {
                const {item, i18n} = await this.formatFormData('patch');
                e.target.disabled = true;

                fetch(`${host}/user/faculty/profile`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        dbTable: this.config.dbTable,
                        profileId: this.config.profileId,
                        dbTableItemId: this.status.itemId,
                        item,
                        i18n,
                    }),
                }).
                then((res) => {
                    this.hideForm();
                    this.renderLoading();

                    return res;
                }).
                then((res) => {
                    this.renderSuccess();
                    e.target.disabled = false;
                    if (res.ok)
                        window.location.reload();
                });
            }
        });
    }

    subscribeDeleteButton (e) {
        this.fetchData(this.config.languageId).
        then((data) => {
            this.status.itemId = Number(e.target.getAttribute('data-id'));
            const rowData = data[this.config.dbTable].find(item => item[this.config.idColumn] === Number(e.target.getAttribute('data-id')));

            this.DOM.delete.preview.innerHTML = this.deletePreview(rowData);
        }).
        then(() => {
            this.showDeleteForm();
        });
    }

    subscribeDeleteCheckButton () {
        this.DOM.delete.checkButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.DOM.delete.checkButton.disabled = true;
            fetch(`${host}/user/faculty/profile`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    profileId: this.config.profileId,
                    dbTable: this.config.dbTable,
                    dbTableItemId: this.status.itemId,
                }),
            }).
            then(() => {
                this.hideForm();
                this.renderLoading();
            }).
            then(() => {
                this.renderSuccess();
                this.DOM.delete.checkButton.disabled = false;
                window.location.reload();
            });
        });
    }

    // eslint-disable-next-line
    async fetchData ( languageId ) {
        try {
            const res = await fetch(`${host}/user/profileWithId?languageId=${languageId}`);
            if (!res.ok)
                throw new Error('No faculty found');

            return res.json();
        }
        catch (err) {
            throw err;
        }
    }

    setPatchFormValue (data) {
        Array.from(this.DOM.patch.input).forEach((element) => {
            const columnName = element.getAttribute('column');
            const languageId = element.getAttribute('languageId');
            element.value = data[languageId][columnName];
        });
    }

    showPatchForm (data) {
        Array.from(this.DOM.patch.form.elements).forEach((element) => {
            const columnName = element.getAttribute('column');
            const languageId = element.getAttribute('languageId');
            if (element.getAttribute('input-pattern') === 'checkbox')
                element.checked = data[this.config.languageId][columnName];
            else if (element.getAttribute('input-pattern') === 'dropdown')
                element.value = data[this.config.languageId][columnName];
            else if (element.tagName === 'INPUT')
                element.value = data[languageId][columnName];
        });
        this.DOM.patch.errorMessage.innerText = '';
        classAdd(this.DOM.formBackground, 'form--active');
        classAdd(this.DOM.patch.form, 'form-input--active');
    }

    showPostForm () {
        Array.from(this.DOM.post.input).forEach((element) => {
            if (element.type !== 'hidden')
                element.value = '';
        });
        classAdd(this.DOM.formBackground, 'form--active');
        classAdd(this.DOM.post.form, 'form-input--active');
    }

    showDeleteForm () {
        classAdd(this.DOM.formBackground, 'form--active');
        classAdd(this.DOM.delete.form, 'form-input--active');
    }

    hideForm () {
        classRemove(this.DOM.formBackground, 'form--active');
        classRemove(this.DOM.patch.form, 'form-input--active');
        classRemove(this.DOM.post.form, 'form-input--active');
        classRemove(this.DOM.delete.form, 'form-input--active');
    }

    getErrorMessage (opt) {
        const isI18n = (opt.element.getAttribute('input-pattern') === 'i18n');
        const languageId = Number(opt.element.getAttribute('languageid'));

        const column = this.columnUnits.getValueByOption({
            option: opt.element.getAttribute('column'),
            languageId: this.config.languageId,
        });
        const error = errorMessageUtils.getValueByOption({
            option: opt.errorType,
            languageId: this.config.languageId,
        });
        const language = (isI18n) ? `(${LanguageUtils.getLanguageById(languageId)})` : '';
        return `${column}${language}${error}`;
    }

    async dataValidation (method) {
        const isValid = new Promise((res) => {
            let errorMessage = '';
            Array.from(this.DOM[method].input).forEach((element) => {
                if (element.validity.typeMismatch || element.validity.patternMismatch) {
                    errorMessage = this.getErrorMessage({
                        errorType: 'typeMismatch',
                        element,
                    });
                    element.focus();
                }
                else if (element.validity.rangeUnderflow || element.validity.rangeOverflow) {
                    errorMessage = this.getErrorMessage({
                        errorType: 'rangeUnderflow',
                        element,
                    });
                    element.focus();
                }
                else if (element.validity.valueMissing) {
                    errorMessage = this.getErrorMessage({
                        errorType: 'valueMissing',
                        element,
                    });
                    element.focus();
                }
            });
            res(errorMessage);
        }).
        then((errorMessage) => {
            if (errorMessage === '')
                return true;

            this.DOM[method].errorMessage.innerText = errorMessage;
            return false;
        });

        return isValid;
    }

    async formatFormData (method) {
        const item = {};
        let i18n = LanguageUtils.supportedLanguageId.map(id => ({language: id}));

        Array.from(this.DOM[method].form.elements).forEach((element) => {
            if (element.getAttribute('input-pattern') === 'i18n')
                i18n[element.getAttribute('languageid')][element.getAttribute('column')] = element.value;
            else if (element.getAttribute('input-pattern') === 'checkbox')
                item[element.name] = element.checked;
            else if (element.getAttribute('datatype') === 'int')
                item[element.name] = Number(element.value);
            else if (element.tagName === 'INPUT')
                item[element.name] = (element.value.length > 0) ? element.value : null;
        });

        if (Object.keys(i18n[0]).length === 1 && i18n[0].constructor === Object)
            i18n = [];

        if (method === 'post') {
            const data = item;
            data[`${this.config.dbTable}I18n`] = (Object.keys(i18n).length === 0) ? null : i18n;
            data.profileId = Number(this.config.profileId);

            return data;
        }

        if (method === 'patch')
            return ({item, i18n});
    }

    async exec () {
        this.renderLoading();

        fetch(`${host}/user/id`, {
            credentials: 'include',
            method: 'get',
        }).
        then(res => res.json()).
        then((res) => {
            this.config.profileId = res.roleId;
        }).
        then(() => {
            this.renderSuccess();
            this.subscribeCancelButton();
            this.subscribePostCheckButton();
            this.subscribeDeleteCheckButton();
            this.subscribePatchCheckButton();
            this.DOM.deleteButtons.forEach((element) => {
                element.node.addEventListener('click', (node) => {
                    this.subscribeDeleteButton(node);
                });
            });
            this.DOM.postButtons.forEach((element) => {
                element.node.addEventListener('click', (node) => {
                    this.subscribePostButton(node);
                });
            });
            this.DOM.patchButtons.forEach((element) => {
                element.node.addEventListener('click', (node) => {
                    this.subscribePatchButton(node);
                });
            });
        });
    }
}
