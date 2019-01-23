import chai from 'chai';

import TagUtils from 'models/announcement/utils/tag.js';
import LanguageUtils from 'models/common/utils/language.js';

const expect = chai.expect;

describe('models/announcement/utils/tag.js', () => {
    context('TagUtils.defaultTag', ()=>{
        it('should return value `undefined` when `languageId` is invalid', ()=>{
            expect(TagUtils.defaultTag(true)).to.be.undefined;
            expect(TagUtils.defaultTag(false)).to.be.undefined;
            expect(TagUtils.defaultTag({})).to.be.undefined;
            expect(TagUtils.defaultTag({failed: true})).to.be.undefined;
            expect(TagUtils.defaultTag([])).to.be.undefined;
            expect(TagUtils.defaultTag([1,2,3])).to.be.undefined;
            expect(TagUtils.defaultTag(null)).to.be.undefined;
            expect(TagUtils.defaultTag('')).to.be.undefined;
            expect(TagUtils.defaultTag('string')).to.be.undefined;
            expect(TagUtils.defaultTag('0')).to.be.undefined;
            expect(TagUtils.defaultTag('1')).to.be.undefined;
            expect(TagUtils.defaultTag(-1)).to.be.undefined;
            expect(TagUtils.defaultTag(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(TagUtils.defaultTag(Number.MAX_VALUE)).to.be.undefined;
            expect(TagUtils.defaultTag(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(TagUtils.defaultTag(Number.MIN_VALUE)).to.be.undefined;
            expect(TagUtils.defaultTag(0.1)).to.be.undefined;
            expect(TagUtils.defaultTag(-0.1)).to.be.undefined;
            expect(TagUtils.defaultTag(Number.POSITIVE_INFINITY)).to.be.undefined;
            expect(TagUtils.defaultTag(Number.NEGATIVE_INFINITY)).to.be.undefined;
            expect(TagUtils.defaultTag(Symbol())).to.be.undefined;
            expect(TagUtils.defaultTag(Symbol('string'))).to.be.undefined;
        })
        it('should return a string when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(TagUtils.defaultTag(languageId)).to.be.a('string');
            })
        })
        it('should return a string when `languageId` is not provided', ()=>{
            expect(TagUtils.defaultTag()).to.be.a('string');
        })
        it('should not return empty string', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(TagUtils.defaultTag(languageId)).to.not.empty;
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(TagUtils.supportedTag(languageId)).to.include(TagUtils.defaultTag(languageId));
            })
        })
        it('should be a pure function', ()=>{
            expect(TagUtils.defaultTag()).to.be.equal(TagUtils.defaultTag())
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(TagUtils.defaultTag(languageId)).to.be.equal(TagUtils.defaultTag(languageId));
            })
        })
    });
    context('TagUtils.defaultTagId', ()=>{
        it('should return a number', ()=>{
            expect(TagUtils.defaultTagId).to.be.a('number');
        })
        it('should be supported', ()=>{
            expect(TagUtils.supportedTagId).to.include(TagUtils.defaultTagId);
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                expect(TagUtils.defaultTagId).to.be.equal(TagUtils.defaultTagId);
            })
        })
    })
    context('TagUtils.supportedTag', ()=>{
        it('should return value `[]` when `languageId` is invalid', ()=>{
            expect(TagUtils.supportedTag(true)).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(false)).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag({})).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag({failed: true})).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag([])).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag([1,2,3])).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(null)).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag('')).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag('string')).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag('0')).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag('1')).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(-1)).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(Number.MAX_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(Number.MAX_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(Number.POSITIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(Number.MIN_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(-0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(Number.MIN_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(Number.NEGATIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(Symbol())).to.be.instanceOf(Array).that.is.empty;
            expect(TagUtils.supportedTag(Symbol('string'))).to.be.instanceOf(Array).that.is.empty;
        })
        it('should return an array of string of supported tag when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(TagUtils.supportedTag(languageId)).to.be.instanceOf(Array);
                TagUtils.supportedTag(languageId).map(tag=>{
                    expect(tag).to.be.a('string')
                })
            })
        })
        it('should return an array of string of supported tag when `languageId` is not provided', ()=>{
            expect(TagUtils.supportedTag()).to.be.instanceOf(Array);
            TagUtils.supportedTag().map(tag=>{
                expect(tag).to.be.a('string')
            })
        })
        it('should have same number of supported tag for all language',()=>{
            const sameLength = TagUtils.supportedTag().length;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(TagUtils.supportedTag(languageId)).to.have.lengthOf(sameLength);
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                TagUtils.supportedTag(languageId).map(tag=>{
                    expect(TagUtils.isSupportedTag({tag, languageId})).to.be.true;
                })
            })
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(TagUtils.supportedTag(languageId)).to.deep.equal(TagUtils.supportedTag(languageId));
            })
        })
        it('should be an unforzen array', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(TagUtils.supportedTag(languageId)).to.not.frozen;
            })
        })
    })
    context('TagUtils.supportedTagId', ()=>{
        it('should return an array of number', ()=>{
            expect(TagUtils.supportedTagId).to.be.instanceOf(Array);
            TagUtils.supportedTagId.map(tagId=>{
                expect(tagId).to.be.a('number')
            })
        })
        it('should be supported', ()=>{
            TagUtils.supportedTagId.map(tagId=>{
                expect(TagUtils.isSupportedTagId(tagId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            expect(TagUtils.supportedTagId).to.deep.equal(TagUtils.supportedTagId);
        })
        it('should be an unforzen array', ()=>{
            expect(TagUtils.supportedTagId).to.not.frozen;
        })
    })
    context('TagUtils.isSupportedTag', ()=>{
        it('should return false when invalid input is provided', ()=>{
            expect(TagUtils.isSupportedTag()).to.be.false;
            expect(TagUtils.isSupportedTag(undefined)).to.be.false;
            expect(TagUtils.isSupportedTag(true)).to.be.false;
            expect(TagUtils.isSupportedTag(false)).to.be.false;
            expect(TagUtils.isSupportedTag({})).to.be.false;
            expect(TagUtils.isSupportedTag({failed:true})).to.be.false;
            expect(TagUtils.isSupportedTag([])).to.be.false;
            expect(TagUtils.isSupportedTag([1,2,3])).to.be.false;
            expect(TagUtils.isSupportedTag(null)).to.be.false;
            expect(TagUtils.isSupportedTag('')).to.be.false;
            expect(TagUtils.isSupportedTag('0')).to.be.false;
            expect(TagUtils.isSupportedTag('1')).to.be.false;
            expect(TagUtils.isSupportedTag('string')).to.be.false;
            expect(TagUtils.isSupportedTag(0)).to.be.false;
            expect(TagUtils.isSupportedTag(1)).to.be.false;
            expect(TagUtils.isSupportedTag(-1)).to.be.false;
            expect(TagUtils.isSupportedTag(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(TagUtils.isSupportedTag(Number.MAX_VALUE)).to.be.false;
            expect(TagUtils.isSupportedTag(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(TagUtils.isSupportedTag(Number.MIN_VALUE)).to.be.false;
            expect(TagUtils.isSupportedTag(0.1)).to.be.false;
            expect(TagUtils.isSupportedTag(-0.1)).to.be.false;
            expect(TagUtils.isSupportedTag(Symbol())).to.be.false;
            expect(TagUtils.isSupportedTag(Symbol('string'))).to.be.false;
        })
        it('should return false when only `tag` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                TagUtils.supportedTag(languageId).map(tag=>{
                    expect(TagUtils.isSupportedTag({tag})).to.be.false;
                })
            })
        })
        it('should return false when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                TagUtils.supportedTag(languageId).map(()=>{
                    expect(TagUtils.isSupportedTag({languageId})).to.be.false;
                })
            })
        })
        it('should return true when both `tag` and `languageId` are valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                TagUtils.supportedTag(languageId).map(tag=>{
                    expect(TagUtils.isSupportedTag({tag,languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                TagUtils.supportedTag(languageId).map(tag=>{
                    expect(TagUtils.isSupportedTag({tag,languageId})).to.equal(TagUtils.isSupportedTag({tag,languageId}));
                })
            })
        })
    })
    context('TagUtils.isSupportedTagId', ()=>{
        it('should return false when `tagId` is invalid', ()=>{
            expect(TagUtils.isSupportedTagId()).to.be.false;
            expect(TagUtils.isSupportedTagId(undefined)).to.be.false;
            expect(TagUtils.isSupportedTagId(true)).to.be.false;
            expect(TagUtils.isSupportedTagId(false)).to.be.false;
            expect(TagUtils.isSupportedTagId({})).to.be.false;
            expect(TagUtils.isSupportedTagId({failed:true})).to.be.false;
            expect(TagUtils.isSupportedTagId([])).to.be.false;
            expect(TagUtils.isSupportedTagId([1,2,3])).to.be.false;
            expect(TagUtils.isSupportedTagId(null)).to.be.false;
            expect(TagUtils.isSupportedTagId('')).to.be.false;
            expect(TagUtils.isSupportedTagId('0')).to.be.false;
            expect(TagUtils.isSupportedTagId('1')).to.be.false;
            expect(TagUtils.isSupportedTagId('string')).to.be.false;
            expect(TagUtils.isSupportedTagId(-1)).to.be.false;
            expect(TagUtils.isSupportedTagId(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(TagUtils.isSupportedTagId(Number.MAX_VALUE)).to.be.false;
            expect(TagUtils.isSupportedTagId(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(TagUtils.isSupportedTagId(Number.MIN_VALUE)).to.be.false;
            expect(TagUtils.isSupportedTagId(0.1)).to.be.false;
            expect(TagUtils.isSupportedTagId(-0.1)).to.be.false;
            expect(TagUtils.isSupportedTagId(Symbol())).to.be.false;
            expect(TagUtils.isSupportedTagId(Symbol('string'))).to.be.false;
        })
        it('should return true when `tagId` is valid', ()=>{
            TagUtils.supportedTagId.map(tagId=>{
                expect(TagUtils.isSupportedTagId(tagId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            TagUtils.supportedTagId.map(tagId=>{
                expect(TagUtils.isSupportedTagId(tagId)).to.equal(TagUtils.isSupportedTagId(tagId));
            })
        })
    })
    context('TagUtils.getTagId', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(TagUtils.getTagId()).to.be.undefined;
            expect(TagUtils.getTagId(undefined)).to.be.undefined;
            expect(TagUtils.getTagId(true)).to.be.undefined;
            expect(TagUtils.getTagId(false)).to.be.undefined;
            expect(TagUtils.getTagId({})).to.be.undefined;
            expect(TagUtils.getTagId({failed:true})).to.be.undefined;
            expect(TagUtils.getTagId([])).to.be.undefined;
            expect(TagUtils.getTagId([1,2,3])).to.be.undefined;
            expect(TagUtils.getTagId(null)).to.be.undefined;
            expect(TagUtils.getTagId('')).to.be.undefined;
            expect(TagUtils.getTagId('0')).to.be.undefined;
            expect(TagUtils.getTagId('1')).to.be.undefined;
            expect(TagUtils.getTagId('string')).to.be.undefined;
            expect(TagUtils.getTagId(0)).to.be.undefined;
            expect(TagUtils.getTagId(1)).to.be.undefined;
            expect(TagUtils.getTagId(-1)).to.be.undefined;
            expect(TagUtils.getTagId(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(TagUtils.getTagId(Number.MAX_VALUE)).to.be.undefined;
            expect(TagUtils.getTagId(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(TagUtils.getTagId(Number.MIN_VALUE)).to.be.undefined;
            expect(TagUtils.getTagId(0.1)).to.be.undefined;
            expect(TagUtils.getTagId(-0.1)).to.be.undefined;
            expect(TagUtils.getTagId(Symbol())).to.be.undefined;
            expect(TagUtils.getTagId(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `tag` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                TagUtils.supportedTag(languageId).map(tag=>{
                    expect(TagUtils.getTagId({tag})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                TagUtils.supportedTag(languageId).map(()=>{
                    expect(TagUtils.getTagId({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a number represent `tagId` when both `tag` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                TagUtils.supportedTag(languageId).map(tag=>{
                    const tagId = TagUtils.getTagId({tag, languageId})
                    expect(tagId).to.be.a('number');
                    expect(TagUtils.isSupportedTagId(tagId)).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                TagUtils.supportedTag(languageId).map(tag=>{
                    expect(TagUtils.getTagId({tag, languageId})).to.equal(TagUtils.getTagId({tag, languageId}))
                })
            })
        })
    })
    context('TagUtils.getTagById', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(TagUtils.getTagById()).to.be.undefined;
            expect(TagUtils.getTagById(undefined)).to.be.undefined;
            expect(TagUtils.getTagById(true)).to.be.undefined;
            expect(TagUtils.getTagById(false)).to.be.undefined;
            expect(TagUtils.getTagById({})).to.be.undefined;
            expect(TagUtils.getTagById({failed:true})).to.be.undefined;
            expect(TagUtils.getTagById([])).to.be.undefined;
            expect(TagUtils.getTagById([1,2,3])).to.be.undefined;
            expect(TagUtils.getTagById(null)).to.be.undefined;
            expect(TagUtils.getTagById('')).to.be.undefined;
            expect(TagUtils.getTagById('0')).to.be.undefined;
            expect(TagUtils.getTagById('1')).to.be.undefined;
            expect(TagUtils.getTagById('string')).to.be.undefined;
            expect(TagUtils.getTagById(-1)).to.be.undefined;
            expect(TagUtils.getTagById(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(TagUtils.getTagById(Number.MAX_VALUE)).to.be.undefined;
            expect(TagUtils.getTagById(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(TagUtils.getTagById(Number.MIN_VALUE)).to.be.undefined;
            expect(TagUtils.getTagById(0.1)).to.be.undefined;
            expect(TagUtils.getTagById(-0.1)).to.be.undefined;
            expect(TagUtils.getTagById(Symbol())).to.be.undefined;
            expect(TagUtils.getTagById(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `tagId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                TagUtils.supportedTagId.map(tagId=>{
                    expect(TagUtils.getTagById({tagId})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                TagUtils.supportedTagId.map(()=>{
                    expect(TagUtils.getTagById({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a string represent `tag` when both `tagId` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                TagUtils.supportedTagId.map(tagId=>{
                    const tag = TagUtils.getTagById({tagId, languageId})
                    expect(tag).to.be.a('string');
                    expect(TagUtils.isSupportedTag({tag, languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                TagUtils.supportedTagId.map(tagId=>{
                    expect(TagUtils.getTagById({tagId, languageId})).to.equal(TagUtils.getTagById({tagId, languageId}))
                })
            })
        })
    })
});
