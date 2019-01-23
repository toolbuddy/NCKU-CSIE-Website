import chai from 'chai';

import DegreeUtils from 'models/faculty/utils/degree.js';
import LanguageUtils from 'models/common/utils/language.js';

const expect = chai.expect;

describe('models/faculty/utils/degree.js', () => {
    context('DegreeUtils.defaultDegree', ()=>{
        it('should return value `undefined` when `languageId` is invalid', ()=>{
            expect(DegreeUtils.defaultDegree(true)).to.be.undefined;
            expect(DegreeUtils.defaultDegree(false)).to.be.undefined;
            expect(DegreeUtils.defaultDegree({})).to.be.undefined;
            expect(DegreeUtils.defaultDegree({failed: true})).to.be.undefined;
            expect(DegreeUtils.defaultDegree([])).to.be.undefined;
            expect(DegreeUtils.defaultDegree([1,2,3])).to.be.undefined;
            expect(DegreeUtils.defaultDegree(null)).to.be.undefined;
            expect(DegreeUtils.defaultDegree('')).to.be.undefined;
            expect(DegreeUtils.defaultDegree('string')).to.be.undefined;
            expect(DegreeUtils.defaultDegree('0')).to.be.undefined;
            expect(DegreeUtils.defaultDegree('1')).to.be.undefined;
            expect(DegreeUtils.defaultDegree(-1)).to.be.undefined;
            expect(DegreeUtils.defaultDegree(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(DegreeUtils.defaultDegree(Number.MAX_VALUE)).to.be.undefined;
            expect(DegreeUtils.defaultDegree(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(DegreeUtils.defaultDegree(Number.MIN_VALUE)).to.be.undefined;
            expect(DegreeUtils.defaultDegree(0.1)).to.be.undefined;
            expect(DegreeUtils.defaultDegree(-0.1)).to.be.undefined;
            expect(DegreeUtils.defaultDegree(Number.POSITIVE_INFINITY)).to.be.undefined;
            expect(DegreeUtils.defaultDegree(Number.NEGATIVE_INFINITY)).to.be.undefined;
            expect(DegreeUtils.defaultDegree(Symbol())).to.be.undefined;
            expect(DegreeUtils.defaultDegree(Symbol('string'))).to.be.undefined;
        })
        it('should return a string when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DegreeUtils.defaultDegree(languageId)).to.be.a('string');
            })
        })
        it('should return a string when `languageId` is not provided', ()=>{
            expect(DegreeUtils.defaultDegree()).to.be.a('string');
        })
        it('should not return empty string', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DegreeUtils.defaultDegree(languageId)).to.not.empty;
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DegreeUtils.supportedDegree(languageId)).to.include(DegreeUtils.defaultDegree(languageId));
            })
        })
        it('should be a pure function', ()=>{
            expect(DegreeUtils.defaultDegree()).to.be.equal(DegreeUtils.defaultDegree())
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DegreeUtils.defaultDegree(languageId)).to.be.equal(DegreeUtils.defaultDegree(languageId));
            })
        })
    });
    context('DegreeUtils.defaultDegreeId', ()=>{
        it('should return a number', ()=>{
            expect(DegreeUtils.defaultDegreeId).to.be.a('number');
        })
        it('should be supported', ()=>{
            expect(DegreeUtils.supportedDegreeId).to.include(DegreeUtils.defaultDegreeId);
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                expect(DegreeUtils.defaultDegreeId).to.be.equal(DegreeUtils.defaultDegreeId);
            })
        })
    })
    context('DegreeUtils.supportedDegree', ()=>{
        it('should return value `[]` when `languageId` is invalid', ()=>{
            expect(DegreeUtils.supportedDegree(true)).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(false)).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree({})).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree({failed: true})).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree([])).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree([1,2,3])).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(null)).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree('')).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree('string')).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree('0')).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree('1')).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(-1)).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(Number.MAX_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(Number.MAX_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(Number.POSITIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(Number.MIN_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(-0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(Number.MIN_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(Number.NEGATIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(Symbol())).to.be.instanceOf(Array).that.is.empty;
            expect(DegreeUtils.supportedDegree(Symbol('string'))).to.be.instanceOf(Array).that.is.empty;
        })
        it('should return an array of string of supported degree when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DegreeUtils.supportedDegree(languageId)).to.be.instanceOf(Array);
                DegreeUtils.supportedDegree(languageId).map(degree=>{
                    expect(degree).to.be.a('string')
                })
            })
        })
        it('should return an array of string of supported degree when `languageId` is not provided', ()=>{
            expect(DegreeUtils.supportedDegree()).to.be.instanceOf(Array);
            DegreeUtils.supportedDegree().map(degree=>{
                expect(degree).to.be.a('string')
            })
        })
        it('should have same number of supported degree for all language',()=>{
            const sameLength = DegreeUtils.supportedDegree().length;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DegreeUtils.supportedDegree(languageId)).to.have.lengthOf(sameLength);
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DegreeUtils.supportedDegree(languageId).map(degree=>{
                    expect(DegreeUtils.isSupportedDegree({degree, languageId})).to.be.true;
                })
            })
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DegreeUtils.supportedDegree(languageId)).to.deep.equal(DegreeUtils.supportedDegree(languageId));
            })
        })
        it('should be an unforzen array', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DegreeUtils.supportedDegree(languageId)).to.not.frozen;
            })
        })
    })
    context('DegreeUtils.supportedDegreeId', ()=>{
        it('should return an array of number', ()=>{
            expect(DegreeUtils.supportedDegreeId).to.be.instanceOf(Array);
            DegreeUtils.supportedDegreeId.map(degreeId=>{
                expect(degreeId).to.be.a('number')
            })
        })
        it('should be supported', ()=>{
            DegreeUtils.supportedDegreeId.map(degreeId=>{
                expect(DegreeUtils.isSupportedDegreeId(degreeId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            expect(DegreeUtils.supportedDegreeId).to.deep.equal(DegreeUtils.supportedDegreeId);
        })
        it('should be an unforzen array', ()=>{
            expect(DegreeUtils.supportedDegreeId).to.not.frozen;
        })
    })
    context('DegreeUtils.isSupportedDegree', ()=>{
        it('should return false when invalid input is provided', ()=>{
            expect(DegreeUtils.isSupportedDegree()).to.be.false;
            expect(DegreeUtils.isSupportedDegree(undefined)).to.be.false;
            expect(DegreeUtils.isSupportedDegree(true)).to.be.false;
            expect(DegreeUtils.isSupportedDegree(false)).to.be.false;
            expect(DegreeUtils.isSupportedDegree({})).to.be.false;
            expect(DegreeUtils.isSupportedDegree({failed:true})).to.be.false;
            expect(DegreeUtils.isSupportedDegree([])).to.be.false;
            expect(DegreeUtils.isSupportedDegree([1,2,3])).to.be.false;
            expect(DegreeUtils.isSupportedDegree(null)).to.be.false;
            expect(DegreeUtils.isSupportedDegree('')).to.be.false;
            expect(DegreeUtils.isSupportedDegree('0')).to.be.false;
            expect(DegreeUtils.isSupportedDegree('1')).to.be.false;
            expect(DegreeUtils.isSupportedDegree('string')).to.be.false;
            expect(DegreeUtils.isSupportedDegree(0)).to.be.false;
            expect(DegreeUtils.isSupportedDegree(1)).to.be.false;
            expect(DegreeUtils.isSupportedDegree(-1)).to.be.false;
            expect(DegreeUtils.isSupportedDegree(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(DegreeUtils.isSupportedDegree(Number.MAX_VALUE)).to.be.false;
            expect(DegreeUtils.isSupportedDegree(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(DegreeUtils.isSupportedDegree(Number.MIN_VALUE)).to.be.false;
            expect(DegreeUtils.isSupportedDegree(0.1)).to.be.false;
            expect(DegreeUtils.isSupportedDegree(-0.1)).to.be.false;
            expect(DegreeUtils.isSupportedDegree(Symbol())).to.be.false;
            expect(DegreeUtils.isSupportedDegree(Symbol('string'))).to.be.false;
        })
        it('should return false when only `degree` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DegreeUtils.supportedDegree(languageId).map(degree=>{
                    expect(DegreeUtils.isSupportedDegree({degree})).to.be.false;
                })
            })
        })
        it('should return false when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DegreeUtils.supportedDegree(languageId).map(()=>{
                    expect(DegreeUtils.isSupportedDegree({languageId})).to.be.false;
                })
            })
        })
        it('should return true when both `degree` and `languageId` are valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DegreeUtils.supportedDegree(languageId).map(degree=>{
                    expect(DegreeUtils.isSupportedDegree({degree,languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DegreeUtils.supportedDegree(languageId).map(degree=>{
                    expect(DegreeUtils.isSupportedDegree({degree,languageId})).to.equal(DegreeUtils.isSupportedDegree({degree,languageId}));
                })
            })
        })
    })
    context('DegreeUtils.isSupportedDegreeId', ()=>{
        it('should return false when `degreeId` is invalid', ()=>{
            expect(DegreeUtils.isSupportedDegreeId()).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(undefined)).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(true)).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(false)).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId({})).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId({failed:true})).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId([])).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId([1,2,3])).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(null)).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId('')).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId('0')).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId('1')).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId('string')).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(-1)).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(Number.MAX_VALUE)).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(Number.MIN_VALUE)).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(0.1)).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(-0.1)).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(Symbol())).to.be.false;
            expect(DegreeUtils.isSupportedDegreeId(Symbol('string'))).to.be.false;
        })
        it('should return true when `degreeId` is valid', ()=>{
            DegreeUtils.supportedDegreeId.map(degreeId=>{
                expect(DegreeUtils.isSupportedDegreeId(degreeId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            DegreeUtils.supportedDegreeId.map(degreeId=>{
                expect(DegreeUtils.isSupportedDegreeId(degreeId)).to.equal(DegreeUtils.isSupportedDegreeId(degreeId));
            })
        })
    })
    context('DegreeUtils.getDegreeId', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(DegreeUtils.getDegreeId()).to.be.undefined;
            expect(DegreeUtils.getDegreeId(undefined)).to.be.undefined;
            expect(DegreeUtils.getDegreeId(true)).to.be.undefined;
            expect(DegreeUtils.getDegreeId(false)).to.be.undefined;
            expect(DegreeUtils.getDegreeId({})).to.be.undefined;
            expect(DegreeUtils.getDegreeId({failed:true})).to.be.undefined;
            expect(DegreeUtils.getDegreeId([])).to.be.undefined;
            expect(DegreeUtils.getDegreeId([1,2,3])).to.be.undefined;
            expect(DegreeUtils.getDegreeId(null)).to.be.undefined;
            expect(DegreeUtils.getDegreeId('')).to.be.undefined;
            expect(DegreeUtils.getDegreeId('0')).to.be.undefined;
            expect(DegreeUtils.getDegreeId('1')).to.be.undefined;
            expect(DegreeUtils.getDegreeId('string')).to.be.undefined;
            expect(DegreeUtils.getDegreeId(0)).to.be.undefined;
            expect(DegreeUtils.getDegreeId(1)).to.be.undefined;
            expect(DegreeUtils.getDegreeId(-1)).to.be.undefined;
            expect(DegreeUtils.getDegreeId(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(DegreeUtils.getDegreeId(Number.MAX_VALUE)).to.be.undefined;
            expect(DegreeUtils.getDegreeId(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(DegreeUtils.getDegreeId(Number.MIN_VALUE)).to.be.undefined;
            expect(DegreeUtils.getDegreeId(0.1)).to.be.undefined;
            expect(DegreeUtils.getDegreeId(-0.1)).to.be.undefined;
            expect(DegreeUtils.getDegreeId(Symbol())).to.be.undefined;
            expect(DegreeUtils.getDegreeId(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `degree` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DegreeUtils.supportedDegree(languageId).map(degree=>{
                    expect(DegreeUtils.getDegreeId({degree})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DegreeUtils.supportedDegree(languageId).map(()=>{
                    expect(DegreeUtils.getDegreeId({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a number represent `degreeId` when both `degree` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DegreeUtils.supportedDegree(languageId).map(degree=>{
                    const degreeId = DegreeUtils.getDegreeId({degree, languageId})
                    expect(degreeId).to.be.a('number');
                    expect(DegreeUtils.isSupportedDegreeId(degreeId)).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DegreeUtils.supportedDegree(languageId).map(degree=>{
                    expect(DegreeUtils.getDegreeId({degree, languageId})).to.equal(DegreeUtils.getDegreeId({degree, languageId}))
                })
            })
        })
    })
    context('DegreeUtils.getDegreeById', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(DegreeUtils.getDegreeById()).to.be.undefined;
            expect(DegreeUtils.getDegreeById(undefined)).to.be.undefined;
            expect(DegreeUtils.getDegreeById(true)).to.be.undefined;
            expect(DegreeUtils.getDegreeById(false)).to.be.undefined;
            expect(DegreeUtils.getDegreeById({})).to.be.undefined;
            expect(DegreeUtils.getDegreeById({failed:true})).to.be.undefined;
            expect(DegreeUtils.getDegreeById([])).to.be.undefined;
            expect(DegreeUtils.getDegreeById([1,2,3])).to.be.undefined;
            expect(DegreeUtils.getDegreeById(null)).to.be.undefined;
            expect(DegreeUtils.getDegreeById('')).to.be.undefined;
            expect(DegreeUtils.getDegreeById('0')).to.be.undefined;
            expect(DegreeUtils.getDegreeById('1')).to.be.undefined;
            expect(DegreeUtils.getDegreeById('string')).to.be.undefined;
            expect(DegreeUtils.getDegreeById(-1)).to.be.undefined;
            expect(DegreeUtils.getDegreeById(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(DegreeUtils.getDegreeById(Number.MAX_VALUE)).to.be.undefined;
            expect(DegreeUtils.getDegreeById(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(DegreeUtils.getDegreeById(Number.MIN_VALUE)).to.be.undefined;
            expect(DegreeUtils.getDegreeById(0.1)).to.be.undefined;
            expect(DegreeUtils.getDegreeById(-0.1)).to.be.undefined;
            expect(DegreeUtils.getDegreeById(Symbol())).to.be.undefined;
            expect(DegreeUtils.getDegreeById(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `degreeId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                DegreeUtils.supportedDegreeId.map(degreeId=>{
                    expect(DegreeUtils.getDegreeById({degreeId})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DegreeUtils.supportedDegreeId.map(()=>{
                    expect(DegreeUtils.getDegreeById({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a string represent `degree` when both `degreeId` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DegreeUtils.supportedDegreeId.map(degreeId=>{
                    const degree = DegreeUtils.getDegreeById({degreeId, languageId})
                    expect(degree).to.be.a('string');
                    expect(DegreeUtils.isSupportedDegree({degree, languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DegreeUtils.supportedDegreeId.map(degreeId=>{
                    expect(DegreeUtils.getDegreeById({degreeId, languageId})).to.equal(DegreeUtils.getDegreeById({degreeId, languageId}))
                })
            })
        })
    })
});
