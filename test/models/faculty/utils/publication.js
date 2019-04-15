import chai from 'chai';

import PublicationUtils from 'models/faculty/utils/publication.js';
import LanguageUtils from 'models/common/utils/language.js';

const expect = chai.expect;

describe('models/faculty/utils/publicationCategory.js', () => {
    context('PublicationUtils.defaultPublicationCategory', ()=>{
        it('should return value `undefined` when `languageId` is invalid', ()=>{
            expect(PublicationUtils.defaultPublicationCategory(true)).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(false)).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory({})).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory({failed: true})).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory([])).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory([1,2,3])).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(null)).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory('')).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory('string')).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory('0')).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory('1')).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(-1)).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(Number.MAX_VALUE)).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(Number.MIN_VALUE)).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(0.1)).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(-0.1)).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(Number.POSITIVE_INFINITY)).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(Number.NEGATIVE_INFINITY)).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(Symbol())).to.be.undefined;
            expect(PublicationUtils.defaultPublicationCategory(Symbol('string'))).to.be.undefined;
        })
        it('should return a string when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(PublicationUtils.defaultPublicationCategory(languageId)).to.be.a('string');
            })
        })
        it('should return a string when `languageId` is not provided', ()=>{
            expect(PublicationUtils.defaultPublicationCategory()).to.be.a('string');
        })
        it('should not return empty string', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(PublicationUtils.defaultPublicationCategory(languageId)).to.not.empty;
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(PublicationUtils.supportedPublicationCategory(languageId)).to.include(PublicationUtils.defaultPublicationCategory(languageId));
            })
        })
        it('should be a pure function', ()=>{
            expect(PublicationUtils.defaultPublicationCategory()).to.be.equal(PublicationUtils.defaultPublicationCategory())
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(PublicationUtils.defaultPublicationCategory(languageId)).to.be.equal(PublicationUtils.defaultPublicationCategory(languageId));
            })
        })
    });
    context('PublicationUtils.defaultPublicationCategoryId', ()=>{
        it('should return a number', ()=>{
            expect(PublicationUtils.defaultPublicationCategoryId).to.be.a('number');
        })
        it('should be supported', ()=>{
            expect(PublicationUtils.supportedPublicationCategoryId).to.include(PublicationUtils.defaultPublicationCategoryId);
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                expect(PublicationUtils.defaultPublicationCategoryId).to.be.equal(PublicationUtils.defaultPublicationCategoryId);
            })
        })
    })
    context('PublicationUtils.supportedPublicationCategory', ()=>{
        it('should return value `[]` when `languageId` is invalid', ()=>{
            expect(PublicationUtils.supportedPublicationCategory(true)).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(false)).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory({})).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory({failed: true})).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory([])).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory([1,2,3])).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(null)).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory('')).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory('string')).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory('0')).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory('1')).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(-1)).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(Number.MAX_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(Number.MAX_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(Number.POSITIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(Number.MIN_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(-0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(Number.MIN_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(Number.NEGATIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(Symbol())).to.be.instanceOf(Array).that.is.empty;
            expect(PublicationUtils.supportedPublicationCategory(Symbol('string'))).to.be.instanceOf(Array).that.is.empty;
        })
        it('should return an array of string of supported publicationCategory when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(PublicationUtils.supportedPublicationCategory(languageId)).to.be.instanceOf(Array);
                PublicationUtils.supportedPublicationCategory(languageId).map(publicationCategory=>{
                    expect(publicationCategory).to.be.a('string')
                })
            })
        })
        it('should return an array of string of supported publicationCategory when `languageId` is not provided', ()=>{
            expect(PublicationUtils.supportedPublicationCategory()).to.be.instanceOf(Array);
            PublicationUtils.supportedPublicationCategory().map(publicationCategory=>{
                expect(publicationCategory).to.be.a('string')
            })
        })
        it('should have same number of supported publicationCategory for all language',()=>{
            const sameLength = PublicationUtils.supportedPublicationCategory().length;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(PublicationUtils.supportedPublicationCategory(languageId)).to.have.lengthOf(sameLength);
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                PublicationUtils.supportedPublicationCategory(languageId).map(publicationCategory=>{
                    expect(PublicationUtils.isSupportedPublicationCategory({publicationCategory, languageId})).to.be.true;
                })
            })
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(PublicationUtils.supportedPublicationCategory(languageId)).to.deep.equal(PublicationUtils.supportedPublicationCategory(languageId));
            })
        })
        it('should be an unforzen array', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(PublicationUtils.supportedPublicationCategory(languageId)).to.not.frozen;
            })
        })
    })
    context('PublicationUtils.supportedPublicationCategoryId', ()=>{
        it('should return an array of number', ()=>{
            expect(PublicationUtils.supportedPublicationCategoryId).to.be.instanceOf(Array);
            PublicationUtils.supportedPublicationCategoryId.map(publicationCategoryId=>{
                expect(publicationCategoryId).to.be.a('number')
            })
        })
        it('should be supported', ()=>{
            PublicationUtils.supportedPublicationCategoryId.map(publicationCategoryId=>{
                expect(PublicationUtils.isSupportedPublicationCategoryId(publicationCategoryId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            expect(PublicationUtils.supportedPublicationCategoryId).to.deep.equal(PublicationUtils.supportedPublicationCategoryId);
        })
        it('should be an unforzen array', ()=>{
            expect(PublicationUtils.supportedPublicationCategoryId).to.not.frozen;
        })
    })
    context('PublicationUtils.isSupportedPublicationCategory', ()=>{
        it('should return false when invalid input is provided', ()=>{
            expect(PublicationUtils.isSupportedPublicationCategory()).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(undefined)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(true)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(false)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory({})).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory({failed:true})).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory([])).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory([1,2,3])).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(null)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory('')).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory('0')).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory('1')).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory('string')).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(0)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(1)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(-1)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(Number.MAX_VALUE)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(Number.MIN_VALUE)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(0.1)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(-0.1)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(Symbol())).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategory(Symbol('string'))).to.be.false;
        })
        it('should return false when only `publicationCategory` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                PublicationUtils.supportedPublicationCategory(languageId).map(publicationCategory=>{
                    expect(PublicationUtils.isSupportedPublicationCategory({publicationCategory})).to.be.false;
                })
            })
        })
        it('should return false when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                PublicationUtils.supportedPublicationCategory(languageId).map(()=>{
                    expect(PublicationUtils.isSupportedPublicationCategory({languageId})).to.be.false;
                })
            })
        })
        it('should return true when both `publicationCategory` and `languageId` are valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                PublicationUtils.supportedPublicationCategory(languageId).map(publicationCategory=>{
                    expect(PublicationUtils.isSupportedPublicationCategory({publicationCategory,languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                PublicationUtils.supportedPublicationCategory(languageId).map(publicationCategory=>{
                    expect(PublicationUtils.isSupportedPublicationCategory({publicationCategory,languageId})).to.equal(PublicationUtils.isSupportedPublicationCategory({publicationCategory,languageId}));
                })
            })
        })
    })
    context('PublicationUtils.isSupportedPublicationCategoryId', ()=>{
        it('should return false when `publicationCategoryId` is invalid', ()=>{
            expect(PublicationUtils.isSupportedPublicationCategoryId()).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(undefined)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(true)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(false)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId({})).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId({failed:true})).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId([])).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId([1,2,3])).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(null)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId('')).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId('0')).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId('1')).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId('string')).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(-1)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(Number.MAX_VALUE)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(Number.MIN_VALUE)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(0.1)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(-0.1)).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(Symbol())).to.be.false;
            expect(PublicationUtils.isSupportedPublicationCategoryId(Symbol('string'))).to.be.false;
        })
        it('should return true when `publicationCategoryId` is valid', ()=>{
            PublicationUtils.supportedPublicationCategoryId.map(publicationCategoryId=>{
                expect(PublicationUtils.isSupportedPublicationCategoryId(publicationCategoryId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            PublicationUtils.supportedPublicationCategoryId.map(publicationCategoryId=>{
                expect(PublicationUtils.isSupportedPublicationCategoryId(publicationCategoryId)).to.equal(PublicationUtils.isSupportedPublicationCategoryId(publicationCategoryId));
            })
        })
    })
    context('PublicationUtils.getPublicationCategoryId', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(PublicationUtils.getPublicationCategoryId()).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(undefined)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(true)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(false)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId({})).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId({failed:true})).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId([])).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId([1,2,3])).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(null)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId('')).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId('0')).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId('1')).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId('string')).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(0)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(1)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(-1)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(Number.MAX_VALUE)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(Number.MIN_VALUE)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(0.1)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(-0.1)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(Symbol())).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryId(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `publicationCategory` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                PublicationUtils.supportedPublicationCategory(languageId).map(publicationCategory=>{
                    expect(PublicationUtils.getPublicationCategoryId({publicationCategory})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                PublicationUtils.supportedPublicationCategory(languageId).map(()=>{
                    expect(PublicationUtils.getPublicationCategoryId({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a number represent `publicationCategoryId` when both `publicationCategory` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                PublicationUtils.supportedPublicationCategory(languageId).map(publicationCategory=>{
                    const publicationCategoryId = PublicationUtils.getPublicationCategoryId({publicationCategory, languageId})
                    expect(publicationCategoryId).to.be.a('number');
                    expect(PublicationUtils.isSupportedPublicationCategoryId(publicationCategoryId)).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                PublicationUtils.supportedPublicationCategory(languageId).map(publicationCategory=>{
                    expect(PublicationUtils.getPublicationCategoryId({publicationCategory, languageId})).to.equal(PublicationUtils.getPublicationCategoryId({publicationCategory, languageId}))
                })
            })
        })
    })
    context('PublicationUtils.getPublicationCategoryById', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(PublicationUtils.getPublicationCategoryById()).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(undefined)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(true)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(false)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById({})).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById({failed:true})).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById([])).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById([1,2,3])).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(null)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById('')).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById('0')).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById('1')).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById('string')).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(-1)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(Number.MAX_VALUE)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(Number.MIN_VALUE)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(0.1)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(-0.1)).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(Symbol())).to.be.undefined;
            expect(PublicationUtils.getPublicationCategoryById(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `publicationCategoryId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                PublicationUtils.supportedPublicationCategoryId.map(publicationCategoryId=>{
                    expect(PublicationUtils.getPublicationCategoryById({publicationCategoryId})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                PublicationUtils.supportedPublicationCategoryId.map(()=>{
                    expect(PublicationUtils.getPublicationCategoryById({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a string represent `publicationCategory` when both `publicationCategoryId` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                PublicationUtils.supportedPublicationCategoryId.map(publicationCategoryId=>{
                    const publicationCategory = PublicationUtils.getPublicationCategoryById({publicationCategoryId, languageId})
                    expect(publicationCategory).to.be.a('string');
                    expect(PublicationUtils.isSupportedPublicationCategory({publicationCategory, languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                PublicationUtils.supportedPublicationCategoryId.map(publicationCategoryId=>{
                    expect(PublicationUtils.getPublicationCategoryById({publicationCategoryId, languageId})).to.equal(PublicationUtils.getPublicationCategoryById({publicationCategoryId, languageId}))
                })
            })
        })
    })
});
