import BaseDataManagement from 'static/src/js/components/user/faculty/base-data-management.js';

export default class AwardDataManagement extends BaseDataManagement {
    getPatchButton () {
        this.config.test = 2;
    }
}
