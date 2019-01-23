import chai from 'chai';

import NationUtils from 'models/faculty/utils/nation.js';
import LanguageUtils from 'models/common/utils/language.js';

const expect = chai.expect;

describe('models/faculty/utils/nation.js', () => {
    context('NationUtils.defaultNation', ()=>{
        it('should return value `undefined` when `languageId` is invalid', ()=>{
            expect(NationUtils.defaultNation(true)).to.be.undefined;
            expect(NationUtils.defaultNation(false)).to.be.undefined;
            expect(NationUtils.defaultNation({})).to.be.undefined;
            expect(NationUtils.defaultNation({failed: true})).to.be.undefined;
            expect(NationUtils.defaultNation([])).to.be.undefined;
            expect(NationUtils.defaultNation([1,2,3])).to.be.undefined;
            expect(NationUtils.defaultNation(null)).to.be.undefined;
            expect(NationUtils.defaultNation('')).to.be.undefined;
            expect(NationUtils.defaultNation('string')).to.be.undefined;
            expect(NationUtils.defaultNation('0')).to.be.undefined;
            expect(NationUtils.defaultNation('1')).to.be.undefined;
            expect(NationUtils.defaultNation(-1)).to.be.undefined;
            expect(NationUtils.defaultNation(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(NationUtils.defaultNation(Number.MAX_VALUE)).to.be.undefined;
            expect(NationUtils.defaultNation(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(NationUtils.defaultNation(Number.MIN_VALUE)).to.be.undefined;
            expect(NationUtils.defaultNation(0.1)).to.be.undefined;
            expect(NationUtils.defaultNation(-0.1)).to.be.undefined;
            expect(NationUtils.defaultNation(Number.POSITIVE_INFINITY)).to.be.undefined;
            expect(NationUtils.defaultNation(Number.NEGATIVE_INFINITY)).to.be.undefined;
            expect(NationUtils.defaultNation(Symbol())).to.be.undefined;
            expect(NationUtils.defaultNation(Symbol('string'))).to.be.undefined;
        })
        it('should return a string when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(NationUtils.defaultNation(languageId)).to.be.a('string');
            })
        })
        it('should return a string when `languageId` is not provided', ()=>{
            expect(NationUtils.defaultNation()).to.be.a('string');
        })
        it('should not return empty string', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(NationUtils.defaultNation(languageId)).to.not.empty;
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(NationUtils.supportedNation(languageId)).to.include(NationUtils.defaultNation(languageId));
            })
        })
        it('should be a pure function', ()=>{
            expect(NationUtils.defaultNation()).to.be.equal(NationUtils.defaultNation())
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(NationUtils.defaultNation(languageId)).to.be.equal(NationUtils.defaultNation(languageId));
            })
        })
    });
    context('NationUtils.defaultNationId', ()=>{
        it('should return a number', ()=>{
            expect(NationUtils.defaultNationId).to.be.a('number');
        })
        it('should be supported', ()=>{
            expect(NationUtils.supportedNationId).to.include(NationUtils.defaultNationId);
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                expect(NationUtils.defaultNationId).to.be.equal(NationUtils.defaultNationId);
            })
        })
    })
    context('NationUtils.supportedNation', ()=>{
        it('should return value `[]` when `languageId` is invalid', ()=>{
            expect(NationUtils.supportedNation(true)).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(false)).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation({})).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation({failed: true})).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation([])).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation([1,2,3])).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(null)).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation('')).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation('string')).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation('0')).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation('1')).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(-1)).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(Number.MAX_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(Number.MAX_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(Number.POSITIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(Number.MIN_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(-0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(Number.MIN_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(Number.NEGATIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(Symbol())).to.be.instanceOf(Array).that.is.empty;
            expect(NationUtils.supportedNation(Symbol('string'))).to.be.instanceOf(Array).that.is.empty;
        })
        it('should return an array of string of supported nation when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(NationUtils.supportedNation(languageId)).to.be.instanceOf(Array);
                NationUtils.supportedNation(languageId).map(nation=>{
                    expect(nation).to.be.a('string')
                })
            })
        })
        it('should return an array of string of supported nation when `languageId` is not provided', ()=>{
            expect(NationUtils.supportedNation()).to.be.instanceOf(Array);
            NationUtils.supportedNation().map(nation=>{
                expect(nation).to.be.a('string')
            })
        })
        it('should have same number of supported nation for all language',()=>{
            const sameLength = NationUtils.supportedNation().length;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(NationUtils.supportedNation(languageId)).to.have.lengthOf(sameLength);
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                NationUtils.supportedNation(languageId).map(nation=>{
                    expect(NationUtils.isSupportedNation({nation, languageId})).to.be.true;
                })
            })
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(NationUtils.supportedNation(languageId)).to.deep.equal(NationUtils.supportedNation(languageId));
            })
        })
        it('should be an unforzen array', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(NationUtils.supportedNation(languageId)).to.not.frozen;
            })
        })
    })
    context('NationUtils.supportedNationId', ()=>{
        it('should return an array of number', ()=>{
            expect(NationUtils.supportedNationId).to.be.instanceOf(Array);
            NationUtils.supportedNationId.map(nationId=>{
                expect(nationId).to.be.a('number')
            })
        })
        it('should be supported', ()=>{
            NationUtils.supportedNationId.map(nationId=>{
                expect(NationUtils.isSupportedNationId(nationId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            expect(NationUtils.supportedNationId).to.deep.equal(NationUtils.supportedNationId);
        })
        it('should be an unforzen array', ()=>{
            expect(NationUtils.supportedNationId).to.not.frozen;
        })
    })
    context('NationUtils.isSupportedNation', ()=>{
        it('should return false when invalid input is provided', ()=>{
            expect(NationUtils.isSupportedNation()).to.be.false;
            expect(NationUtils.isSupportedNation(undefined)).to.be.false;
            expect(NationUtils.isSupportedNation(true)).to.be.false;
            expect(NationUtils.isSupportedNation(false)).to.be.false;
            expect(NationUtils.isSupportedNation({})).to.be.false;
            expect(NationUtils.isSupportedNation({failed:true})).to.be.false;
            expect(NationUtils.isSupportedNation([])).to.be.false;
            expect(NationUtils.isSupportedNation([1,2,3])).to.be.false;
            expect(NationUtils.isSupportedNation(null)).to.be.false;
            expect(NationUtils.isSupportedNation('')).to.be.false;
            expect(NationUtils.isSupportedNation('0')).to.be.false;
            expect(NationUtils.isSupportedNation('1')).to.be.false;
            expect(NationUtils.isSupportedNation('string')).to.be.false;
            expect(NationUtils.isSupportedNation(0)).to.be.false;
            expect(NationUtils.isSupportedNation(1)).to.be.false;
            expect(NationUtils.isSupportedNation(-1)).to.be.false;
            expect(NationUtils.isSupportedNation(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(NationUtils.isSupportedNation(Number.MAX_VALUE)).to.be.false;
            expect(NationUtils.isSupportedNation(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(NationUtils.isSupportedNation(Number.MIN_VALUE)).to.be.false;
            expect(NationUtils.isSupportedNation(0.1)).to.be.false;
            expect(NationUtils.isSupportedNation(-0.1)).to.be.false;
            expect(NationUtils.isSupportedNation(Symbol())).to.be.false;
            expect(NationUtils.isSupportedNation(Symbol('string'))).to.be.false;
        })
        it('should return false when only `nation` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                NationUtils.supportedNation(languageId).map(nation=>{
                    expect(NationUtils.isSupportedNation({nation})).to.be.false;
                })
            })
        })
        it('should return false when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                NationUtils.supportedNation(languageId).map(()=>{
                    expect(NationUtils.isSupportedNation({languageId})).to.be.false;
                })
            })
        })
        it('should return true when both `nation` and `languageId` are valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                NationUtils.supportedNation(languageId).map(nation=>{
                    expect(NationUtils.isSupportedNation({nation,languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                NationUtils.supportedNation(languageId).map(nation=>{
                    expect(NationUtils.isSupportedNation({nation,languageId})).to.equal(NationUtils.isSupportedNation({nation,languageId}));
                })
            })
        })
    })
    context('NationUtils.isSupportedNationId', ()=>{
        it('should return false when `nationId` is invalid', ()=>{
            expect(NationUtils.isSupportedNationId()).to.be.false;
            expect(NationUtils.isSupportedNationId(undefined)).to.be.false;
            expect(NationUtils.isSupportedNationId(true)).to.be.false;
            expect(NationUtils.isSupportedNationId(false)).to.be.false;
            expect(NationUtils.isSupportedNationId({})).to.be.false;
            expect(NationUtils.isSupportedNationId({failed:true})).to.be.false;
            expect(NationUtils.isSupportedNationId([])).to.be.false;
            expect(NationUtils.isSupportedNationId([1,2,3])).to.be.false;
            expect(NationUtils.isSupportedNationId(null)).to.be.false;
            expect(NationUtils.isSupportedNationId('')).to.be.false;
            expect(NationUtils.isSupportedNationId('0')).to.be.false;
            expect(NationUtils.isSupportedNationId('1')).to.be.false;
            expect(NationUtils.isSupportedNationId('string')).to.be.false;
            expect(NationUtils.isSupportedNationId(-1)).to.be.false;
            expect(NationUtils.isSupportedNationId(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(NationUtils.isSupportedNationId(Number.MAX_VALUE)).to.be.false;
            expect(NationUtils.isSupportedNationId(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(NationUtils.isSupportedNationId(Number.MIN_VALUE)).to.be.false;
            expect(NationUtils.isSupportedNationId(0.1)).to.be.false;
            expect(NationUtils.isSupportedNationId(-0.1)).to.be.false;
            expect(NationUtils.isSupportedNationId(Symbol())).to.be.false;
            expect(NationUtils.isSupportedNationId(Symbol('string'))).to.be.false;
        })
        it('should return true when `nationId` is valid', ()=>{
            NationUtils.supportedNationId.map(nationId=>{
                expect(NationUtils.isSupportedNationId(nationId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            NationUtils.supportedNationId.map(nationId=>{
                expect(NationUtils.isSupportedNationId(nationId)).to.equal(NationUtils.isSupportedNationId(nationId));
            })
        })
    })
    context('NationUtils.getNationId', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(NationUtils.getNationId()).to.be.undefined;
            expect(NationUtils.getNationId(undefined)).to.be.undefined;
            expect(NationUtils.getNationId(true)).to.be.undefined;
            expect(NationUtils.getNationId(false)).to.be.undefined;
            expect(NationUtils.getNationId({})).to.be.undefined;
            expect(NationUtils.getNationId({failed:true})).to.be.undefined;
            expect(NationUtils.getNationId([])).to.be.undefined;
            expect(NationUtils.getNationId([1,2,3])).to.be.undefined;
            expect(NationUtils.getNationId(null)).to.be.undefined;
            expect(NationUtils.getNationId('')).to.be.undefined;
            expect(NationUtils.getNationId('0')).to.be.undefined;
            expect(NationUtils.getNationId('1')).to.be.undefined;
            expect(NationUtils.getNationId('string')).to.be.undefined;
            expect(NationUtils.getNationId(0)).to.be.undefined;
            expect(NationUtils.getNationId(1)).to.be.undefined;
            expect(NationUtils.getNationId(-1)).to.be.undefined;
            expect(NationUtils.getNationId(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(NationUtils.getNationId(Number.MAX_VALUE)).to.be.undefined;
            expect(NationUtils.getNationId(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(NationUtils.getNationId(Number.MIN_VALUE)).to.be.undefined;
            expect(NationUtils.getNationId(0.1)).to.be.undefined;
            expect(NationUtils.getNationId(-0.1)).to.be.undefined;
            expect(NationUtils.getNationId(Symbol())).to.be.undefined;
            expect(NationUtils.getNationId(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `nation` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                NationUtils.supportedNation(languageId).map(nation=>{
                    expect(NationUtils.getNationId({nation})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                NationUtils.supportedNation(languageId).map(()=>{
                    expect(NationUtils.getNationId({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a number represent `nationId` when both `nation` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                NationUtils.supportedNation(languageId).map(nation=>{
                    const nationId = NationUtils.getNationId({nation, languageId})
                    expect(nationId).to.be.a('number');
                    expect(NationUtils.isSupportedNationId(nationId)).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                NationUtils.supportedNation(languageId).map(nation=>{
                    expect(NationUtils.getNationId({nation, languageId})).to.equal(NationUtils.getNationId({nation, languageId}))
                })
            })
        })
    })
    context('NationUtils.getNationById', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(NationUtils.getNationById()).to.be.undefined;
            expect(NationUtils.getNationById(undefined)).to.be.undefined;
            expect(NationUtils.getNationById(true)).to.be.undefined;
            expect(NationUtils.getNationById(false)).to.be.undefined;
            expect(NationUtils.getNationById({})).to.be.undefined;
            expect(NationUtils.getNationById({failed:true})).to.be.undefined;
            expect(NationUtils.getNationById([])).to.be.undefined;
            expect(NationUtils.getNationById([1,2,3])).to.be.undefined;
            expect(NationUtils.getNationById(null)).to.be.undefined;
            expect(NationUtils.getNationById('')).to.be.undefined;
            expect(NationUtils.getNationById('0')).to.be.undefined;
            expect(NationUtils.getNationById('1')).to.be.undefined;
            expect(NationUtils.getNationById('string')).to.be.undefined;
            expect(NationUtils.getNationById(-1)).to.be.undefined;
            expect(NationUtils.getNationById(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(NationUtils.getNationById(Number.MAX_VALUE)).to.be.undefined;
            expect(NationUtils.getNationById(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(NationUtils.getNationById(Number.MIN_VALUE)).to.be.undefined;
            expect(NationUtils.getNationById(0.1)).to.be.undefined;
            expect(NationUtils.getNationById(-0.1)).to.be.undefined;
            expect(NationUtils.getNationById(Symbol())).to.be.undefined;
            expect(NationUtils.getNationById(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `nationId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                NationUtils.supportedNationId.map(nationId=>{
                    expect(NationUtils.getNationById({nationId})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                NationUtils.supportedNationId.map(()=>{
                    expect(NationUtils.getNationById({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a string represent `nation` when both `nationId` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                NationUtils.supportedNationId.map(nationId=>{
                    const nation = NationUtils.getNationById({nationId, languageId})
                    expect(nation).to.be.a('string');
                    expect(NationUtils.isSupportedNation({nation, languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                NationUtils.supportedNationId.map(nationId=>{
                    expect(NationUtils.getNationById({nationId, languageId})).to.equal(NationUtils.getNationById({nationId, languageId}))
                })
            })
        })
    })
});
