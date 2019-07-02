export default class ModifyData {
    constructor ( page ) {
    }

    static getFromTitle ( page, type ) {
        const i18n = Object.freeze( {
            0: {
                profile: {
                    name:  'modify your name',
                    title: 'modify your title',
                },
            },
            1: {
                profile: {
                    name:         '變更您的名稱',
                    title:        '變更您的職稱',
                    office:       '變更您的辦公室位置',
                    lab_name:     '變更您的實驗室名稱',
                    lab_location: '變更您的實驗室位置',
                    lab_tel:      '變更您的實驗室電話',
                    lab_web:      '變更您的實驗室網站',
                    office_tel:   '變更您的聯絡電話',
                    email:        '變更您的Email',
                    fax:          '變更您的傳真位置',
                    personal_web: '變更您的個人網站',
                    specilty:     '變更您的專長領域',
                },
            },
        } );
        return i18n[ 1 ][ page ][ type ];
    }

    static getProfileInputSet ( type ) {
        const data = Object.freeze( {
            name: [
                {
                    nation:      'tw',
                    placeholder: 'ex. 王小明',
                },
                {
                    nation:      'us',
                    placeholder: 'ex. shiau-ming wang',
                },
            ],
            title: [
                {
                    nation:      'tw',
                    placeholder: 'ex. 教授',
                },
                {
                    nation:      'us',
                    placeholder: 'ex. professor',
                },
            ],
            office: [
                {
                    nation:      'tw',
                    placeholder: 'ex. 資訊新館12F 65C11',
                },
                {
                    nation:      'us',
                    placeholder: '',
                },
            ],
        } );
        return data[ type ];
    }

    initializeModifyFrom ( page, type ) {
        console.log( 'modify from' );
        const modifyParent = document.getElementsByClassName( 'insert' )[ 0 ];

        modifyParent.classList.remove( 'insert--hide' );

        const title = ModifyData.getFromTitle( page, type );
        modifyParent.getElementsByClassName( 'title__word' )[ 0 ].innerHTML = title;

        document.getElementsByClassName( 'button__item--cancel' )[ 0 ].addEventListener( 'click', () => {
            document.getElementsByClassName( 'insert' )[ 0 ].classList.add( 'insert--hide' );
        } );

        return new Promise( ( resolve ) => {
            const insertBlock = document.getElementsByClassName( 'insert__block' )[ 0 ];
            const childNode = insertBlock.getElementsByClassName( 'block__input' );
            for ( let i = childNode.length - 1; i >= 0; --i )
                insertBlock.removeChild( insertBlock.getElementsByClassName( 'block__input' )[ i ] );

            resolve( page, type );
        } );
    }

    setModifyFrom ( page, type ) {
        const data = ModifyData.getProfileInputSet( type );
        const parentNode = document.getElementsByClassName( 'insert__block' )[ 0 ];

        data.forEach( ( element, index ) => {
            const newNode = document.createElement( 'article' );
            newNode.classList.add( 'block__input' );
            if ( element.nation != undefined ) {
                const newImage = document.createElement( 'img' );
                newImage.src = `image/icon/${ element.nation }.png`;
                newImage.classList.add( 'input__flag' );
                newNode.appendChild( newImage );
            }

            const newInput = document.createElement( 'input' );
            newInput.classList.add( 'input__content' );
            newInput.placeholder = element.placeholder;
            newNode.appendChild( newInput );

            parentNode.insertBefore( newNode, parentNode.childNodes[ 1 + index ] );
        } );
    }
}
