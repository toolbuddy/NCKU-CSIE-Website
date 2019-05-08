import chai from 'chai';

import ProjectUtils from 'models/faculty/utils/project-category.js';
import LanguageUtils from 'models/common/utils/language.js';

const expect = chai.expect;

describe('models/faculty/utils/project-category.js', () => {
    context('ProjectUtils.defaultProjectCategory', ()=>{
        it('should return value `undefined` when `languageId` is invalid', ()=>{
            expect(ProjectUtils.defaultProjectCategory(true)).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(false)).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory({})).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory({failed: true})).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory([])).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory([1,2,3])).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(null)).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory('')).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory('string')).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory('0')).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory('1')).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(-1)).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(Number.MAX_VALUE)).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(Number.MIN_VALUE)).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(0.1)).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(-0.1)).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(Number.POSITIVE_INFINITY)).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(Number.NEGATIVE_INFINITY)).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(Symbol())).to.be.undefined;
            expect(ProjectUtils.defaultProjectCategory(Symbol('string'))).to.be.undefined;
        })
        it('should return a string when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ProjectUtils.defaultProjectCategory(languageId)).to.be.a('string');
            })
        })
        it('should return a string when `languageId` is not provided', ()=>{
            expect(ProjectUtils.defaultProjectCategory()).to.be.a('string');
        })
        it('should not return empty string', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ProjectUtils.defaultProjectCategory(languageId)).to.not.empty;
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ProjectUtils.supportedProjectCategory(languageId)).to.include(ProjectUtils.defaultProjectCategory(languageId));
            })
        })
        it('should be a pure function', ()=>{
            expect(ProjectUtils.defaultProjectCategory()).to.be.equal(ProjectUtils.defaultProjectCategory())
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ProjectUtils.defaultProjectCategory(languageId)).to.be.equal(ProjectUtils.defaultProjectCategory(languageId));
            })
        })
    });
    context('ProjectUtils.defaultProjectCategoryId', ()=>{
        it('should return a number', ()=>{
            expect(ProjectUtils.defaultProjectCategoryId).to.be.a('number');
        })
        it('should be supported', ()=>{
            expect(ProjectUtils.supportedProjectCategoryId).to.include(ProjectUtils.defaultProjectCategoryId);
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                expect(ProjectUtils.defaultProjectCategoryId).to.be.equal(ProjectUtils.defaultProjectCategoryId);
            })
        })
    })
    context('ProjectUtils.supportedProjectCategory', ()=>{
        it('should return value `[]` when `languageId` is invalid', ()=>{
            expect(ProjectUtils.supportedProjectCategory(true)).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(false)).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory({})).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory({failed: true})).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory([])).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory([1,2,3])).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(null)).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory('')).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory('string')).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory('0')).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory('1')).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(-1)).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(Number.MAX_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(Number.MAX_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(Number.POSITIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(Number.MIN_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(-0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(Number.MIN_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(Number.NEGATIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(Symbol())).to.be.instanceOf(Array).that.is.empty;
            expect(ProjectUtils.supportedProjectCategory(Symbol('string'))).to.be.instanceOf(Array).that.is.empty;
        })
        it('should return an array of string of supported projectCategory when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ProjectUtils.supportedProjectCategory(languageId)).to.be.instanceOf(Array);
                ProjectUtils.supportedProjectCategory(languageId).map(projectCategory=>{
                    expect(projectCategory).to.be.a('string')
                })
            })
        })
        it('should return an array of string of supported projectCategory when `languageId` is not provided', ()=>{
            expect(ProjectUtils.supportedProjectCategory()).to.be.instanceOf(Array);
            ProjectUtils.supportedProjectCategory().map(projectCategory=>{
                expect(projectCategory).to.be.a('string')
            })
        })
        it('should have same number of supported projectCategory for all language',()=>{
            const sameLength = ProjectUtils.supportedProjectCategory().length;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ProjectUtils.supportedProjectCategory(languageId)).to.have.lengthOf(sameLength);
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ProjectUtils.supportedProjectCategory(languageId).map(projectCategory=>{
                    expect(ProjectUtils.isSupportedProjectCategory({projectCategory, languageId})).to.be.true;
                })
            })
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ProjectUtils.supportedProjectCategory(languageId)).to.deep.equal(ProjectUtils.supportedProjectCategory(languageId));
            })
        })
        it('should be an unforzen array', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(ProjectUtils.supportedProjectCategory(languageId)).to.not.frozen;
            })
        })
    })
    context('ProjectUtils.supportedProjectCategoryId', ()=>{
        it('should return an array of number', ()=>{
            expect(ProjectUtils.supportedProjectCategoryId).to.be.instanceOf(Array);
            ProjectUtils.supportedProjectCategoryId.map(projectCategoryId=>{
                expect(projectCategoryId).to.be.a('number')
            })
        })
        it('should be supported', ()=>{
            ProjectUtils.supportedProjectCategoryId.map(projectCategoryId=>{
                expect(ProjectUtils.isSupportedProjectCategoryId(projectCategoryId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            expect(ProjectUtils.supportedProjectCategoryId).to.deep.equal(ProjectUtils.supportedProjectCategoryId);
        })
        it('should be an unforzen array', ()=>{
            expect(ProjectUtils.supportedProjectCategoryId).to.not.frozen;
        })
    })
    context('ProjectUtils.isSupportedProjectCategory', ()=>{
        it('should return false when invalid input is provided', ()=>{
            expect(ProjectUtils.isSupportedProjectCategory()).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(undefined)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(true)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(false)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory({})).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory({failed:true})).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory([])).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory([1,2,3])).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(null)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory('')).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory('0')).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory('1')).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory('string')).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(0)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(1)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(-1)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(Number.MAX_VALUE)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(Number.MIN_VALUE)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(0.1)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(-0.1)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(Symbol())).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategory(Symbol('string'))).to.be.false;
        })
        it('should return false when only `projectCategory` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ProjectUtils.supportedProjectCategory(languageId).map(projectCategory=>{
                    expect(ProjectUtils.isSupportedProjectCategory({projectCategory})).to.be.false;
                })
            })
        })
        it('should return false when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ProjectUtils.supportedProjectCategory(languageId).map(()=>{
                    expect(ProjectUtils.isSupportedProjectCategory({languageId})).to.be.false;
                })
            })
        })
        it('should return true when both `projectCategory` and `languageId` are valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ProjectUtils.supportedProjectCategory(languageId).map(projectCategory=>{
                    expect(ProjectUtils.isSupportedProjectCategory({projectCategory,languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ProjectUtils.supportedProjectCategory(languageId).map(projectCategory=>{
                    expect(ProjectUtils.isSupportedProjectCategory({projectCategory,languageId})).to.equal(ProjectUtils.isSupportedProjectCategory({projectCategory,languageId}));
                })
            })
        })
    })
    context('ProjectUtils.isSupportedProjectCategoryId', ()=>{
        it('should return false when `projectCategoryId` is invalid', ()=>{
            expect(ProjectUtils.isSupportedProjectCategoryId()).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(undefined)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(true)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(false)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId({})).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId({failed:true})).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId([])).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId([1,2,3])).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(null)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId('')).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId('0')).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId('1')).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId('string')).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(-1)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(Number.MAX_VALUE)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(Number.MIN_VALUE)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(0.1)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(-0.1)).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(Symbol())).to.be.false;
            expect(ProjectUtils.isSupportedProjectCategoryId(Symbol('string'))).to.be.false;
        })
        it('should return true when `projectCategoryId` is valid', ()=>{
            ProjectUtils.supportedProjectCategoryId.map(projectCategoryId=>{
                expect(ProjectUtils.isSupportedProjectCategoryId(projectCategoryId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            ProjectUtils.supportedProjectCategoryId.map(projectCategoryId=>{
                expect(ProjectUtils.isSupportedProjectCategoryId(projectCategoryId)).to.equal(ProjectUtils.isSupportedProjectCategoryId(projectCategoryId));
            })
        })
    })
    context('ProjectUtils.getProjectCategoryId', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(ProjectUtils.getProjectCategoryId()).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(undefined)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(true)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(false)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId({})).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId({failed:true})).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId([])).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId([1,2,3])).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(null)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId('')).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId('0')).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId('1')).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId('string')).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(0)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(1)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(-1)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(Number.MAX_VALUE)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(Number.MIN_VALUE)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(0.1)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(-0.1)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(Symbol())).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryId(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `projectCategory` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ProjectUtils.supportedProjectCategory(languageId).map(projectCategory=>{
                    expect(ProjectUtils.getProjectCategoryId({projectCategory})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ProjectUtils.supportedProjectCategory(languageId).map(()=>{
                    expect(ProjectUtils.getProjectCategoryId({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a number represent `projectCategoryId` when both `projectCategory` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ProjectUtils.supportedProjectCategory(languageId).map(projectCategory=>{
                    const projectCategoryId = ProjectUtils.getProjectCategoryId({projectCategory, languageId})
                    expect(projectCategoryId).to.be.a('number');
                    expect(ProjectUtils.isSupportedProjectCategoryId(projectCategoryId)).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ProjectUtils.supportedProjectCategory(languageId).map(projectCategory=>{
                    expect(ProjectUtils.getProjectCategoryId({projectCategory, languageId})).to.equal(ProjectUtils.getProjectCategoryId({projectCategory, languageId}))
                })
            })
        })
    })
    context('ProjectUtils.getProjectCategoryById', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(ProjectUtils.getProjectCategoryById()).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(undefined)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(true)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(false)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById({})).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById({failed:true})).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById([])).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById([1,2,3])).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(null)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById('')).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById('0')).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById('1')).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById('string')).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(-1)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(Number.MAX_VALUE)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(Number.MIN_VALUE)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(0.1)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(-0.1)).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(Symbol())).to.be.undefined;
            expect(ProjectUtils.getProjectCategoryById(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `projectCategoryId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                ProjectUtils.supportedProjectCategoryId.map(projectCategoryId=>{
                    expect(ProjectUtils.getProjectCategoryById({projectCategoryId})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ProjectUtils.supportedProjectCategoryId.map(()=>{
                    expect(ProjectUtils.getProjectCategoryById({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a string represent `projectCategory` when both `projectCategoryId` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ProjectUtils.supportedProjectCategoryId.map(projectCategoryId=>{
                    const projectCategory = ProjectUtils.getProjectCategoryById({projectCategoryId, languageId})
                    expect(projectCategory).to.be.a('string');
                    expect(ProjectUtils.isSupportedProjectCategory({projectCategory, languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                ProjectUtils.supportedProjectCategoryId.map(projectCategoryId=>{
                    expect(ProjectUtils.getProjectCategoryById({projectCategoryId, languageId})).to.equal(ProjectUtils.getProjectCategoryById({projectCategoryId, languageId}))
                })
            })
        })
    })
});
