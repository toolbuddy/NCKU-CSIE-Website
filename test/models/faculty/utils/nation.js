import assert from 'assert';

import NationUtils from 'models/faculty/utils/nation.js';
import LanguageUtils from 'settings/language/utils.js';

describe('models/faculty/utils/nation.js', () => {
    let correctSampleTypeA = {
        typeName: 'Taiwan',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 0,
    };
    let correctSampleTypeB = {
        typeName: 'China',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 2,
    };
    let correctSampleTypeC = {
        typeName: '美國',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 1,
    };
    let correctSampleTypeD = {
        typeName: '臺灣',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 0,
    };
    let correctSampleTypeE = {
        typeName: '中國',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 2,
    };

    let wrongSampleTypeA = {
        typeName: 'TTTaiwan',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeB = {
        typeName: 'Taiwan',
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeC = {
        typeName: 'taiwan',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeD = {
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeE = {
        typeName: 'Taiwan',
    };
    let wrongSampleTypeF = {
        typeName: 'Taiwan',
        languageId: 10000
    };
    let wrongSampleTypeG = {};

    context('defaultType', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( NationUtils.defaultType( LanguageUtils.defaultLanguageId ) ), typeof(String()));
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { NationUtils.defaultType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { NationUtils.defaultType( {} ); }, TypeError);
            assert.throws( () => { NationUtils.defaultType( undefined ); }, TypeError);
            assert.throws( () => { NationUtils.defaultType( null ); }, TypeError);
            assert.throws( () => { NationUtils.defaultType( Boolean() ); }, TypeError);
            assert.throws( () => { NationUtils.defaultType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert.equal( NationUtils.defaultType( LanguageUtils.getLanguageId('zh-TW').toString() ), '臺灣' );
            assert.equal( NationUtils.defaultType( LanguageUtils.getLanguageId('en-US').toString() ), 'Taiwan' );
            assert.equal( NationUtils.defaultType( LanguageUtils.getLanguageId('zh-TW') ), '臺灣' );
            assert.equal( NationUtils.defaultType( LanguageUtils.getLanguageId('en-US') ), 'Taiwan' );
        })
    });

    context('defaultTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof(NationUtils.defaultTypeId), typeof(Number()));
        });
        it('should success', () => {
            assert.equal( NationUtils.defaultTypeId, 0);
        });
    });

    context('isSupportedType', () => {
        it('should return true when giving a correct object', () => {
            assert.equal( NationUtils.isSupportedType(correctSampleTypeA), true);
            assert.equal( NationUtils.isSupportedType(correctSampleTypeB), true);
            assert.equal( NationUtils.isSupportedType(correctSampleTypeC), true);
            assert.equal( NationUtils.isSupportedType(correctSampleTypeD), true);
            assert.equal( NationUtils.isSupportedType(correctSampleTypeE), true);
        });
        it('should return false or throw an error when giving an incorrect object', () => {
            assert.equal( NationUtils.isSupportedType(wrongSampleTypeA), false);
            assert.equal( NationUtils.isSupportedType(wrongSampleTypeB), false);
            assert.equal( NationUtils.isSupportedType(wrongSampleTypeC), false);
            assert.equal( NationUtils.isSupportedType(wrongSampleTypeD), false);
            assert.throws( () => { NationUtils.isSupportedType(wrongSampleTypeE); }, TypeError);
            assert.throws( () => { NationUtils.isSupportedType(wrongSampleTypeF); }, TypeError);
            assert.equal( NationUtils.isSupportedType(wrongSampleTypeG), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( NationUtils.isSupportedType(String()), false );
            assert.equal( NationUtils.isSupportedType(Boolean()), false );
            assert.equal( NationUtils.isSupportedType(Number()), false );
            assert.equal( NationUtils.isSupportedType(Symbol()), false );
            assert.throws( () => { NationUtils.isSupportedType(undefined); }, TypeError );
            assert.throws( () => { NationUtils.isSupportedType(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( NationUtils.isSupportedType( correctSampleTypeA )), typeof( Boolean() ) );
        });
    });

    context('isSupportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( NationUtils.isSupportedTypeId( LanguageUtils.defaultTypeId )), typeof(Boolean()));
        });
        it('should return true when giving a correct argument', () => {
            assert.equal( NationUtils.isSupportedTypeId( 0 ), true);
            assert.equal( NationUtils.isSupportedTypeId( 1 ), true);
        });
        it('should return false when giving an invalid argument', () => {
            assert.equal( NationUtils.isSupportedTypeId( -1 ), false);
            assert.equal( NationUtils.isSupportedTypeId( 10000 ), false);
            assert.equal( NationUtils.isSupportedTypeId( '1' ), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( NationUtils.isSupportedTypeId(Symbol()), false);
            assert.equal( NationUtils.isSupportedTypeId(undefined), false);
            assert.equal( NationUtils.isSupportedTypeId(null), false);
            assert.equal( NationUtils.isSupportedTypeId(Boolean()), false);
            assert.equal( NationUtils.isSupportedTypeId(String()), false);
        });
    });

    context('supportedType', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( NationUtils.supportedType( LanguageUtils.defaultLanguageId ) ) );
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { NationUtils.supportedType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { NationUtils.supportedType( {} ); }, TypeError);
            assert.throws( () => { NationUtils.supportedType( undefined ); }, TypeError);
            assert.throws( () => { NationUtils.supportedType( null ); }, TypeError);
            assert.throws( () => { NationUtils.supportedType( Boolean() ); }, TypeError);
            assert.throws( () => { NationUtils.supportedType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert( NationUtils.supportedType( LanguageUtils.getLanguageId('zh-TW').toString() ).includes('美國') );
            assert( NationUtils.supportedType( LanguageUtils.getLanguageId('en-US').toString() ).includes('Japan') );
            assert( NationUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).includes('美國') );
            assert( NationUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).includes('Japan') );
            assert.equal( 
                NationUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).length,
                NationUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).length
            );
        })
    });

    context('supportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( NationUtils.supportedTypeId ) );
            assert( NationUtils.supportedTypeId.every( (id) => { return typeof( id ) === 'number'; } ) );
        });
        it('should success', () => {
            assert.equal( NationUtils.supportedTypeId.length, NationUtils.supportedType( LanguageUtils.defaultLanguageId ).length);
        });
    });

    context('getTypeId', () => {
        it('should success', () => {
            assert.equal( NationUtils.getTypeId(correctSampleTypeA), correctSampleTypeA.typeId);
            assert.equal( NationUtils.getTypeId(correctSampleTypeB), correctSampleTypeB.typeId);
            assert.equal( NationUtils.getTypeId(correctSampleTypeC), correctSampleTypeC.typeId);
            assert.equal( NationUtils.getTypeId(correctSampleTypeD), correctSampleTypeD.typeId);
            assert.equal( NationUtils.getTypeId(correctSampleTypeE), correctSampleTypeE.typeId);
        });
        it('should throw an error when giving an incorrect object', () => {
            assert.throws( () => { NationUtils.getTypeId(wrongSampleTypeA); }, Error);
            assert.throws( () => { NationUtils.getTypeId(wrongSampleTypeB); }, Error);
            assert.throws( () => { NationUtils.getTypeId(wrongSampleTypeC); }, Error);
            assert.throws( () => { NationUtils.getTypeId(wrongSampleTypeD); }, Error);
            assert.throws( () => { NationUtils.getTypeId(wrongSampleTypeE); }, Error);
            assert.throws( () => { NationUtils.getTypeId(wrongSampleTypeF); }, Error);
            assert.throws( () => { NationUtils.getTypeId(wrongSampleTypeG); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { NationUtils.getTypeId(String()); }, TypeError );
            assert.throws( () => { NationUtils.getTypeId(Number()); }, TypeError );
            assert.throws( () => { NationUtils.getTypeId(Boolean()); }, TypeError );
            assert.throws( () => { NationUtils.getTypeId(Symbol()); }, TypeError );
            assert.throws( () => { NationUtils.getTypeId(undefined); }, TypeError );
            assert.throws( () => { NationUtils.getTypeId(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( NationUtils.getTypeId( correctSampleTypeA )), typeof( Number() ) );
        });
    });

    context('getTypeById', () => {
        it('should success', () => {
            assert.equal( NationUtils.getTypeById(correctSampleTypeA), correctSampleTypeA.typeName);
            assert.equal( NationUtils.getTypeById(correctSampleTypeB), correctSampleTypeB.typeName);
            assert.equal( NationUtils.getTypeById(correctSampleTypeC), correctSampleTypeC.typeName);
            assert.equal( NationUtils.getTypeById(correctSampleTypeD), correctSampleTypeD.typeName);
            assert.equal( NationUtils.getTypeById(correctSampleTypeE), correctSampleTypeE.typeName);
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
            assert.throws( () => { NationUtils.getTypeById(wrongSampleTypeH); }, Error);
            assert.throws( () => { NationUtils.getTypeById(wrongSampleTypeI); }, Error);
            assert.throws( () => { NationUtils.getTypeById(wrongSampleTypeJ); }, Error);
            assert.throws( () => { NationUtils.getTypeById(wrongSampleTypeK); }, Error);
            assert.throws( () => { NationUtils.getTypeById(wrongSampleTypeL); }, Error);
            assert.throws( () => { NationUtils.getTypeById(wrongSampleTypeM); }, Error);
            assert.throws( () => { NationUtils.getTypeById(wrongSampleTypeN); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { NationUtils.getTypeById(String()); }, TypeError );
            assert.throws( () => { NationUtils.getTypeById(Number()); }, TypeError );
            assert.throws( () => { NationUtils.getTypeById(Boolean()); }, TypeError );
            assert.throws( () => { NationUtils.getTypeById(Symbol()); }, TypeError );
            assert.throws( () => { NationUtils.getTypeById(undefined); }, TypeError );
            assert.throws( () => { NationUtils.getTypeById(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( NationUtils.getTypeById( correctSampleTypeA )), typeof( String() ) );
        });
    });
});