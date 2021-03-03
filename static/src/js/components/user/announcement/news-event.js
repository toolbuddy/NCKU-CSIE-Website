import ValidateUtils from 'models/common/utils/validate.js';
import {host} from 'settings/server/config.js';
import roleUtils from 'models/auth/utils/role.js';
import {classRemove} from 'static/src/js/utils/style.js';
import errorMessageUtils from 'models/user/utils/error-message.js';
import newsUtils from 'models/announcement/utils/news.js';
import Cropper from 'cropperjs';

export default class NewsEvent {
    constructor (opt) {
        opt = opt || {};

        if (
            !ValidateUtils.isDomElement(opt.formDOM)
        )
            throw new TypeError('invalid arguments');

        this.DOM = {
            title: opt.formDOM.querySelector('.form__input--title'),
            url: opt.formDOM.querySelector('.form__input--url'),
            submit: opt.formDOM.querySelector('.form__button > .button__submit'),
            errorMessage: opt.formDOM.querySelector('.form__error-message'),
            image: {
                crop: opt.formDOM.querySelector('.form__image > .image__crop'),
                input: opt.formDOM.querySelector('.form__input--image'),
                preview: opt.formDOM.querySelector('.form__image'),
            },
        };

        this.config = {
            languageId: opt.languageId,
            method: opt.method,
            newsId: (opt.method === 'post') ? -1 : opt.newsId,
            imageSize: 1024 * 1000,
        };

        this.cropper = null;

        this.state = {
            image: null,
        };
    }

    subscribeImage () {
        this.DOM.image.input.addEventListener('change', (element) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (element.target.files[0].size <= this.config.imageSize) {
                    this.DOM.errorMessage.innerHTML = '';
                    classRemove(this.DOM.image.preview, 'form__image--hidden');
                    this.DOM.image.crop.src = e.target.result;
                    if (this.cropper === null)
                        this.subscribeCropper();
                    else
                        this.cropper.replace(e.target.result);
                }
                else
                    this.DOM.errorMessage.innerHTML = '圖片大小須小於 1MB';
            };

            reader.readAsDataURL(element.target.files[0]);
        });
    }

    subscribeCropper () {
        const image = this.DOM.image.crop;
        this.cropper = new Cropper(image, {
            aspectRatio: 20 / 9,
            dragMode: 'move',
            viewMode: 1,
        });
    }

    subscribeSubmit () {
        this.DOM.submit.addEventListener('click', async (e) => {
            e.preventDefault();
            const isValid = await this.dataValidation();

            if (isValid) {
                this.cropper.getCroppedCanvas().toBlob((blob) => {
                    const formData = new FormData();
                    formData.append('newsId', this.config.newsId);
                    formData.append('author', this.config.userId);
                    formData.append('title', this.DOM.title.value);
                    formData.append('url', this.DOM.url.value);
                    formData.append('image', blob);

                    fetch(`${host}/user/news`, {
                        method: (this.config.method === 'post') ? 'POST' : 'PUT',
                        body: formData,
                    })
                    .then((res) => {
                        if (res.ok)
                            location.href = `${host}/user/announcement/news-list?languageId=${this.config.languageId}`;
                    });
                });
            }
        });
    }

    dataValidation () {
        const isValid = new Promise((res) => {
            let errorMessage = '';
            this.DOM.errorMessage.innerHTML = '';

            if (this.cropper === null) {
                const column = newsUtils.getValueByOption({
                    option: 'image',
                    languageId: this.config.languageId,
                });
                const error = errorMessageUtils.getValueByOption({
                    option: 'valueMissing',
                    languageId: this.config.languageId,
                });

                errorMessage = `${column}${error}`;
            }

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

    async exec () {
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
        });

        if (this.config.method === 'update')
            await this.subscribeCropper();
        this.subscribeImage();
        this.subscribeSubmit();
    }
}
