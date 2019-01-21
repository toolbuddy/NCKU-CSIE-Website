import assert from 'assert';

import TagUtils from 'models/announcement/utils/tag.js';
import LanguageUtils from 'settings/language/utils.js';

describe('models/announcement/utils/tag.js', () => {
    let correctSampleTypeA = {
        typeName: 'faculty',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 0,
    };
    let correctSampleTypeB = {
        typeName: 'college',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 2,
    };
    let correctSampleTypeC = {
        typeName: '演講',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 5,
    };
    let correctSampleTypeD = {
        typeName: '徵人',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 13,
    };
    let correctSampleTypeE = {
        typeName: '教職人員',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 0,
    };

    let wrongSampleTypeA = {
        typeName: 'fffaculty',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeB = {
        typeName: 'faculty',
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeC = {
        typeName: 'Faculty',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeD = {
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeE = {
        typeName: 'fffaculty',
    };
    let wrongSampleTypeF = {
        typeName: 'faculty',
        languageId: 10000
    };
    let wrongSampleTypeG = {};

    context('defaultType', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( TagUtils.defaultType( LanguageUtils.defaultLanguageId ) ), typeof(String()));
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { TagUtils.defaultType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { TagUtils.defaultType( {} ); }, TypeError);
            assert.throws( () => { TagUtils.defaultType( undefined ); }, TypeError);
            assert.throws( () => { TagUtils.defaultType( null ); }, TypeError);
            assert.throws( () => { TagUtils.defaultType( Boolean() ); }, TypeError);
            assert.throws( () => { TagUtils.defaultType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert.equal( TagUtils.defaultType( LanguageUtils.getLanguageId('zh-TW').toString() ), '教職人員' );
            assert.equal( TagUtils.defaultType( LanguageUtils.getLanguageId('en-US').toString() ), 'faculty' );
            assert.equal( TagUtils.defaultType( LanguageUtils.getLanguageId('zh-TW') ), '教職人員' );
            assert.equal( TagUtils.defaultType( LanguageUtils.getLanguageId('en-US') ), 'faculty' );
        })
    });

    context('defaultTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof(TagUtils.defaultTypeId), typeof(Number()));
        });
        it('should success', () => {
            assert.equal( TagUtils.defaultTypeId, 0);
        });
    });

    context('isSupportedType', () => {
        it('should return true when giving a correct object', () => {
            assert.equal( TagUtils.isSupportedType(correctSampleTypeA), true);
            assert.equal( TagUtils.isSupportedType(correctSampleTypeB), true);
            assert.equal( TagUtils.isSupportedType(correctSampleTypeC), true);
            assert.equal( TagUtils.isSupportedType(correctSampleTypeD), true);
            assert.equal( TagUtils.isSupportedType(correctSampleTypeE), true);
        });
        it('should return false or throw an error when giving an incorrect object', () => {
            assert.equal( TagUtils.isSupportedType(wrongSampleTypeA), false);
            assert.equal( TagUtils.isSupportedType(wrongSampleTypeB), false);
            assert.equal( TagUtils.isSupportedType(wrongSampleTypeC), false);
            assert.equal( TagUtils.isSupportedType(wrongSampleTypeD), false);
            assert.throws( () => { TagUtils.isSupportedType(wrongSampleTypeE); }, TypeError);
            assert.throws( () => { TagUtils.isSupportedType(wrongSampleTypeF); }, TypeError);
            assert.equal( TagUtils.isSupportedType(wrongSampleTypeG), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( TagUtils.isSupportedType(String()), false );
            assert.equal( TagUtils.isSupportedType(Boolean()), false );
            assert.equal( TagUtils.isSupportedType(Number()), false );
            assert.equal( TagUtils.isSupportedType(Symbol()), false );
            assert.throws( () => { TagUtils.isSupportedType(undefined); }, TypeError );
            assert.throws( () => { TagUtils.isSupportedType(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( TagUtils.isSupportedType( correctSampleTypeA )), typeof( Boolean() ) );
        });
    });

    context('isSupportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( TagUtils.isSupportedTypeId( LanguageUtils.defaultTypeId )), typeof(Boolean()));
        });
        it('should return true when giving a correct argument', () => {
            assert.equal( TagUtils.isSupportedTypeId( 0 ), true);
            assert.equal( TagUtils.isSupportedTypeId( 1 ), true);
        });
        it('should return false when giving an invalid argument', () => {
            assert.equal( TagUtils.isSupportedTypeId( -1 ), false);
            assert.equal( TagUtils.isSupportedTypeId( 10000 ), false);
            assert.equal( TagUtils.isSupportedTypeId( '1' ), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( TagUtils.isSupportedTypeId(Symbol()), false);
            assert.equal( TagUtils.isSupportedTypeId(undefined), false);
            assert.equal( TagUtils.isSupportedTypeId(null), false);
            assert.equal( TagUtils.isSupportedTypeId(Boolean()), false);
            assert.equal( TagUtils.isSupportedTypeId(String()), false);
        });
    });

    context('supportedType', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( TagUtils.supportedType( LanguageUtils.defaultLanguageId ) ) );
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { TagUtils.supportedType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { TagUtils.supportedType( {} ); }, TypeError);
            assert.throws( () => { TagUtils.supportedType( undefined ); }, TypeError);
            assert.throws( () => { TagUtils.supportedType( null ); }, TypeError);
            assert.throws( () => { TagUtils.supportedType( Boolean() ); }, TypeError);
            assert.throws( () => { TagUtils.supportedType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert( TagUtils.supportedType( LanguageUtils.getLanguageId('zh-TW').toString() ).includes('教職人員') );
            assert( TagUtils.supportedType( LanguageUtils.getLanguageId('en-US').toString() ).includes('conference') );
            assert( TagUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).includes('教職人員') );
            assert( TagUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).includes('conference') );
            assert.equal( 
                TagUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).length,
                TagUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).length
            );
        })
    });

    context('supportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( TagUtils.supportedTypeId ) );
            assert( TagUtils.supportedTypeId.every( (id) => { return typeof( id ) === 'number'; } ) );
        });
        it('should success', () => {
            assert.equal( TagUtils.supportedTypeId.length, TagUtils.supportedType( LanguageUtils.defaultLanguageId ).length);
        });
    });

    context('getTypeId', () => {
        it('should success', () => {
            assert.equal( TagUtils.getTypeId(correctSampleTypeA), correctSampleTypeA.typeId);
            assert.equal( TagUtils.getTypeId(correctSampleTypeB), correctSampleTypeB.typeId);
            assert.equal( TagUtils.getTypeId(correctSampleTypeC), correctSampleTypeC.typeId);
            assert.equal( TagUtils.getTypeId(correctSampleTypeD), correctSampleTypeD.typeId);
            assert.equal( TagUtils.getTypeId(correctSampleTypeE), correctSampleTypeE.typeId);
        });
        it('should throw an error when giving an incorrect object', () => {
            assert.throws( () => { TagUtils.getTypeId(wrongSampleTypeA); }, Error);
            assert.throws( () => { TagUtils.getTypeId(wrongSampleTypeB); }, Error);
            assert.throws( () => { TagUtils.getTypeId(wrongSampleTypeC); }, Error);
            assert.throws( () => { TagUtils.getTypeId(wrongSampleTypeD); }, Error);
            assert.throws( () => { TagUtils.getTypeId(wrongSampleTypeE); }, Error);
            assert.throws( () => { TagUtils.getTypeId(wrongSampleTypeF); }, Error);
            assert.throws( () => { TagUtils.getTypeId(wrongSampleTypeG); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { TagUtils.getTypeId(String()); }, TypeError );
            assert.throws( () => { TagUtils.getTypeId(Number()); }, TypeError );
            assert.throws( () => { TagUtils.getTypeId(Boolean()); }, TypeError );
            assert.throws( () => { TagUtils.getTypeId(Symbol()); }, TypeError );
            assert.throws( () => { TagUtils.getTypeId(undefined); }, TypeError );
            assert.throws( () => { TagUtils.getTypeId(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( TagUtils.getTypeId( correctSampleTypeA )), typeof( Number() ) );
        });
    });

    context('getTypeById', () => {
        it('should success', () => {
            assert.equal( TagUtils.getTypeById(correctSampleTypeA), correctSampleTypeA.typeName);
            assert.equal( TagUtils.getTypeById(correctSampleTypeB), correctSampleTypeB.typeName);
            assert.equal( TagUtils.getTypeById(correctSampleTypeC), correctSampleTypeC.typeName);
            assert.equal( TagUtils.getTypeById(correctSampleTypeD), correctSampleTypeD.typeName);
            assert.equal( TagUtils.getTypeById(correctSampleTypeE), correctSampleTypeE.typeName);
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
            assert.throws( () => { TagUtils.getTypeById(wrongSampleTypeH); }, Error);
            assert.throws( () => { TagUtils.getTypeById(wrongSampleTypeI); }, Error);
            assert.throws( () => { TagUtils.getTypeById(wrongSampleTypeJ); }, Error);
            assert.throws( () => { TagUtils.getTypeById(wrongSampleTypeK); }, Error);
            assert.throws( () => { TagUtils.getTypeById(wrongSampleTypeL); }, Error);
            assert.throws( () => { TagUtils.getTypeById(wrongSampleTypeM); }, Error);
            assert.throws( () => { TagUtils.getTypeById(wrongSampleTypeN); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { TagUtils.getTypeById(String()); }, TypeError );
            assert.throws( () => { TagUtils.getTypeById(Number()); }, TypeError );
            assert.throws( () => { TagUtils.getTypeById(Boolean()); }, TypeError );
            assert.throws( () => { TagUtils.getTypeById(Symbol()); }, TypeError );
            assert.throws( () => { TagUtils.getTypeById(undefined); }, TypeError );
            assert.throws( () => { TagUtils.getTypeById(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( TagUtils.getTypeById( correctSampleTypeA )), typeof( String() ) );
        });
    });
});