import assert from 'assert';

import ProjectCategoryUtils from 'models/faculty/utils/project-category.js';
import LanguageUtils from 'settings/language/utils.js';

describe('models/faculty/utils/project-category.js', () => {
    let correctSampleTypeA = {
        typeName: 'General Projects',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 0,
    };
    let correctSampleTypeB = {
        typeName: 'National Science Council Projects',
        languageId: LanguageUtils.getLanguageId('en-US'),
        typeId: 1,
    };
    let correctSampleTypeC = {
        typeName: '國科會計劃',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 1,
    };
    let correctSampleTypeD = {
        typeName: '一般建教案',
        languageId: LanguageUtils.getLanguageId('zh-TW'),
        typeId: 0,
    };

    let wrongSampleTypeA = {
        typeName: 'GGGeneral Projects',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeB = {
        typeName: 'bachelor',
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeC = {
        typeName: 'general projects',
        languageId: LanguageUtils.getLanguageId('en-US')
    };
    let wrongSampleTypeD = {
        languageId: LanguageUtils.getLanguageId('zh-TW')
    };
    let wrongSampleTypeE = {
        typeName: 'General Projects',
    };
    let wrongSampleTypeF = {
        typeName: 'General Projects',
        languageId: 10000
    };
    let wrongSampleTypeG = {};

    context('defaultType', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( ProjectCategoryUtils.defaultType( LanguageUtils.defaultLanguageId ) ), typeof(String()));
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { ProjectCategoryUtils.defaultType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { ProjectCategoryUtils.defaultType( {} ); }, TypeError);
            assert.throws( () => { ProjectCategoryUtils.defaultType( undefined ); }, TypeError);
            assert.throws( () => { ProjectCategoryUtils.defaultType( null ); }, TypeError);
            assert.throws( () => { ProjectCategoryUtils.defaultType( Boolean() ); }, TypeError);
            assert.throws( () => { ProjectCategoryUtils.defaultType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert.equal( ProjectCategoryUtils.defaultType( LanguageUtils.getLanguageId('zh-TW').toString() ), '一般建教案' );
            assert.equal( ProjectCategoryUtils.defaultType( LanguageUtils.getLanguageId('en-US').toString() ), 'General Projects' );
            assert.equal( ProjectCategoryUtils.defaultType( LanguageUtils.getLanguageId('zh-TW') ), '一般建教案' );
            assert.equal( ProjectCategoryUtils.defaultType( LanguageUtils.getLanguageId('en-US') ), 'General Projects' );
        })
    });

    context('defaultTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof(ProjectCategoryUtils.defaultTypeId), typeof(Number()));
        });
        it('should success', () => {
            assert.equal( ProjectCategoryUtils.defaultTypeId, 0);
        });
    });

    context('isSupportedType', () => {
        it('should return true when giving a correct object', () => {
            assert.equal( ProjectCategoryUtils.isSupportedType(correctSampleTypeA), true);
            assert.equal( ProjectCategoryUtils.isSupportedType(correctSampleTypeB), true);
            assert.equal( ProjectCategoryUtils.isSupportedType(correctSampleTypeC), true);
            assert.equal( ProjectCategoryUtils.isSupportedType(correctSampleTypeD), true);
        });
        it('should return false or throw an error when giving an incorrect object', () => {
            assert.equal( ProjectCategoryUtils.isSupportedType(wrongSampleTypeA), false);
            assert.equal( ProjectCategoryUtils.isSupportedType(wrongSampleTypeB), false);
            assert.equal( ProjectCategoryUtils.isSupportedType(wrongSampleTypeC), false);
            assert.equal( ProjectCategoryUtils.isSupportedType(wrongSampleTypeD), false);
            assert.throws( () => { ProjectCategoryUtils.isSupportedType(wrongSampleTypeE); }, TypeError);
            assert.throws( () => { ProjectCategoryUtils.isSupportedType(wrongSampleTypeF); }, TypeError);
            assert.equal( ProjectCategoryUtils.isSupportedType(wrongSampleTypeG), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( ProjectCategoryUtils.isSupportedType(String()), false );
            assert.equal( ProjectCategoryUtils.isSupportedType(Boolean()), false );
            assert.equal( ProjectCategoryUtils.isSupportedType(Number()), false );
            assert.equal( ProjectCategoryUtils.isSupportedType(Symbol()), false );
            assert.throws( () => { ProjectCategoryUtils.isSupportedType(undefined); }, TypeError );
            assert.throws( () => { ProjectCategoryUtils.isSupportedType(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( ProjectCategoryUtils.isSupportedType( correctSampleTypeA )), typeof( Boolean() ) );
        });
    });

    context('isSupportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert.equal( typeof( ProjectCategoryUtils.isSupportedTypeId( LanguageUtils.defaultTypeId )), typeof(Boolean()));
        });
        it('should return true when giving a correct argument', () => {
            assert.equal( ProjectCategoryUtils.isSupportedTypeId( 0 ), true);
            assert.equal( ProjectCategoryUtils.isSupportedTypeId( 1 ), true);
        });
        it('should return false when giving an invalid argument', () => {
            assert.equal( ProjectCategoryUtils.isSupportedTypeId( -1 ), false);
            assert.equal( ProjectCategoryUtils.isSupportedTypeId( 10000 ), false);
            assert.equal( ProjectCategoryUtils.isSupportedTypeId( '1' ), false);
        });
        it('should return false or throw an error when giving an argument of wrong type', () => {
            assert.equal( ProjectCategoryUtils.isSupportedTypeId(Symbol()), false);
            assert.equal( ProjectCategoryUtils.isSupportedTypeId(undefined), false);
            assert.equal( ProjectCategoryUtils.isSupportedTypeId(null), false);
            assert.equal( ProjectCategoryUtils.isSupportedTypeId(Boolean()), false);
            assert.equal( ProjectCategoryUtils.isSupportedTypeId(String()), false);
        });
    });

    context('supportedType', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( ProjectCategoryUtils.supportedType( LanguageUtils.defaultLanguageId ) ) );
        });
        it('should throw an error when passing invalid language id', () => {
            assert.throws( () => { ProjectCategoryUtils.supportedType( -1 ); }, TypeError);
        });
        it('should throw an error when passing arguments of wrong type', () => {
            assert.throws( () => { ProjectCategoryUtils.supportedType( {} ); }, TypeError);
            assert.throws( () => { ProjectCategoryUtils.supportedType( undefined ); }, TypeError);
            assert.throws( () => { ProjectCategoryUtils.supportedType( null ); }, TypeError);
            assert.throws( () => { ProjectCategoryUtils.supportedType( Boolean() ); }, TypeError);
            assert.throws( () => { ProjectCategoryUtils.supportedType( Symbol() ); }, TypeError);
        });
        it('should success', () => {
            assert( ProjectCategoryUtils.supportedType( LanguageUtils.getLanguageId('zh-TW').toString() ).includes('國科會計劃') );
            assert( ProjectCategoryUtils.supportedType( LanguageUtils.getLanguageId('en-US').toString() ).includes('National Science Council Projects') );
            assert( ProjectCategoryUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).includes('國科會計劃') );
            assert( ProjectCategoryUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).includes('National Science Council Projects') );
            assert.equal( 
                ProjectCategoryUtils.supportedType( LanguageUtils.getLanguageId('zh-TW') ).length,
                ProjectCategoryUtils.supportedType( LanguageUtils.getLanguageId('en-US') ).length
            );
        })
    });

    context('supportedTypeId', () => {
        it('should return the value in the correct type', () => {
            assert( Array.isArray( ProjectCategoryUtils.supportedTypeId ) );
            assert( ProjectCategoryUtils.supportedTypeId.every( (id) => { return typeof( id ) === 'number'; } ) );
        });
        it('should success', () => {
            assert.equal( ProjectCategoryUtils.supportedTypeId.length, ProjectCategoryUtils.supportedType( LanguageUtils.defaultLanguageId ).length);
        });
    });

    context('getTypeId', () => {
        it('should success', () => {
            assert.equal( ProjectCategoryUtils.getTypeId(correctSampleTypeA), correctSampleTypeA.typeId);
            assert.equal( ProjectCategoryUtils.getTypeId(correctSampleTypeB), correctSampleTypeB.typeId);
            assert.equal( ProjectCategoryUtils.getTypeId(correctSampleTypeC), correctSampleTypeC.typeId);
            assert.equal( ProjectCategoryUtils.getTypeId(correctSampleTypeD), correctSampleTypeD.typeId);
        });
        it('should throw an error when giving an incorrect object', () => {
            assert.throws( () => { ProjectCategoryUtils.getTypeId(wrongSampleTypeA); }, Error);
            assert.throws( () => { ProjectCategoryUtils.getTypeId(wrongSampleTypeB); }, Error);
            assert.throws( () => { ProjectCategoryUtils.getTypeId(wrongSampleTypeC); }, Error);
            assert.throws( () => { ProjectCategoryUtils.getTypeId(wrongSampleTypeD); }, Error);
            assert.throws( () => { ProjectCategoryUtils.getTypeId(wrongSampleTypeE); }, Error);
            assert.throws( () => { ProjectCategoryUtils.getTypeId(wrongSampleTypeF); }, Error);
            assert.throws( () => { ProjectCategoryUtils.getTypeId(wrongSampleTypeG); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { ProjectCategoryUtils.getTypeId(String()); }, TypeError );
            assert.throws( () => { ProjectCategoryUtils.getTypeId(Number()); }, TypeError );
            assert.throws( () => { ProjectCategoryUtils.getTypeId(Boolean()); }, TypeError );
            assert.throws( () => { ProjectCategoryUtils.getTypeId(Symbol()); }, TypeError );
            assert.throws( () => { ProjectCategoryUtils.getTypeId(undefined); }, TypeError );
            assert.throws( () => { ProjectCategoryUtils.getTypeId(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( ProjectCategoryUtils.getTypeId( correctSampleTypeA )), typeof( Number() ) );
        });
    });

    context('getTypeById', () => {
        it('should success', () => {
            assert.equal( ProjectCategoryUtils.getTypeById(correctSampleTypeA), correctSampleTypeA.typeName);
            assert.equal( ProjectCategoryUtils.getTypeById(correctSampleTypeB), correctSampleTypeB.typeName);
            assert.equal( ProjectCategoryUtils.getTypeById(correctSampleTypeC), correctSampleTypeC.typeName);
            assert.equal( ProjectCategoryUtils.getTypeById(correctSampleTypeD), correctSampleTypeD.typeName);
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
            assert.throws( () => { ProjectCategoryUtils.getTypeById(wrongSampleTypeH); }, Error);
            assert.throws( () => { ProjectCategoryUtils.getTypeById(wrongSampleTypeI); }, Error);
            assert.throws( () => { ProjectCategoryUtils.getTypeById(wrongSampleTypeJ); }, Error);
            assert.throws( () => { ProjectCategoryUtils.getTypeById(wrongSampleTypeK); }, Error);
            assert.throws( () => { ProjectCategoryUtils.getTypeById(wrongSampleTypeL); }, Error);
            assert.throws( () => { ProjectCategoryUtils.getTypeById(wrongSampleTypeM); }, Error);
            assert.throws( () => { ProjectCategoryUtils.getTypeById(wrongSampleTypeN); }, Error);
        });
        it('should throw an error when giving an argument of wrong type', () => {
            assert.throws( () => { ProjectCategoryUtils.getTypeById(String()); }, TypeError );
            assert.throws( () => { ProjectCategoryUtils.getTypeById(Number()); }, TypeError );
            assert.throws( () => { ProjectCategoryUtils.getTypeById(Boolean()); }, TypeError );
            assert.throws( () => { ProjectCategoryUtils.getTypeById(Symbol()); }, TypeError );
            assert.throws( () => { ProjectCategoryUtils.getTypeById(undefined); }, TypeError );
            assert.throws( () => { ProjectCategoryUtils.getTypeById(null); }, TypeError );
        });
        it('should return the value in the correct type', () => {
            assert.equal( typeof( ProjectCategoryUtils.getTypeById( correctSampleTypeA )), typeof( String() ) );
        });
    });
});