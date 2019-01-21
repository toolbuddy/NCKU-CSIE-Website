import assert from 'assert';

import DegreeTypeUtils from 'models/faculty/utils/degree.js';
import LanguageUtils from 'settings/language/utils.js';

describe('models/faculty/utils/degree.js', () => {
    let correctSampleTypeA = {
        typeName: 'bachelor',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 0,
    };
    let correctSampleTypeB = {
        typeName: 'phd',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 2,
    };
    let correctSampleTypeC = {
        typeName: '碩士',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 1,
    };
    let correctSampleTypeD = {
        typeName: '學士',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 0,
    };
    let correctSampleTypeE = {
        typeName: '博士',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 2,
    };

    let wrongSampleTypeA = {
        typeName: 'bbbachelor',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeB = {
        typeName: 'bachelor',
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeC = {
        typeName: 'Bachelor',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeD = {
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeE = {
        typeName: 'bachelor',
    };
    let wrongSampleTypeF = {
        typeName: 'bachelor',
        languageId: 10000
    };
    let wrongSampleTypeG = {};

    context('defaultType', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( DegreeTypeUtils.defaultType( LanguageUtils.defaultLanguageId ) ), typeof(String()));
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { DegreeTypeUtils.defaultType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { DegreeTypeUtils.defaultType( {} ); }, TypeError);
            assert.throws( () => { DegreeTypeUtils.defaultType( undefined ); }, TypeError);
            assert.throws( () => { DegreeTypeUtils.defaultType( null ); }, TypeError);
            assert.throws( () => { DegreeTypeUtils.defaultType( Boolean() ); }, TypeError);
            assert.throws( () => { DegreeTypeUtils.defaultType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert.equal( DegreeTypeUtils.defaultType( LanguageUtils.getLanguageId('zh-TW').toString() ), '學士' );
            assert.equal( DegreeTypeUtils.defaultType( LanguageUtils.getLanguageId('en-US').toString() ), 'bachelor' );
            assert.equal( DegreeTypeUtils.defaultType( LanguageUtils.getLanguageId('zh-TW') ), '學士' );
            assert.equal( DegreeTypeUtils.defaultType( LanguageUtils.getLanguageId('en-US') ), 'bachelor' );
        })
    });

    context('defaultTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof(DegreeTypeUtils.defaultTypeId), typeof(Number()));
        });
        it('should success', () => {
            assert.equal( DegreeTypeUtils.defaultTypeId, 0);
        });
    });

    context('isSupportedType', () => {
        it('should return true when giving a correct object', () => {
            assert.equal( DegreeTypeUtils.isSupportedType(correctSampleTypeA), true);
            assert.equal( DegreeTypeUtils.isSupportedType(correctSampleTypeB), true);
            assert.equal( DegreeTypeUtils.isSupportedType(correctSampleTypeC), true);
            assert.equal( DegreeTypeUtils.isSupportedType(correctSampleTypeD), true);
            assert.equal( DegreeTypeUtils.isSupportedType(correctSampleTypeE), true);
        });
        it('should return false or throw an error when giving an incorrect object', () => {
            assert.equal( DegreeTypeUtils.isSupportedType(wrongSampleTypeA), false);
            assert.equal( DegreeTypeUtils.isSupportedType(wrongSampleTypeB), false);
            assert.equal( DegreeTypeUtils.isSupportedType(wrongSampleTypeC), false);
            assert.equal( DegreeTypeUtils.isSupportedType(wrongSampleTypeD), false);
            assert.throws( () => { DegreeTypeUtils.isSupportedType(wrongSampleTypeE); }, TypeError);
            assert.throws( () => { DegreeTypeUtils.isSupportedType(wrongSampleTypeF); }, TypeError);
            assert.equal( DegreeTypeUtils.isSupportedType(wrongSampleTypeG), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( DegreeTypeUtils.isSupportedType(String()), false );
            assert.equal( DegreeTypeUtils.isSupportedType(Boolean()), false );
            assert.equal( DegreeTypeUtils.isSupportedType(Number()), false );
            assert.equal( DegreeTypeUtils.isSupportedType(Symbol()), false );
            assert.throws( () => { DegreeTypeUtils.isSupportedType(undefined); }, TypeError );
            assert.throws( () => { DegreeTypeUtils.isSupportedType(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( DegreeTypeUtils.isSupportedType( correctSampleTypeA )), typeof( Boolean() ) );
        });
    });

    context('isSupportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( DegreeTypeUtils.isSupportedTypeId( LanguageUtils.defaultTypeId )), typeof(Boolean()));
        });
        it('should return true when giving a correct argument', () => {
            assert.equal( DegreeTypeUtils.isSupportedTypeId( 0 ), true);
            assert.equal( DegreeTypeUtils.isSupportedTypeId( 1 ), true);
        });
        it('should return false when giving an invalid argument', () => {
            assert.equal( DegreeTypeUtils.isSupportedTypeId( -1 ), false);
            assert.equal( DegreeTypeUtils.isSupportedTypeId( 10000 ), false);
            assert.equal( DegreeTypeUtils.isSupportedTypeId( '1' ), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( DegreeTypeUtils.isSupportedTypeId(Symbol()), false);
            assert.equal( DegreeTypeUtils.isSupportedTypeId(undefined), false);
            assert.equal( DegreeTypeUtils.isSupportedTypeId(null), false);
            assert.equal( DegreeTypeUtils.isSupportedTypeId(Boolean()), false);
            assert.equal( DegreeTypeUtils.isSupportedTypeId(String()), false);
        });
    });

    context('supportedType', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( DegreeTypeUtils.supportedType( LanguageUtils.defaultLanguageId ) ) );
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { DegreeTypeUtils.supportedType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { DegreeTypeUtils.supportedType( {} ); }, TypeError);
            assert.throws( () => { DegreeTypeUtils.supportedType( undefined ); }, TypeError);
            assert.throws( () => { DegreeTypeUtils.supportedType( null ); }, TypeError);
            assert.throws( () => { DegreeTypeUtils.supportedType( Boolean() ); }, TypeError);
            assert.throws( () => { DegreeTypeUtils.supportedType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert( DegreeTypeUtils.supportedType( LanguageUtils.getLanguageId('zh-TW').toString() ).includes('碩士') );
            assert( DegreeTypeUtils.supportedType( LanguageUtils.getLanguageId('en-US').toString() ).includes('phd') );
            assert( DegreeTypeUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).includes('碩士') );
            assert( DegreeTypeUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).includes('phd') );
            assert.equal( 
                DegreeTypeUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).length,
                DegreeTypeUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).length
            );
        })
    });

    context('supportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( DegreeTypeUtils.supportedTypeId ) );
            assert( DegreeTypeUtils.supportedTypeId.every( (id) => { return typeof( id ) === 'number'; } ) );
        });
        it('should success', () => {
            assert.equal( DegreeTypeUtils.supportedTypeId.length, DegreeTypeUtils.supportedType( LanguageUtils.defaultLanguageId ).length);
        });
    });

    context('getTypeId', () => {
        it('should success', () => {
            assert.equal( DegreeTypeUtils.getTypeId(correctSampleTypeA), correctSampleTypeA.typeId);
            assert.equal( DegreeTypeUtils.getTypeId(correctSampleTypeB), correctSampleTypeB.typeId);
            assert.equal( DegreeTypeUtils.getTypeId(correctSampleTypeC), correctSampleTypeC.typeId);
            assert.equal( DegreeTypeUtils.getTypeId(correctSampleTypeD), correctSampleTypeD.typeId);
            assert.equal( DegreeTypeUtils.getTypeId(correctSampleTypeE), correctSampleTypeE.typeId);
        });
        it('should throw an error when giving an incorrect object', () => {
            assert.throws( () => { DegreeTypeUtils.getTypeId(wrongSampleTypeA); }, Error);
            assert.throws( () => { DegreeTypeUtils.getTypeId(wrongSampleTypeB); }, Error);
            assert.throws( () => { DegreeTypeUtils.getTypeId(wrongSampleTypeC); }, Error);
            assert.throws( () => { DegreeTypeUtils.getTypeId(wrongSampleTypeD); }, Error);
            assert.throws( () => { DegreeTypeUtils.getTypeId(wrongSampleTypeE); }, Error);
            assert.throws( () => { DegreeTypeUtils.getTypeId(wrongSampleTypeF); }, Error);
            assert.throws( () => { DegreeTypeUtils.getTypeId(wrongSampleTypeG); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { DegreeTypeUtils.getTypeId(String()); }, TypeError );
            assert.throws( () => { DegreeTypeUtils.getTypeId(Number()); }, TypeError );
            assert.throws( () => { DegreeTypeUtils.getTypeId(Boolean()); }, TypeError );
            assert.throws( () => { DegreeTypeUtils.getTypeId(Symbol()); }, TypeError );
            assert.throws( () => { DegreeTypeUtils.getTypeId(undefined); }, TypeError );
            assert.throws( () => { DegreeTypeUtils.getTypeId(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( DegreeTypeUtils.getTypeId( correctSampleTypeA )), typeof( Number() ) );
        });
    });

    context('getTypeById', () => {
        it('should success', () => {
            assert.equal( DegreeTypeUtils.getTypeById(correctSampleTypeA), correctSampleTypeA.typeName);
            assert.equal( DegreeTypeUtils.getTypeById(correctSampleTypeB), correctSampleTypeB.typeName);
            assert.equal( DegreeTypeUtils.getTypeById(correctSampleTypeC), correctSampleTypeC.typeName);
            assert.equal( DegreeTypeUtils.getTypeById(correctSampleTypeD), correctSampleTypeD.typeName);
            assert.equal( DegreeTypeUtils.getTypeById(correctSampleTypeE), correctSampleTypeE.typeName);
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
            assert.throws( () => { DegreeTypeUtils.getTypeById(wrongSampleTypeH); }, Error);
            assert.throws( () => { DegreeTypeUtils.getTypeById(wrongSampleTypeI); }, Error);
            assert.throws( () => { DegreeTypeUtils.getTypeById(wrongSampleTypeJ); }, Error);
            assert.throws( () => { DegreeTypeUtils.getTypeById(wrongSampleTypeK); }, Error);
            assert.throws( () => { DegreeTypeUtils.getTypeById(wrongSampleTypeL); }, Error);
            assert.throws( () => { DegreeTypeUtils.getTypeById(wrongSampleTypeM); }, Error);
            assert.throws( () => { DegreeTypeUtils.getTypeById(wrongSampleTypeN); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { DegreeTypeUtils.getTypeById(String()); }, TypeError );
            assert.throws( () => { DegreeTypeUtils.getTypeById(Number()); }, TypeError );
            assert.throws( () => { DegreeTypeUtils.getTypeById(Boolean()); }, TypeError );
            assert.throws( () => { DegreeTypeUtils.getTypeById(Symbol()); }, TypeError );
            assert.throws( () => { DegreeTypeUtils.getTypeById(undefined); }, TypeError );
            assert.throws( () => { DegreeTypeUtils.getTypeById(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( DegreeTypeUtils.getTypeById( correctSampleTypeA )), typeof( String() ) );
        });
    });
});