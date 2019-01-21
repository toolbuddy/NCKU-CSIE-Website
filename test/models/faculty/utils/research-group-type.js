import assert from 'assert';

import ResearchTypeUtils from 'models/faculty/utils/research-group-type.js';
import LanguageUtils from 'settings/language/utils.js';

describe('models/faculty/utils/research-group-type.js', () => {
    let correctSampleTypeA = {
        typeName: 'E-life Digital Technology and Software Technology',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 0,
    };
    let correctSampleTypeB = {
        typeName: 'Data and Knowledge Engineering',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 2,
    };
    let correctSampleTypeC = {
        typeName: '計算通訊與網路',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 1,
    };
    let correctSampleTypeD = {
        typeName: '數位生活科技與軟體技術',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 0,
    };
    let correctSampleTypeE = {
        typeName: '資料與知識工程',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 2,
    };

    let wrongSampleTypeA = {
        typeName: 'EEE-life Digital Technology and Software Technology',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeB = {
        typeName: 'E-life Digital Technology and Software Technology',
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeC = {
        typeName: 'e-life digital technology and software technology',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeD = {
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeE = {
        typeName: 'E-life Digital Technology and Software Technology',
    };
    let wrongSampleTypeF = {
        typeName: 'E-life Digital Technology and Software Technology',
        languageId: 10000
    };
    let wrongSampleTypeG = {};

    context('defaultType', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( ResearchTypeUtils.defaultType( LanguageUtils.defaultLanguageId ) ), typeof(String()));
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { ResearchTypeUtils.defaultType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { ResearchTypeUtils.defaultType( {} ); }, TypeError);
            assert.throws( () => { ResearchTypeUtils.defaultType( undefined ); }, TypeError);
            assert.throws( () => { ResearchTypeUtils.defaultType( null ); }, TypeError);
            assert.throws( () => { ResearchTypeUtils.defaultType( Boolean() ); }, TypeError);
            assert.throws( () => { ResearchTypeUtils.defaultType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert.equal( ResearchTypeUtils.defaultType( LanguageUtils.getLanguageId('zh-TW').toString() ), '數位生活科技與軟體技術' );
            assert.equal( ResearchTypeUtils.defaultType( LanguageUtils.getLanguageId('en-US').toString() ), 'E-life Digital Technology and Software Technology' );
            assert.equal( ResearchTypeUtils.defaultType( LanguageUtils.getLanguageId('zh-TW') ), '數位生活科技與軟體技術' );
            assert.equal( ResearchTypeUtils.defaultType( LanguageUtils.getLanguageId('en-US') ), 'E-life Digital Technology and Software Technology' );
        })
    });

    context('defaultTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof(ResearchTypeUtils.defaultTypeId), typeof(Number()));
        });
        it('should success', () => {
            assert.equal( ResearchTypeUtils.defaultTypeId, 0);
        });
    });

    context('isSupportedType', () => {
        it('should return true when giving a correct object', () => {
            assert.equal( ResearchTypeUtils.isSupportedType(correctSampleTypeA), true);
            assert.equal( ResearchTypeUtils.isSupportedType(correctSampleTypeB), true);
            assert.equal( ResearchTypeUtils.isSupportedType(correctSampleTypeC), true);
            assert.equal( ResearchTypeUtils.isSupportedType(correctSampleTypeD), true);
            assert.equal( ResearchTypeUtils.isSupportedType(correctSampleTypeE), true);
        });
        it('should return false or throw an error when giving an incorrect object', () => {
            assert.equal( ResearchTypeUtils.isSupportedType(wrongSampleTypeA), false);
            assert.equal( ResearchTypeUtils.isSupportedType(wrongSampleTypeB), false);
            assert.equal( ResearchTypeUtils.isSupportedType(wrongSampleTypeC), false);
            assert.equal( ResearchTypeUtils.isSupportedType(wrongSampleTypeD), false);
            assert.throws( () => { ResearchTypeUtils.isSupportedType(wrongSampleTypeE); }, TypeError);
            assert.throws( () => { ResearchTypeUtils.isSupportedType(wrongSampleTypeF); }, TypeError);
            assert.equal( ResearchTypeUtils.isSupportedType(wrongSampleTypeG), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( ResearchTypeUtils.isSupportedType(String()), false );
            assert.equal( ResearchTypeUtils.isSupportedType(Boolean()), false );
            assert.equal( ResearchTypeUtils.isSupportedType(Number()), false );
            assert.equal( ResearchTypeUtils.isSupportedType(Symbol()), false );
            assert.throws( () => { ResearchTypeUtils.isSupportedType(undefined); }, TypeError );
            assert.throws( () => { ResearchTypeUtils.isSupportedType(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( ResearchTypeUtils.isSupportedType( correctSampleTypeA )), typeof( Boolean() ) );
        });
    });

    context('isSupportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( ResearchTypeUtils.isSupportedTypeId( LanguageUtils.defaultTypeId )), typeof(Boolean()));
        });
        it('should return true when giving a correct argument', () => {
            assert.equal( ResearchTypeUtils.isSupportedTypeId( 0 ), true);
            assert.equal( ResearchTypeUtils.isSupportedTypeId( 1 ), true);
        });
        it('should return false when giving an invalid argument', () => {
            assert.equal( ResearchTypeUtils.isSupportedTypeId( -1 ), false);
            assert.equal( ResearchTypeUtils.isSupportedTypeId( 10000 ), false);
            assert.equal( ResearchTypeUtils.isSupportedTypeId( '1' ), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( ResearchTypeUtils.isSupportedTypeId(Symbol()), false);
            assert.equal( ResearchTypeUtils.isSupportedTypeId(undefined), false);
            assert.equal( ResearchTypeUtils.isSupportedTypeId(null), false);
            assert.equal( ResearchTypeUtils.isSupportedTypeId(Boolean()), false);
            assert.equal( ResearchTypeUtils.isSupportedTypeId(String()), false);
        });
    });

    context('supportedType', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( ResearchTypeUtils.supportedType( LanguageUtils.defaultLanguageId ) ) );
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { ResearchTypeUtils.supportedType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { ResearchTypeUtils.supportedType( {} ); }, TypeError);
            assert.throws( () => { ResearchTypeUtils.supportedType( undefined ); }, TypeError);
            assert.throws( () => { ResearchTypeUtils.supportedType( null ); }, TypeError);
            assert.throws( () => { ResearchTypeUtils.supportedType( Boolean() ); }, TypeError);
            assert.throws( () => { ResearchTypeUtils.supportedType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert( ResearchTypeUtils.supportedType( LanguageUtils.getLanguageId('zh-TW').toString() ).includes('計算通訊與網路') );
            assert( ResearchTypeUtils.supportedType( LanguageUtils.getLanguageId('en-US').toString() ).includes('Data and Knowledge Engineering') );
            assert( ResearchTypeUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).includes('計算通訊與網路') );
            assert( ResearchTypeUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).includes('Data and Knowledge Engineering') );
            assert.equal( 
                ResearchTypeUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).length,
                ResearchTypeUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).length
            );
        })
    });

    context('supportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( ResearchTypeUtils.supportedTypeId ) );
            assert( ResearchTypeUtils.supportedTypeId.every( (id) => { return typeof( id ) === 'number'; } ) );
        });
        it('should success', () => {
            assert.equal( ResearchTypeUtils.supportedTypeId.length, ResearchTypeUtils.supportedType( LanguageUtils.defaultLanguageId ).length);
        });
    });

    context('getTypeId', () => {
        it('should success', () => {
            assert.equal( ResearchTypeUtils.getTypeId(correctSampleTypeA), correctSampleTypeA.typeId);
            assert.equal( ResearchTypeUtils.getTypeId(correctSampleTypeB), correctSampleTypeB.typeId);
            assert.equal( ResearchTypeUtils.getTypeId(correctSampleTypeC), correctSampleTypeC.typeId);
            assert.equal( ResearchTypeUtils.getTypeId(correctSampleTypeD), correctSampleTypeD.typeId);
            assert.equal( ResearchTypeUtils.getTypeId(correctSampleTypeE), correctSampleTypeE.typeId);
        });
        it('should throw an error when giving an incorrect object', () => {
            assert.throws( () => { ResearchTypeUtils.getTypeId(wrongSampleTypeA); }, Error);
            assert.throws( () => { ResearchTypeUtils.getTypeId(wrongSampleTypeB); }, Error);
            assert.throws( () => { ResearchTypeUtils.getTypeId(wrongSampleTypeC); }, Error);
            assert.throws( () => { ResearchTypeUtils.getTypeId(wrongSampleTypeD); }, Error);
            assert.throws( () => { ResearchTypeUtils.getTypeId(wrongSampleTypeE); }, Error);
            assert.throws( () => { ResearchTypeUtils.getTypeId(wrongSampleTypeF); }, Error);
            assert.throws( () => { ResearchTypeUtils.getTypeId(wrongSampleTypeG); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { ResearchTypeUtils.getTypeId(String()); }, TypeError );
            assert.throws( () => { ResearchTypeUtils.getTypeId(Number()); }, TypeError );
            assert.throws( () => { ResearchTypeUtils.getTypeId(Boolean()); }, TypeError );
            assert.throws( () => { ResearchTypeUtils.getTypeId(Symbol()); }, TypeError );
            assert.throws( () => { ResearchTypeUtils.getTypeId(undefined); }, TypeError );
            assert.throws( () => { ResearchTypeUtils.getTypeId(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( ResearchTypeUtils.getTypeId( correctSampleTypeA )), typeof( Number() ) );
        });
    });

    context('getTypeById', () => {
        it('should success', () => {
            assert.equal( ResearchTypeUtils.getTypeById(correctSampleTypeA), correctSampleTypeA.typeName);
            assert.equal( ResearchTypeUtils.getTypeById(correctSampleTypeB), correctSampleTypeB.typeName);
            assert.equal( ResearchTypeUtils.getTypeById(correctSampleTypeC), correctSampleTypeC.typeName);
            assert.equal( ResearchTypeUtils.getTypeById(correctSampleTypeD), correctSampleTypeD.typeName);
            assert.equal( ResearchTypeUtils.getTypeById(correctSampleTypeE), correctSampleTypeE.typeName);
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
            assert.throws( () => { ResearchTypeUtils.getTypeById(wrongSampleTypeH); }, Error);
            assert.throws( () => { ResearchTypeUtils.getTypeById(wrongSampleTypeI); }, Error);
            assert.throws( () => { ResearchTypeUtils.getTypeById(wrongSampleTypeJ); }, Error);
            assert.throws( () => { ResearchTypeUtils.getTypeById(wrongSampleTypeK); }, Error);
            assert.throws( () => { ResearchTypeUtils.getTypeById(wrongSampleTypeL); }, Error);
            assert.throws( () => { ResearchTypeUtils.getTypeById(wrongSampleTypeM); }, Error);
            assert.throws( () => { ResearchTypeUtils.getTypeById(wrongSampleTypeN); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { ResearchTypeUtils.getTypeById(String()); }, TypeError );
            assert.throws( () => { ResearchTypeUtils.getTypeById(Number()); }, TypeError );
            assert.throws( () => { ResearchTypeUtils.getTypeById(Boolean()); }, TypeError );
            assert.throws( () => { ResearchTypeUtils.getTypeById(Symbol()); }, TypeError );
            assert.throws( () => { ResearchTypeUtils.getTypeById(undefined); }, TypeError );
            assert.throws( () => { ResearchTypeUtils.getTypeById(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( ResearchTypeUtils.getTypeById( correctSampleTypeA )), typeof( String() ) );
        });
    });
});