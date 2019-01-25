import chai from 'chai';

import LanguageUtils from 'models/common/utils/language.js';

const expect = chai.expect;

describe('models/common/utils/language.js', () => {
    context('LanguageUtils.defaultLanguage', ()=>{
        it('should return a string', ()=>{
            expect(LanguageUtils.defaultLanguage).to.be.a('string');
        })
        it('should not be an empty string', ()=>{
            expect(LanguageUtils.defaultLanguage).to.not.empty;
        })
        it('should be a pure function', ()=>{
            expect(LanguageUtils.defaultLanguage).to.equal(LanguageUtils.defaultLanguage);
        })
    });
    context('LanguageUtils.defaultLanguageId', ()=>{
        it('should return a number', ()=>{
            expect(LanguageUtils.defaultLanguageId).to.be.a('number');
        })
        it('should be a pure function', ()=>{
            expect(LanguageUtils.defaultLanguageId).to.equal(LanguageUtils.defaultLanguageId);
        })
    })
    context('LanguageUtils.supportedLanguage', ()=>{
        it('should return an array of string', ()=>{
            const supportedLanguage = LanguageUtils.supportedLanguage;
            expect(supportedLanguage).to.be.instanceOf(Array)
            supportedLanguage.map(language=>{
                expect(language).to.be.a('string');
            })
        })
        it('should support default language', ()=>{
            expect(LanguageUtils.supportedLanguage).to.include(LanguageUtils.defaultLanguage)
        })
        it('should be a pure function', ()=>{
            expect(LanguageUtils.supportedLanguage).to.deep.equal(LanguageUtils.supportedLanguage);
        })
        it('should be an unforzen array', ()=>{
            expect(LanguageUtils.supportedLanguage).to.not.frozen;
        })
    })
    context('LanguageUtils.supportedLanguageId', ()=>{
        it('should return an array of number', ()=>{
            const supportedLanguageId = LanguageUtils.supportedLanguageId;
            expect(supportedLanguageId).to.be.instanceOf(Array)
            supportedLanguageId.map(languageId=>{
                expect(languageId).to.be.a('number');
            })
        })
        it('should support default languageId', ()=>{
            expect(LanguageUtils.supportedLanguageId).to.include(LanguageUtils.defaultLanguageId)
        })
        it('should be a pure function', ()=>{
            expect(LanguageUtils.supportedLanguageId).to.deep.equal(LanguageUtils.supportedLanguageId);
        })
        it('should be an unforzen array', ()=>{
            expect(LanguageUtils.supportedLanguageId).to.not.frozen;
        })
    })
    context('LanguageUtils.isSupportedLanguage', ()=>{
        it('should return false when `language` is invalid', ()=>{
            expect(LanguageUtils.isSupportedLanguage()).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(undefined)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(true)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(false)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage({})).to.be.false;
            expect(LanguageUtils.isSupportedLanguage({failed:true})).to.be.false;
            expect(LanguageUtils.isSupportedLanguage([])).to.be.false;
            expect(LanguageUtils.isSupportedLanguage([1,2,3])).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(null)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage('')).to.be.false;
            expect(LanguageUtils.isSupportedLanguage('0')).to.be.false;
            expect(LanguageUtils.isSupportedLanguage('1')).to.be.false;
            expect(LanguageUtils.isSupportedLanguage('string')).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(0)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(1)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(-1)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(Number.MAX_VALUE)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(Number.MIN_VALUE)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(0.1)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(-0.1)).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(Symbol())).to.be.false;
            expect(LanguageUtils.isSupportedLanguage(Symbol('string'))).to.be.false;
        })
        it('should return true when `language` is valid', ()=>{
            LanguageUtils.supportedLanguage.map(language=>{
                expect(LanguageUtils.isSupportedLanguage(language)).to.be.true;
            })
        })
        it('should return true when `language` is `LanguageUtils.defaultLanguage`', ()=>{
            expect(LanguageUtils.isSupportedLanguage(LanguageUtils.defaultLanguage)).to.be.true;
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguage.map(language=>{
                expect(LanguageUtils.isSupportedLanguage(language)).to.equal(LanguageUtils.isSupportedLanguage(language));
            })
        })
    })
    context('LanguageUtils.isSupportedLanguageId', ()=>{
        it('should return false when `languageId` is invalid', ()=>{
            expect(LanguageUtils.isSupportedLanguageId()).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(undefined)).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(true)).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(false)).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId({})).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId({failed:true})).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId([])).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId([1,2,3])).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(null)).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId('')).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId('0')).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId('1')).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId('string')).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(-1)).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(Number.MAX_VALUE)).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(Number.MIN_VALUE)).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(0.1)).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(-0.1)).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(Symbol())).to.be.false;
            expect(LanguageUtils.isSupportedLanguageId(Symbol('string'))).to.be.false;
        })
        it('should return true when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(LanguageUtils.isSupportedLanguageId(languageId)).to.be.true;
            })
        })
        it('should return true when `languageId` is `LanguageUtils.defaultLanguageId`', ()=>{
            expect(LanguageUtils.isSupportedLanguageId(LanguageUtils.defaultLanguageId)).to.be.true;
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(LanguageUtils.isSupportedLanguageId(languageId)).to.equal(LanguageUtils.isSupportedLanguageId(languageId));
            })
        })
    })
    context('LanguageUtils.getLanguageId', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(LanguageUtils.getLanguageId()).to.be.undefined;
            expect(LanguageUtils.getLanguageId(undefined)).to.be.undefined;
            expect(LanguageUtils.getLanguageId(true)).to.be.undefined;
            expect(LanguageUtils.getLanguageId(false)).to.be.undefined;
            expect(LanguageUtils.getLanguageId({})).to.be.undefined;
            expect(LanguageUtils.getLanguageId({failed:true})).to.be.undefined;
            expect(LanguageUtils.getLanguageId([])).to.be.undefined;
            expect(LanguageUtils.getLanguageId([1,2,3])).to.be.undefined;
            expect(LanguageUtils.getLanguageId(null)).to.be.undefined;
            expect(LanguageUtils.getLanguageId('')).to.be.undefined;
            expect(LanguageUtils.getLanguageId('0')).to.be.undefined;
            expect(LanguageUtils.getLanguageId('1')).to.be.undefined;
            expect(LanguageUtils.getLanguageId('string')).to.be.undefined;
            expect(LanguageUtils.getLanguageId(0)).to.be.undefined;
            expect(LanguageUtils.getLanguageId(1)).to.be.undefined;
            expect(LanguageUtils.getLanguageId(-1)).to.be.undefined;
            expect(LanguageUtils.getLanguageId(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(LanguageUtils.getLanguageId(Number.MAX_VALUE)).to.be.undefined;
            expect(LanguageUtils.getLanguageId(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(LanguageUtils.getLanguageId(Number.MIN_VALUE)).to.be.undefined;
            expect(LanguageUtils.getLanguageId(0.1)).to.be.undefined;
            expect(LanguageUtils.getLanguageId(-0.1)).to.be.undefined;
            expect(LanguageUtils.getLanguageId(Symbol())).to.be.undefined;
            expect(LanguageUtils.getLanguageId(Symbol('string'))).to.be.undefined;
        })
        it('should return a number represent `languageId` when `language` is valid', ()=>{
            LanguageUtils.supportedLanguage.map(language=>{
                const languageId = LanguageUtils.getLanguageId(language)
                expect(languageId).to.be.a('number');
                expect(LanguageUtils.isSupportedLanguageId(languageId)).to.be.true;
            })
        })
        it('should return a number represent `languageId` when `language` is `LanguageUtils.defaultLanguage`', ()=>{
            const languageId = LanguageUtils.getLanguageId(LanguageUtils.defaultLanguage)
            expect(languageId).to.be.a('number');
            expect(LanguageUtils.isSupportedLanguageId(languageId)).to.be.true;
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguage.map(language=>{
                expect(LanguageUtils.getLanguageId(language)).to.equal(LanguageUtils.getLanguageId(language))
            })
        })
    })
    context('LanguageUtils.getLanguageById', ()=>{
        it('should return value `undefined` when `languageId` is invalid', ()=>{
            expect(LanguageUtils.getLanguageById()).to.be.undefined;
            expect(LanguageUtils.getLanguageById(undefined)).to.be.undefined;
            expect(LanguageUtils.getLanguageById(true)).to.be.undefined;
            expect(LanguageUtils.getLanguageById(false)).to.be.undefined;
            expect(LanguageUtils.getLanguageById({})).to.be.undefined;
            expect(LanguageUtils.getLanguageById({failed:true})).to.be.undefined;
            expect(LanguageUtils.getLanguageById([])).to.be.undefined;
            expect(LanguageUtils.getLanguageById([1,2,3])).to.be.undefined;
            expect(LanguageUtils.getLanguageById(null)).to.be.undefined;
            expect(LanguageUtils.getLanguageById('')).to.be.undefined;
            expect(LanguageUtils.getLanguageById('0')).to.be.undefined;
            expect(LanguageUtils.getLanguageById('1')).to.be.undefined;
            expect(LanguageUtils.getLanguageById('string')).to.be.undefined;
            expect(LanguageUtils.getLanguageById(-1)).to.be.undefined;
            expect(LanguageUtils.getLanguageById(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(LanguageUtils.getLanguageById(Number.MAX_VALUE)).to.be.undefined;
            expect(LanguageUtils.getLanguageById(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(LanguageUtils.getLanguageById(Number.MIN_VALUE)).to.be.undefined;
            expect(LanguageUtils.getLanguageById(0.1)).to.be.undefined;
            expect(LanguageUtils.getLanguageById(-0.1)).to.be.undefined;
            expect(LanguageUtils.getLanguageById(Symbol())).to.be.undefined;
            expect(LanguageUtils.getLanguageById(Symbol('string'))).to.be.undefined;
        })
        it('should return a string represent `language` when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                const language = LanguageUtils.getLanguageById(languageId)
                expect(language).to.be.a('string');
                expect(LanguageUtils.isSupportedLanguage(language)).to.be.true;
            })
        })
        it('should return a string represent `language` when `language` is `LanguageUtils.defaultLanguageId`', ()=>{
            const language = LanguageUtils.getLanguageById(LanguageUtils.defaultLanguageId)
            expect(language).to.be.a('string');
            expect(LanguageUtils.isSupportedLanguage(language)).to.be.true;
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(LanguageUtils.getLanguageById(languageId)).to.equal(LanguageUtils.getLanguageById(languageId))
            })
        })
    })
});
