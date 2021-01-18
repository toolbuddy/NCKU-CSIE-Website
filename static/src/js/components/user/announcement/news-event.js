import ValidateUtils from 'models/common/utils/validate.js';
import {host} from 'settings/server/config.js';
import roleUtils from 'models/auth/utils/role.js';
import {classAdd, classRemove} from 'static/src/js/utils/style.js';
import errorMessageUtils from 'models/user/utils/error-message.js';
import newsUtils from 'models/announcement/utils/news.js';

export default class NewsEvent {
    constructor (opt) {
        opt = opt || {};

        if (
            !ValidateUtils.isDomElement(opt.formDOM)
        )
            throw new TypeError('invalid arguments');

        const imageQuerySelector = modifier => `.form__image > .image__label > .label__${modifier}`;
        this.DOM = {
            title: opt.formDOM.querySelector('.form__input--title'),
            url: opt.formDOM.querySelector('.form__input--url'),
            submit: opt.formDOM.querySelector('.form__submit'),
            errorMessage: opt.formDOM.querySelector('.form__error-message'),
            image: {
                label: opt.formDOM.querySelector('.form__image > .image__label'),
                preview: opt.formDOM.querySelector(imageQuerySelector('preview')),
                upload: opt.formDOM.querySelector(imageQuerySelector('upload')),
                comment: opt.formDOM.querySelector(imageQuerySelector('comment')),
                file: opt.formDOM.querySelector('.form__image > .image__upload'),
                uploadComment: opt.formDOM.querySelector('.form__image-comment'),
            },
        };

        this.config = {
            languageId: opt.languageId,
            method: opt.method,
            newsId: (opt.method === 'post') ? -1 : opt.newsId,
        };

        this.state = {
            image: null,
        };
    }

    subscribeImage () {
        this.DOM.image.file.addEventListener('change', (element) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                classAdd(this.DOM.image.comment, 'label__comment--hidden');
                classAdd(this.DOM.image.upload, 'label__upload--hidden');
                classRemove(this.DOM.image.preview, 'label__preview--hidden');
                classRemove(this.DOM.image.uploadComment, 'form__image-comment--hidden');
                this.DOM.image.preview.src = e.target.result;
                this.state.image = element.target.files[0];
            };

            reader.readAsDataURL(element.target.files[0]);
        });
    }

    subscribeSubmit () {
        this.DOM.submit.addEventListener('click', async (e) => {
            e.preventDefault();

            const isValid = await this.dataValidation();

            if (isValid) {
                const formData = new FormData();
                formData.append('newsId', this.config.newsId);
                formData.append('author', this.config.userId);
                formData.append('title', this.DOM.title.value);
                formData.append('url', this.DOM.url.value);
                formData.append('image', this.state.image);

                if (this.config.method === 'post') {
                    fetch(`${host}/user/news`, {
                        method: 'POST',
                        body: formData,
                    });
                }
                else {
                    fetch(`${host}/user/news`, {
                        method: 'PUT',
                        body: formData,
                    });
                }
            }
        });
    }

    dataValidation () {
        const isValid = new Promise((res) => {
            let errorMessage = '';
            this.DOM.errorMessage.innerHTML = '';
            if (this.config.method === 'post') {
                [this.DOM.title, this.DOM.url, this.DOM.image.file].forEach((DOM) => {
                    if (DOM.validity.valueMissing) {
                        const column = newsUtils.getValueByOption({
                            option: DOM.getAttribute('name'),
                            languageId: this.config.languageId,
                        });
                        const error = errorMessageUtils.getValueByOption({
                            option: 'valueMissing',
                            languageId: this.config.languageId,
                        });

                        errorMessage = `${column}${error}`;
                    }
                });
            }
            if (this.config.method === 'update') {
                [this.DOM.title, this.DOM.url].forEach((DOM) => {
                    if (DOM.validity.valueMissing) {
                        const column = newsUtils.getValueByOption({
                            option: DOM.getAttribute('name'),
                            languageId: this.config.languageId,
                        });
                        const error = errorMessageUtils.getValueByOption({
                            option: 'valueMissing',
                            languageId: this.config.languageId,
                        });

                        errorMessage = `${column}${error}`;
                    }
                });
            }
            res(errorMessage);
        })
        .then((errorMessage) => {
            this.DOM.errorMessage.innerHTML = errorMessage;
            if (errorMessage === '')
                return true;

            return false;
        });

        return isValid;
    }

    exec () {
        fetch(`${host}/user/id`, {
            credentials: 'include',
            method: 'get',
        })
        .then(res => res.json())
        .then((res) => {
            if (res.role === roleUtils.getIdByOption('staff'))
                this.config.userId = res.roleId;
            else
                this.config.userId = -1;

            if (this.config.method === 'update')
                classRemove(this.DOM.image.uploadComment, 'form__image-comment--hidden');
        });
        this.subscribeImage();
        this.subscribeSubmit();
    }
}
