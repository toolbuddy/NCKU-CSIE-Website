import assert from 'assert';

import PublicationCategoryUtils from 'models/faculty/utils/publication-category.js';
import LanguageUtils from 'settings/language/utils.js';

describe('models/faculty/utils/publication-category.js', () => {
    let correctSampleTypeA = {
        typeName: 'journal',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 0,
    };
    let correctSampleTypeB = {
        typeName: 'workshop',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 2,
    };
    let correctSampleTypeC = {
        typeName: '會議',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 1,
    };
    let correctSampleTypeD = {
        typeName: '期刊',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 0,
    };
    let correctSampleTypeE = {
        typeName: '工作坊',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 2,
    };

    let wrongSampleTypeA = {
        typeName: 'jjjournal',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeB = {
        typeName: 'journal',
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeC = {
        typeName: 'Journal',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeD = {
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeE = {
        typeName: 'journal',
    };
    let wrongSampleTypeF = {
        typeName: 'journal',
        languageId: 10000
    };
    let wrongSampleTypeG = {};

    context('defaultType', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( PublicationCategoryUtils.defaultType( LanguageUtils.defaultLanguageId ) ), typeof(String()));
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { PublicationCategoryUtils.defaultType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { PublicationCategoryUtils.defaultType( {} ); }, TypeError);
            assert.throws( () => { PublicationCategoryUtils.defaultType( undefined ); }, TypeError);
            assert.throws( () => { PublicationCategoryUtils.defaultType( null ); }, TypeError);
            assert.throws( () => { PublicationCategoryUtils.defaultType( Boolean() ); }, TypeError);
            assert.throws( () => { PublicationCategoryUtils.defaultType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert.equal( PublicationCategoryUtils.defaultType( LanguageUtils.getLanguageId('zh-TW').toString() ), '期刊' );
            assert.equal( PublicationCategoryUtils.defaultType( LanguageUtils.getLanguageId('en-US').toString() ), 'journal' );
            assert.equal( PublicationCategoryUtils.defaultType( LanguageUtils.getLanguageId('zh-TW') ), '期刊' );
            assert.equal( PublicationCategoryUtils.defaultType( LanguageUtils.getLanguageId('en-US') ), 'journal' );
        })
    });

    context('defaultTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof(PublicationCategoryUtils.defaultTypeId), typeof(Number()));
        });
        it('should success', () => {
            assert.equal( PublicationCategoryUtils.defaultTypeId, 0);
        });
    });

    context('isSupportedType', () => {
        it('should return true when giving a correct object', () => {
            assert.equal( PublicationCategoryUtils.isSupportedType(correctSampleTypeA), true);
            assert.equal( PublicationCategoryUtils.isSupportedType(correctSampleTypeB), true);
            assert.equal( PublicationCategoryUtils.isSupportedType(correctSampleTypeC), true);
            assert.equal( PublicationCategoryUtils.isSupportedType(correctSampleTypeD), true);
            assert.equal( PublicationCategoryUtils.isSupportedType(correctSampleTypeE), true);
        });
        it('should return false or throw an error when giving an incorrect object', () => {
            assert.equal( PublicationCategoryUtils.isSupportedType(wrongSampleTypeA), false);
            assert.equal( PublicationCategoryUtils.isSupportedType(wrongSampleTypeB), false);
            assert.equal( PublicationCategoryUtils.isSupportedType(wrongSampleTypeC), false);
            assert.equal( PublicationCategoryUtils.isSupportedType(wrongSampleTypeD), false);
            assert.throws( () => { PublicationCategoryUtils.isSupportedType(wrongSampleTypeE); }, TypeError);
            assert.throws( () => { PublicationCategoryUtils.isSupportedType(wrongSampleTypeF); }, TypeError);
            assert.equal( PublicationCategoryUtils.isSupportedType(wrongSampleTypeG), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( PublicationCategoryUtils.isSupportedType(String()), false );
            assert.equal( PublicationCategoryUtils.isSupportedType(Boolean()), false );
            assert.equal( PublicationCategoryUtils.isSupportedType(Number()), false );
            assert.equal( PublicationCategoryUtils.isSupportedType(Symbol()), false );
            assert.throws( () => { PublicationCategoryUtils.isSupportedType(undefined); }, TypeError );
            assert.throws( () => { PublicationCategoryUtils.isSupportedType(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( PublicationCategoryUtils.isSupportedType( correctSampleTypeA )), typeof( Boolean() ) );
        });
    });

    context('isSupportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( PublicationCategoryUtils.isSupportedTypeId( LanguageUtils.defaultTypeId )), typeof(Boolean()));
        });
        it('should return true when giving a correct argument', () => {
            assert.equal( PublicationCategoryUtils.isSupportedTypeId( 0 ), true);
            assert.equal( PublicationCategoryUtils.isSupportedTypeId( 1 ), true);
        });
        it('should return false when giving an invalid argument', () => {
            assert.equal( PublicationCategoryUtils.isSupportedTypeId( -1 ), false);
            assert.equal( PublicationCategoryUtils.isSupportedTypeId( 10000 ), false);
            assert.equal( PublicationCategoryUtils.isSupportedTypeId( '1' ), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( PublicationCategoryUtils.isSupportedTypeId(Symbol()), false);
            assert.equal( PublicationCategoryUtils.isSupportedTypeId(undefined), false);
            assert.equal( PublicationCategoryUtils.isSupportedTypeId(null), false);
            assert.equal( PublicationCategoryUtils.isSupportedTypeId(Boolean()), false);
            assert.equal( PublicationCategoryUtils.isSupportedTypeId(String()), false);
        });
    });

    context('supportedType', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( PublicationCategoryUtils.supportedType( LanguageUtils.defaultLanguageId ) ) );
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { PublicationCategoryUtils.supportedType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { PublicationCategoryUtils.supportedType( {} ); }, TypeError);
            assert.throws( () => { PublicationCategoryUtils.supportedType( undefined ); }, TypeError);
            assert.throws( () => { PublicationCategoryUtils.supportedType( null ); }, TypeError);
            assert.throws( () => { PublicationCategoryUtils.supportedType( Boolean() ); }, TypeError);
            assert.throws( () => { PublicationCategoryUtils.supportedType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert( PublicationCategoryUtils.supportedType( LanguageUtils.getLanguageId('zh-TW').toString() ).includes('會議') );
            assert( PublicationCategoryUtils.supportedType( LanguageUtils.getLanguageId('en-US').toString() ).includes('conference') );
            assert( PublicationCategoryUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).includes('會議') );
            assert( PublicationCategoryUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).includes('conference') );
            assert.equal( 
                PublicationCategoryUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).length,
                PublicationCategoryUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).length
            );
        })
    });

    context('supportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( PublicationCategoryUtils.supportedTypeId ) );
            assert( PublicationCategoryUtils.supportedTypeId.every( (id) => { return typeof( id ) === 'number'; } ) );
        });
        it('should success', () => {
            assert.equal( PublicationCategoryUtils.supportedTypeId.length, PublicationCategoryUtils.supportedType( LanguageUtils.defaultLanguageId ).length);
        });
    });

    context('getTypeId', () => {
        it('should success', () => {
            assert.equal( PublicationCategoryUtils.getTypeId(correctSampleTypeA), correctSampleTypeA.typeId);
            assert.equal( PublicationCategoryUtils.getTypeId(correctSampleTypeB), correctSampleTypeB.typeId);
            assert.equal( PublicationCategoryUtils.getTypeId(correctSampleTypeC), correctSampleTypeC.typeId);
            assert.equal( PublicationCategoryUtils.getTypeId(correctSampleTypeD), correctSampleTypeD.typeId);
            assert.equal( PublicationCategoryUtils.getTypeId(correctSampleTypeE), correctSampleTypeE.typeId);
        });
        it('should throw an error when giving an incorrect object', () => {
            assert.throws( () => { PublicationCategoryUtils.getTypeId(wrongSampleTypeA); }, Error);
            assert.throws( () => { PublicationCategoryUtils.getTypeId(wrongSampleTypeB); }, Error);
            assert.throws( () => { PublicationCategoryUtils.getTypeId(wrongSampleTypeC); }, Error);
            assert.throws( () => { PublicationCategoryUtils.getTypeId(wrongSampleTypeD); }, Error);
            assert.throws( () => { PublicationCategoryUtils.getTypeId(wrongSampleTypeE); }, Error);
            assert.throws( () => { PublicationCategoryUtils.getTypeId(wrongSampleTypeF); }, Error);
            assert.throws( () => { PublicationCategoryUtils.getTypeId(wrongSampleTypeG); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { PublicationCategoryUtils.getTypeId(String()); }, TypeError );
            assert.throws( () => { PublicationCategoryUtils.getTypeId(Number()); }, TypeError );
            assert.throws( () => { PublicationCategoryUtils.getTypeId(Boolean()); }, TypeError );
            assert.throws( () => { PublicationCategoryUtils.getTypeId(Symbol()); }, TypeError );
            assert.throws( () => { PublicationCategoryUtils.getTypeId(undefined); }, TypeError );
            assert.throws( () => { PublicationCategoryUtils.getTypeId(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( PublicationCategoryUtils.getTypeId( correctSampleTypeA )), typeof( Number() ) );
        });
    });

    context('getTypeById', () => {
        it('should success', () => {
            assert.equal( PublicationCategoryUtils.getTypeById(correctSampleTypeA), correctSampleTypeA.typeName);
            assert.equal( PublicationCategoryUtils.getTypeById(correctSampleTypeB), correctSampleTypeB.typeName);
            assert.equal( PublicationCategoryUtils.getTypeById(correctSampleTypeC), correctSampleTypeC.typeName);
            assert.equal( PublicationCategoryUtils.getTypeById(correctSampleTypeD), correctSampleTypeD.typeName);
            assert.equal( PublicationCategoryUtils.getTypeById(correctSampleTypeE), correctSampleTypeE.typeName);
        });
        it('should throw an error when giving an incorrect object', () => {
            let wrongSampleTypeH = {
                typeId: 'ABC',
                languageId: 0,
            };
            let wrongSampleTypeI = {
                typeId: 0,
                languageId: 'ABC',
            };
            let wrongSampleTypeJ = {
                typeId: 0,
            };
            let wrongSampleTypeK = {
                languageId: 0,
            };
            let wrongSampleTypeL = {};
            let wrongSampleTypeM = {
                typeId: -1,
                languageId: 0,
            };
            let wrongSampleTypeN = {
                typeId: 0,
                languageId: -1,
            };
            assert.throws( () => { PublicationCategoryUtils.getTypeById(wrongSampleTypeH); }, Error);
            assert.throws( () => { PublicationCategoryUtils.getTypeById(wrongSampleTypeI); }, Error);
            assert.throws( () => { PublicationCategoryUtils.getTypeById(wrongSampleTypeJ); }, Error);
            assert.throws( () => { PublicationCategoryUtils.getTypeById(wrongSampleTypeK); }, Error);
            assert.throws( () => { PublicationCategoryUtils.getTypeById(wrongSampleTypeL); }, Error);
            assert.throws( () => { PublicationCategoryUtils.getTypeById(wrongSampleTypeM); }, Error);
            assert.throws( () => { PublicationCategoryUtils.getTypeById(wrongSampleTypeN); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { PublicationCategoryUtils.getTypeById(String()); }, TypeError );
            assert.throws( () => { PublicationCategoryUtils.getTypeById(Number()); }, TypeError );
            assert.throws( () => { PublicationCategoryUtils.getTypeById(Boolean()); }, TypeError );
            assert.throws( () => { PublicationCategoryUtils.getTypeById(Symbol()); }, TypeError );
            assert.throws( () => { PublicationCategoryUtils.getTypeById(undefined); }, TypeError );
            assert.throws( () => { PublicationCategoryUtils.getTypeById(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( PublicationCategoryUtils.getTypeById( correctSampleTypeA )), typeof( String() ) );
        });
    });
});