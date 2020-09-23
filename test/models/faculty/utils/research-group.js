import chai from 'chai';

import ResearchGroupUtils from 'models/faculty/utils/research-group.js';
import LanguageUtils from 'models/common/utils/language.js';

const expect = chai.expect;

describe('models/faculty/utils/researchGroup.js', () => {
    context('ResearchGroupUtils.defaultResearchGroup', ()=>{
        it('should return value `undefined` when `languageId` is invalid', ()=>{
            expect(ResearchGroupUtils.defaultResearchGroup(true)).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(false)).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup({})).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup({failed: true})).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup([])).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup([1,2,3])).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(null)).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup('')).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup('string')).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup('0')).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup('1')).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(-1)).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(Number.MAX_VALUE)).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(Number.MIN_VALUE)).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(0.1)).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(-0.1)).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(Number.POSITIVE_INFINITY)).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(Number.NEGATIVE_INFINITY)).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(Symbol())).to.be.undefined;
            expect(ResearchGroupUtils.defaultResearchGroup(Symbol('string'))).to.be.undefined;
        })
        it('should return a string when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ResearchGroupUtils.defaultResearchGroup(languageId)).to.be.a('string');
            })
        })
        it('should return a string when `languageId` is not provided', ()=>{
            expect(ResearchGroupUtils.defaultResearchGroup()).to.be.a('string');
        })
        it('should not return empty string', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ResearchGroupUtils.defaultResearchGroup(languageId)).to.not.empty;
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ResearchGroupUtils.supportedResearchGroup(languageId)).to.include(ResearchGroupUtils.defaultResearchGroup(languageId));
            })
        })
        it('should be a pure function', ()=>{
            expect(ResearchGroupUtils.defaultResearchGroup()).to.be.equal(ResearchGroupUtils.defaultResearchGroup())
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ResearchGroupUtils.defaultResearchGroup(languageId)).to.be.equal(ResearchGroupUtils.defaultResearchGroup(languageId));
            })
        })
    });
    context('ResearchGroupUtils.defaultResearchGroupId', ()=>{
        it('should return a number', ()=>{
            expect(ResearchGroupUtils.defaultResearchGroupId).to.be.a('number');
        })
        it('should be supported', ()=>{
            expect(ResearchGroupUtils.supportedResearchGroupId).to.include(ResearchGroupUtils.defaultResearchGroupId);
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                expect(ResearchGroupUtils.defaultResearchGroupId).to.be.equal(ResearchGroupUtils.defaultResearchGroupId);
            })
        })
    })
    context('ResearchGroupUtils.supportedResearchGroup', ()=>{
        it('should return value `[]` when `languageId` is invalid', ()=>{
            expect(ResearchGroupUtils.supportedResearchGroup(true)).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(false)).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup({})).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup({failed: true})).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup([])).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup([1,2,3])).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(null)).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup('')).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup('string')).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup('0')).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup('1')).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(-1)).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(Number.MAX_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(Number.MAX_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(Number.POSITIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(Number.MIN_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(-0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(Number.MIN_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(Number.NEGATIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(Symbol())).to.be.instanceOf(Array).that.is.empty;
            expect(ResearchGroupUtils.supportedResearchGroup(Symbol('string'))).to.be.instanceOf(Array).that.is.empty;
        })
        it('should return an array of string of supported researchGroup when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ResearchGroupUtils.supportedResearchGroup(languageId)).to.be.instanceOf(Array);
                ResearchGroupUtils.supportedResearchGroup(languageId).map(researchGroup=>{
                    expect(researchGroup).to.be.a('string')
                })
            })
        })
        it('should return an array of string of supported researchGroup when `languageId` is not provided', ()=>{
            expect(ResearchGroupUtils.supportedResearchGroup()).to.be.instanceOf(Array);
            ResearchGroupUtils.supportedResearchGroup().map(researchGroup=>{
                expect(researchGroup).to.be.a('string')
            })
        })
        it('should have same number of supported researchGroup for all language',()=>{
            const sameLength = ResearchGroupUtils.supportedResearchGroup().length;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ResearchGroupUtils.supportedResearchGroup(languageId)).to.have.lengthOf(sameLength);
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ResearchGroupUtils.supportedResearchGroup(languageId).map(researchGroup=>{
                    expect(ResearchGroupUtils.isSupportedResearchGroup({researchGroup, languageId})).to.be.true;
                })
            })
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ResearchGroupUtils.supportedResearchGroup(languageId)).to.deep.equal(ResearchGroupUtils.supportedResearchGroup(languageId));
            })
        })
        it('should be an unforzen array', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ResearchGroupUtils.supportedResearchGroup(languageId)).to.not.frozen;
            })
        })
    })
    context('ResearchGroupUtils.supportedResearchGroupId', ()=>{
        it('should return an array of number', ()=>{
            expect(ResearchGroupUtils.supportedResearchGroupId).to.be.instanceOf(Array);
            ResearchGroupUtils.supportedResearchGroupId.map(researchGroupId=>{
                expect(researchGroupId).to.be.a('number')
            })
        })
        it('should be supported', ()=>{
            ResearchGroupUtils.supportedResearchGroupId.map(researchGroupId=>{
                expect(ResearchGroupUtils.isSupportedResearchGroupId(researchGroupId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            expect(ResearchGroupUtils.supportedResearchGroupId).to.deep.equal(ResearchGroupUtils.supportedResearchGroupId);
        })
        it('should be an unforzen array', ()=>{
            expect(ResearchGroupUtils.supportedResearchGroupId).to.not.frozen;
        })
    })
    context('ResearchGroupUtils.isSupportedResearchGroup', ()=>{
        it('should return false when invalid input is provided', ()=>{
            expect(ResearchGroupUtils.isSupportedResearchGroup()).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(undefined)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(true)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(false)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup({})).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup({failed:true})).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup([])).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup([1,2,3])).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(null)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup('')).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup('0')).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup('1')).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup('string')).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(0)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(1)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(-1)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(Number.MAX_VALUE)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(Number.MIN_VALUE)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(0.1)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(-0.1)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(Symbol())).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroup(Symbol('string'))).to.be.false;
        })
        it('should return false when only `researchGroup` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ResearchGroupUtils.supportedResearchGroup(languageId).map(researchGroup=>{
                    expect(ResearchGroupUtils.isSupportedResearchGroup({researchGroup})).to.be.false;
                })
            })
        })
        it('should return false when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ResearchGroupUtils.supportedResearchGroup(languageId).map(()=>{
                    expect(ResearchGroupUtils.isSupportedResearchGroup({languageId})).to.be.false;
                })
            })
        })
        it('should return true when both `researchGroup` and `languageId` are valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ResearchGroupUtils.supportedResearchGroup(languageId).map(researchGroup=>{
                    expect(ResearchGroupUtils.isSupportedResearchGroup({researchGroup,languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ResearchGroupUtils.supportedResearchGroup(languageId).map(researchGroup=>{
                    expect(ResearchGroupUtils.isSupportedResearchGroup({researchGroup,languageId})).to.equal(ResearchGroupUtils.isSupportedResearchGroup({researchGroup,languageId}));
                })
            })
        })
    })
    context('ResearchGroupUtils.isSupportedResearchGroupId', ()=>{
        it('should return false when `researchGroupId` is invalid', ()=>{
            expect(ResearchGroupUtils.isSupportedResearchGroupId()).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(undefined)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(true)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(false)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId({})).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId({failed:true})).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId([])).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId([1,2,3])).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(null)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId('')).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId('0')).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId('1')).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId('string')).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(-1)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(Number.MAX_VALUE)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(Number.MIN_VALUE)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(0.1)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(-0.1)).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(Symbol())).to.be.false;
            expect(ResearchGroupUtils.isSupportedResearchGroupId(Symbol('string'))).to.be.false;
        })
        it('should return true when `researchGroupId` is valid', ()=>{
            ResearchGroupUtils.supportedResearchGroupId.map(researchGroupId=>{
                expect(ResearchGroupUtils.isSupportedResearchGroupId(researchGroupId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            ResearchGroupUtils.supportedResearchGroupId.map(researchGroupId=>{
                expect(ResearchGroupUtils.isSupportedResearchGroupId(researchGroupId)).to.equal(ResearchGroupUtils.isSupportedResearchGroupId(researchGroupId));
            })
        })
    })
    context('ResearchGroupUtils.getResearchGroupId', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(ResearchGroupUtils.getResearchGroupId()).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(undefined)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(true)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(false)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId({})).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId({failed:true})).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId([])).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId([1,2,3])).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(null)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId('')).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId('0')).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId('1')).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId('string')).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(0)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(1)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(-1)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(Number.MAX_VALUE)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(Number.MIN_VALUE)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(0.1)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(-0.1)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(Symbol())).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupId(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `researchGroup` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ResearchGroupUtils.supportedResearchGroup(languageId).map(researchGroup=>{
                    expect(ResearchGroupUtils.getResearchGroupId({researchGroup})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ResearchGroupUtils.supportedResearchGroup(languageId).map(()=>{
                    expect(ResearchGroupUtils.getResearchGroupId({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a number represent `researchGroupId` when both `researchGroup` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ResearchGroupUtils.supportedResearchGroup(languageId).map(researchGroup=>{
                    const researchGroupId = ResearchGroupUtils.getResearchGroupId({researchGroup, languageId})
                    expect(researchGroupId).to.be.a('number');
                    expect(ResearchGroupUtils.isSupportedResearchGroupId(researchGroupId)).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ResearchGroupUtils.supportedResearchGroup(languageId).map(researchGroup=>{
                    expect(ResearchGroupUtils.getResearchGroupId({researchGroup, languageId})).to.equal(ResearchGroupUtils.getResearchGroupId({researchGroup, languageId}))
                })
            })
        })
    })
    context('ResearchGroupUtils.getResearchGroupById', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(ResearchGroupUtils.getResearchGroupById()).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(undefined)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(true)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(false)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById({})).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById({failed:true})).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById([])).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById([1,2,3])).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(null)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById('')).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById('0')).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById('1')).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById('string')).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(-1)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(Number.MAX_VALUE)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(Number.MIN_VALUE)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(0.1)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(-0.1)).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(Symbol())).to.be.undefined;
            expect(ResearchGroupUtils.getResearchGroupById(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `researchGroupId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                ResearchGroupUtils.supportedResearchGroupId.map(researchGroupId=>{
                    expect(ResearchGroupUtils.getResearchGroupById({researchGroupId})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ResearchGroupUtils.supportedResearchGroupId.map(()=>{
                    expect(ResearchGroupUtils.getResearchGroupById({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a string represent `researchGroup` when both `researchGroupId` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ResearchGroupUtils.supportedResearchGroupId.map(researchGroupId=>{
                    const researchGroup = ResearchGroupUtils.getResearchGroupById({researchGroupId, languageId})
                    expect(researchGroup).to.be.a('string');
                    expect(ResearchGroupUtils.isSupportedResearchGroup({researchGroup, languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ResearchGroupUtils.supportedResearchGroupId.map(researchGroupId=>{
                    expect(ResearchGroupUtils.getResearchGroupById({researchGroupId, languageId})).to.equal(ResearchGroupUtils.getResearchGroupById({researchGroupId, languageId}))
                })
            })
        })
    })
});
