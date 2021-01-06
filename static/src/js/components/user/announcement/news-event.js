import ValidateUtils from 'models/common/utils/validate.js';
import {classAdd, classRemove} from 'static/src/js/utils/style.js';

export default class NewsEvent {
    constructor (opt) {
        opt = opt||{};

        if(
            !ValidateUtils.isDomElement(opt.formDOM)
        )
            throw new TypeError('invalid arguments');

        const imageQuerySelector = modifier => `.form__image > .image__label > .label__${ modifier }`
        this.DOM = {
            title: opt.formDOM.querySelector('.form__input--title'),
            url:   opt.formDOM.querySelector('.form__input--url'),
            submit: opt.formDOM.querySelector('.form__submit'),
            image: {
                label: opt.formDOM.querySelector('.form__image > .image__label'),
                preview: opt.formDOM.querySelector(imageQuerySelector('preview')),
                upload: opt.formDOM.querySelector(imageQuerySelector('upload')),
                comment: opt.formDOM.querySelector(imageQuerySelector('comment')),
                file: opt.formDOM.querySelector('.form__image > .image__upload')
            }
        }
    }

    subscribeImage() {
        this.DOM.image.file.addEventListener('change', (element)=>{
            const reader = new FileReader();

            reader.onload = (e) => {
                classAdd(this.DOM.image.comment, 'label__comment--hidden');
                classAdd(this.DOM.image.upload, 'label__upload--hidden');
                classAdd(this.DOM.image.label, 'image__label--preview');
                classRemove(this.DOM.image.preview, 'label__preview--hidden');
                this.DOM.image.preview.src = e.target.result;
            }

            reader.readAsDataURL(element.target.files[0]);
        })
    }

    exec() {
        this.subscribeImage();
    }
}