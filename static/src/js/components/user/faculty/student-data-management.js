import DefaultDataManagement from 'static/src/js/components/user/faculty/default-data-management.js';
import LanguageUtils from 'models/common/utils/language.js';

export default class StudentDataManagement extends DefaultDataManagement {
    subscribePatchButton (element) {
        Promise.all(LanguageUtils.supportedLanguageId.map(languageId => this.fetchData(languageId))).
        then((data) => {
            this.status.itemId = Number(element.target.getAttribute('data-id'));
            this.status.patchButton = element.target;

            const tableData = data.map((i18nData) => {
                const dict = {};
                i18nData.studentAward.forEach((row) => {
                    row.student.forEach((studentRow) => {
                        dict[studentRow.studentId] = studentRow;
                    });
                });
                return dict;
            });

            return tableData;
        }).
        then((data) => {
            const itemId = element.target.getAttribute('data-id');
            this.showPatchForm(LanguageUtils.supportedLanguageId.map(languageId => data[languageId][itemId]));
        });
    }

    subscribeDeleteButton (e) {
        this.fetchData(this.config.languageId).
        then((data) => {
            this.status.itemId = Number(e.target.getAttribute('data-id'));
            data.studentAward.forEach((row) => {
                row.student.forEach((studentRow) => {
                    if (studentRow.studentId === Number(e.target.getAttribute('data-id')))
                        this.DOM.delete.preview.innerHTML = this.deletePreview(studentRow);
                });
            });
        }).
        then(() => {
            this.showDeleteForm();
        });
    }

    subscribePostButton (e) {
        const parentId = e.target.getAttribute('data-id');
        const hiddenInput = this.DOM.post.form.querySelector('input[name="studentAwardId"]');
        hiddenInput.value = parentId;
        this.showPostForm();
    }
}
