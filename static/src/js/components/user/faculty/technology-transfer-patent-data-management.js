import DefaultDataManagement from 'static/src/js/components/user/faculty/default-data-management.js';
import LanguageUtils from 'models/common/utils/language.js';

export default class TechnologyTransferPatentDataManagement extends DefaultDataManagement {
    subscribePatchButton ( element ) {
        Promise.all( LanguageUtils.supportedLanguageId.map( languageId => this.fetchData( languageId ) ) )
        .then( ( data ) => {
            this.status.itemId = element.target.getAttribute( 'data-id' );
            this.status.patchButton = element.target;

            const tableData = data.map( ( i18nData ) => {
                const dict = {};
                i18nData.technologyTransfer.forEach( ( row ) => {
                    row.technologyTransferPatent.forEach( ( patentRow ) => {
                        dict[ patentRow.technologyTransferPatentId ] = patentRow;
                    } );
                } );
                return dict;
            } );

            return tableData;
        } )
        .then( ( data ) => {
            const itemId = element.target.getAttribute( 'data-id' );
            this.showPatchForm( LanguageUtils.supportedLanguageId.map( languageId => data[ languageId ][ itemId ] ) );
        } );
    }

    subscribeDeleteButton ( e ) {
        this.fetchData( this.config.languageId )
        .then( ( data ) => {
            this.status.itemId = e.target.getAttribute( 'data-id' );
            data.technologyTransfer.forEach( ( row ) => {
                row.technologyTransferPatent.forEach( ( patentRow ) => {
                    if ( patentRow.technologyTransferPatentId === Number( e.target.getAttribute( 'data-id' ) ) )
                        this.DOM.delete.preview.innerHTML = this.deletePreview( patentRow );
                } );
            } );
        } )
        .then( () => {
            this.showDeleteForm();
        } );
    }

    subscribePostButton ( e ) {
        const parentId = e.target.getAttribute( 'data-id' );
        const hiddenInput = this.DOM.post.form.querySelector( 'input[name="technologyTransferId"]' );
        hiddenInput.value = parentId;
        this.showPostForm();
    }
}
