import assert from 'assert';

import DepartmentTypeUtils from 'models/faculty/utils/department-type.js';
import LanguageUtils from 'settings/language/utils.js';

describe('models/faculty/utils/department-type.js', () => {
    let correctSampleTypeA = {
        typeName: 'Department of CSIE',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 0,
    };
    let correctSampleTypeB = {
        typeName: 'Adjunct Professor',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 2,
    };
    let correctSampleTypeC = {
        typeName: '資訊所',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 1,
    };
    let correctSampleTypeD = {
        typeName: '資訊系',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 0,
    };
    let correctSampleTypeE = {
        typeName: '兼任師資',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 2,
    };

    let wrongSampleTypeA = {
        typeName: 'Department of CCCC',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeB = {
        typeName: 'Department of CSIE',
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeC = {
        typeName: 'DEPARTMENT of csie',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeD = {
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeE = {
        typeName: 'Department of CSIE',
    };
    let wrongSampleTypeF = {
        typeName: 'Department of CSIE',
        languageId: 10000
    };
    let wrongSampleTypeG = {};

    context('defaultType', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( DepartmentTypeUtils.defaultType( LanguageUtils.defaultLanguageId ) ), typeof(String()));
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { DepartmentTypeUtils.defaultType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { DepartmentTypeUtils.defaultType( {} ); }, TypeError);
            assert.throws( () => { DepartmentTypeUtils.defaultType( undefined ); }, TypeError);
            assert.throws( () => { DepartmentTypeUtils.defaultType( null ); }, TypeError);
            assert.throws( () => { DepartmentTypeUtils.defaultType( Boolean() ); }, TypeError);
            assert.throws( () => { DepartmentTypeUtils.defaultType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert.equal( DepartmentTypeUtils.defaultType( LanguageUtils.getLanguageId('zh-TW').toString() ), '資訊系' );
            assert.equal( DepartmentTypeUtils.defaultType( LanguageUtils.getLanguageId('en-US').toString() ), 'Department of CSIE' );
            assert.equal( DepartmentTypeUtils.defaultType( LanguageUtils.getLanguageId('zh-TW') ), '資訊系' );
            assert.equal( DepartmentTypeUtils.defaultType( LanguageUtils.getLanguageId('en-US') ), 'Department of CSIE' );
        })
    });

    context('defaultTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof(DepartmentTypeUtils.defaultTypeId), typeof(Number()));
        });
        it('should success', () => {
            assert.equal( DepartmentTypeUtils.defaultTypeId, 0);
        });
    });

    context('isSupportedType', () => {
        it('should return true when giving a correct object', () => {
            assert.equal( DepartmentTypeUtils.isSupportedType(correctSampleTypeA), true);
            assert.equal( DepartmentTypeUtils.isSupportedType(correctSampleTypeB), true);
            assert.equal( DepartmentTypeUtils.isSupportedType(correctSampleTypeC), true);
            assert.equal( DepartmentTypeUtils.isSupportedType(correctSampleTypeD), true);
            assert.equal( DepartmentTypeUtils.isSupportedType(correctSampleTypeE), true);
        });
        it('should return false or throw an error when giving an incorrect object', () => {
            assert.equal( DepartmentTypeUtils.isSupportedType(wrongSampleTypeA), false);
            assert.equal( DepartmentTypeUtils.isSupportedType(wrongSampleTypeB), false);
            assert.equal( DepartmentTypeUtils.isSupportedType(wrongSampleTypeC), false);
            assert.equal( DepartmentTypeUtils.isSupportedType(wrongSampleTypeD), false);
            assert.throws( () => { DepartmentTypeUtils.isSupportedType(wrongSampleTypeE); }, TypeError);
            assert.throws( () => { DepartmentTypeUtils.isSupportedType(wrongSampleTypeF); }, TypeError);
            assert.equal( DepartmentTypeUtils.isSupportedType(wrongSampleTypeG), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( DepartmentTypeUtils.isSupportedType(String()), false );
            assert.equal( DepartmentTypeUtils.isSupportedType(Boolean()), false );
            assert.equal( DepartmentTypeUtils.isSupportedType(Number()), false );
            assert.equal( DepartmentTypeUtils.isSupportedType(Symbol()), false );
            assert.throws( () => { DepartmentTypeUtils.isSupportedType(undefined); }, TypeError );
            assert.throws( () => { DepartmentTypeUtils.isSupportedType(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( DepartmentTypeUtils.isSupportedType( correctSampleTypeA )), typeof( Boolean() ) );
        });
    });

    context('isSupportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( DepartmentTypeUtils.isSupportedTypeId( LanguageUtils.defaultTypeId )), typeof(Boolean()));
        });
        it('should return true when giving a correct argument', () => {
            assert.equal( DepartmentTypeUtils.isSupportedTypeId( 0 ), true);
            assert.equal( DepartmentTypeUtils.isSupportedTypeId( 1 ), true);
        });
        it('should return false when giving an invalid argument', () => {
            assert.equal( DepartmentTypeUtils.isSupportedTypeId( -1 ), false);
            assert.equal( DepartmentTypeUtils.isSupportedTypeId( 10000 ), false);
            assert.equal( DepartmentTypeUtils.isSupportedTypeId( '1' ), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( DepartmentTypeUtils.isSupportedTypeId(Symbol()), false);
            assert.equal( DepartmentTypeUtils.isSupportedTypeId(undefined), false);
            assert.equal( DepartmentTypeUtils.isSupportedTypeId(null), false);
            assert.equal( DepartmentTypeUtils.isSupportedTypeId(Boolean()), false);
            assert.equal( DepartmentTypeUtils.isSupportedTypeId(String()), false);
        });
    });

    context('supportedType', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( DepartmentTypeUtils.supportedType( LanguageUtils.defaultLanguageId ) ) );
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { DepartmentTypeUtils.supportedType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { DepartmentTypeUtils.supportedType( {} ); }, TypeError);
            assert.throws( () => { DepartmentTypeUtils.supportedType( undefined ); }, TypeError);
            assert.throws( () => { DepartmentTypeUtils.supportedType( null ); }, TypeError);
            assert.throws( () => { DepartmentTypeUtils.supportedType( Boolean() ); }, TypeError);
            assert.throws( () => { DepartmentTypeUtils.supportedType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert( DepartmentTypeUtils.supportedType( LanguageUtils.getLanguageId('zh-TW').toString() ).includes('兼任師資') );
            assert( DepartmentTypeUtils.supportedType( LanguageUtils.getLanguageId('en-US').toString() ).includes('Joint Appointment') );
            assert( DepartmentTypeUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).includes('兼任師資') );
            assert( DepartmentTypeUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).includes('Joint Appointment') );
            assert.equal( 
                DepartmentTypeUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).length,
                DepartmentTypeUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).length
            );
        })
    });

    context('supportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( DepartmentTypeUtils.supportedTypeId ) );
            assert( DepartmentTypeUtils.supportedTypeId.every( (id) => { return typeof( id ) === 'number'; } ) );
        });
        it('should success', () => {
            assert.equal( DepartmentTypeUtils.supportedTypeId.length, DepartmentTypeUtils.supportedType( LanguageUtils.defaultLanguageId ).length);
        });
    });

    context('getTypeId', () => {
        it('should success', () => {
            assert.equal( DepartmentTypeUtils.getTypeId(correctSampleTypeA), correctSampleTypeA.typeId);
            assert.equal( DepartmentTypeUtils.getTypeId(correctSampleTypeB), correctSampleTypeB.typeId);
            assert.equal( DepartmentTypeUtils.getTypeId(correctSampleTypeC), correctSampleTypeC.typeId);
            assert.equal( DepartmentTypeUtils.getTypeId(correctSampleTypeD), correctSampleTypeD.typeId);
            assert.equal( DepartmentTypeUtils.getTypeId(correctSampleTypeE), correctSampleTypeE.typeId);
        });
        it('should throw an error when giving an incorrect object', () => {
            assert.throws( () => { DepartmentTypeUtils.getTypeId(wrongSampleTypeA); }, Error);
            assert.throws( () => { DepartmentTypeUtils.getTypeId(wrongSampleTypeB); }, Error);
            assert.throws( () => { DepartmentTypeUtils.getTypeId(wrongSampleTypeC); }, Error);
            assert.throws( () => { DepartmentTypeUtils.getTypeId(wrongSampleTypeD); }, Error);
            assert.throws( () => { DepartmentTypeUtils.getTypeId(wrongSampleTypeE); }, Error);
            assert.throws( () => { DepartmentTypeUtils.getTypeId(wrongSampleTypeF); }, Error);
            assert.throws( () => { DepartmentTypeUtils.getTypeId(wrongSampleTypeG); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { DepartmentTypeUtils.getTypeId(String()); }, TypeError );
            assert.throws( () => { DepartmentTypeUtils.getTypeId(Number()); }, TypeError );
            assert.throws( () => { DepartmentTypeUtils.getTypeId(Boolean()); }, TypeError );
            assert.throws( () => { DepartmentTypeUtils.getTypeId(Symbol()); }, TypeError );
            assert.throws( () => { DepartmentTypeUtils.getTypeId(undefined); }, TypeError );
            assert.throws( () => { DepartmentTypeUtils.getTypeId(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( DepartmentTypeUtils.getTypeId( correctSampleTypeA )), typeof( Number() ) );
        });
    });

    context('getTypeById', () => {
        it('should success', () => {
            assert.equal( DepartmentTypeUtils.getTypeById(correctSampleTypeA), correctSampleTypeA.typeName);
            assert.equal( DepartmentTypeUtils.getTypeById(correctSampleTypeB), correctSampleTypeB.typeName);
            assert.equal( DepartmentTypeUtils.getTypeById(correctSampleTypeC), correctSampleTypeC.typeName);
            assert.equal( DepartmentTypeUtils.getTypeById(correctSampleTypeD), correctSampleTypeD.typeName);
            assert.equal( DepartmentTypeUtils.getTypeById(correctSampleTypeE), correctSampleTypeE.typeName);
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
            assert.throws( () => { DepartmentTypeUtils.getTypeById(wrongSampleTypeH); }, Error);
            assert.throws( () => { DepartmentTypeUtils.getTypeById(wrongSampleTypeI); }, Error);
            assert.throws( () => { DepartmentTypeUtils.getTypeById(wrongSampleTypeJ); }, Error);
            assert.throws( () => { DepartmentTypeUtils.getTypeById(wrongSampleTypeK); }, Error);
            assert.throws( () => { DepartmentTypeUtils.getTypeById(wrongSampleTypeL); }, Error);
            assert.throws( () => { DepartmentTypeUtils.getTypeById(wrongSampleTypeM); }, Error);
            assert.throws( () => { DepartmentTypeUtils.getTypeById(wrongSampleTypeN); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { DepartmentTypeUtils.getTypeById(String()); }, TypeError );
            assert.throws( () => { DepartmentTypeUtils.getTypeById(Number()); }, TypeError );
            assert.throws( () => { DepartmentTypeUtils.getTypeById(Boolean()); }, TypeError );
            assert.throws( () => { DepartmentTypeUtils.getTypeById(Symbol()); }, TypeError );
            assert.throws( () => { DepartmentTypeUtils.getTypeById(undefined); }, TypeError );
            assert.throws( () => { DepartmentTypeUtils.getTypeById(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( DepartmentTypeUtils.getTypeById( correctSampleTypeA )), typeof( String() ) );
        });
    });
});