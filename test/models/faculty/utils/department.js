import chai from 'chai';

import DepartmentUtils from 'models/faculty/utils/department.js';
import LanguageUtils from 'models/common/utils/language.js';

const expect = chai.expect;

describe('models/faculty/utils/department.js', () => {
    context('DepartmentUtils.defaultDepartment', ()=>{
        it('should return value `undefined` when `languageId` is invalid', ()=>{
            expect(DepartmentUtils.defaultDepartment(true)).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(false)).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment({})).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment({failed: true})).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment([])).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment([1,2,3])).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(null)).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment('')).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment('string')).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment('0')).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment('1')).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(-1)).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(Number.MAX_VALUE)).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(Number.MIN_VALUE)).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(0.1)).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(-0.1)).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(Number.POSITIVE_INFINITY)).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(Number.NEGATIVE_INFINITY)).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(Symbol())).to.be.undefined;
            expect(DepartmentUtils.defaultDepartment(Symbol('string'))).to.be.undefined;
        })
        it('should return a string when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DepartmentUtils.defaultDepartment(languageId)).to.be.a('string');
            })
        })
        it('should return a string when `languageId` is not provided', ()=>{
            expect(DepartmentUtils.defaultDepartment()).to.be.a('string');
        })
        it('should not return empty string', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DepartmentUtils.defaultDepartment(languageId)).to.not.empty;
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DepartmentUtils.supportedDepartment(languageId)).to.include(DepartmentUtils.defaultDepartment(languageId));
            })
        })
        it('should be a pure function', ()=>{
            expect(DepartmentUtils.defaultDepartment()).to.be.equal(DepartmentUtils.defaultDepartment())
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DepartmentUtils.defaultDepartment(languageId)).to.be.equal(DepartmentUtils.defaultDepartment(languageId));
            })
        })
    });
    context('DepartmentUtils.defaultDepartmentId', ()=>{
        it('should return a number', ()=>{
            expect(DepartmentUtils.defaultDepartmentId).to.be.a('number');
        })
        it('should be supported', ()=>{
            expect(DepartmentUtils.supportedDepartmentId).to.include(DepartmentUtils.defaultDepartmentId);
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                expect(DepartmentUtils.defaultDepartmentId).to.be.equal(DepartmentUtils.defaultDepartmentId);
            })
        })
    })
    context('DepartmentUtils.supportedDepartment', ()=>{
        it('should return value `[]` when `languageId` is invalid', ()=>{
            expect(DepartmentUtils.supportedDepartment(true)).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(false)).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment({})).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment({failed: true})).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment([])).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment([1,2,3])).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(null)).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment('')).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment('string')).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment('0')).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment('1')).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(-1)).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(Number.MAX_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(Number.MAX_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(Number.POSITIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(Number.MIN_SAFE_INTEGER)).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(-0.1)).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(Number.MIN_VALUE)).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(Number.NEGATIVE_INFINITY)).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(Symbol())).to.be.instanceOf(Array).that.is.empty;
            expect(DepartmentUtils.supportedDepartment(Symbol('string'))).to.be.instanceOf(Array).that.is.empty;
        })
        it('should return an array of string of supported department when `languageId` is valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DepartmentUtils.supportedDepartment(languageId)).to.be.instanceOf(Array);
                DepartmentUtils.supportedDepartment(languageId).map(department=>{
                    expect(department).to.be.a('string')
                })
            })
        })
        it('should return an array of string of supported department when `languageId` is not provided', ()=>{
            expect(DepartmentUtils.supportedDepartment()).to.be.instanceOf(Array);
            DepartmentUtils.supportedDepartment().map(department=>{
                expect(department).to.be.a('string')
            })
        })
        it('should have same number of supported department for all language',()=>{
            const sameLength = DepartmentUtils.supportedDepartment().length;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DepartmentUtils.supportedDepartment(languageId)).to.have.lengthOf(sameLength);
            })
        })
        it('should be supported', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DepartmentUtils.supportedDepartment(languageId).map(department=>{
                    expect(DepartmentUtils.isSupportedDepartment({department, languageId})).to.be.true;
                })
            })
        })
        it('should be a pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DepartmentUtils.supportedDepartment(languageId)).to.deep.equal(DepartmentUtils.supportedDepartment(languageId));
            })
        })
        it('should be an unforzen array', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(DepartmentUtils.supportedDepartment(languageId)).to.not.frozen;
            })
        })
    })
    context('DepartmentUtils.supportedDepartmentId', ()=>{
        it('should return an array of number', ()=>{
            expect(DepartmentUtils.supportedDepartmentId).to.be.instanceOf(Array);
            DepartmentUtils.supportedDepartmentId.map(departmentId=>{
                expect(departmentId).to.be.a('number')
            })
        })
        it('should be supported', ()=>{
            DepartmentUtils.supportedDepartmentId.map(departmentId=>{
                expect(DepartmentUtils.isSupportedDepartmentId(departmentId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            expect(DepartmentUtils.supportedDepartmentId).to.deep.equal(DepartmentUtils.supportedDepartmentId);
        })
        it('should be an unforzen array', ()=>{
            expect(DepartmentUtils.supportedDepartmentId).to.not.frozen;
        })
    })
    context('DepartmentUtils.isSupportedDepartment', ()=>{
        it('should return false when invalid input is provided', ()=>{
            expect(DepartmentUtils.isSupportedDepartment()).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(undefined)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(true)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(false)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment({})).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment({failed:true})).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment([])).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment([1,2,3])).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(null)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment('')).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment('0')).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment('1')).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment('string')).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(0)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(1)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(-1)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(Number.MAX_VALUE)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(Number.MIN_VALUE)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(0.1)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(-0.1)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(Symbol())).to.be.false;
            expect(DepartmentUtils.isSupportedDepartment(Symbol('string'))).to.be.false;
        })
        it('should return false when only `department` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DepartmentUtils.supportedDepartment(languageId).map(department=>{
                    expect(DepartmentUtils.isSupportedDepartment({department})).to.be.false;
                })
            })
        })
        it('should return false when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DepartmentUtils.supportedDepartment(languageId).map(()=>{
                    expect(DepartmentUtils.isSupportedDepartment({languageId})).to.be.false;
                })
            })
        })
        it('should return true when both `department` and `languageId` are valid', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DepartmentUtils.supportedDepartment(languageId).map(department=>{
                    expect(DepartmentUtils.isSupportedDepartment({department,languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DepartmentUtils.supportedDepartment(languageId).map(department=>{
                    expect(DepartmentUtils.isSupportedDepartment({department,languageId})).to.equal(DepartmentUtils.isSupportedDepartment({department,languageId}));
                })
            })
        })
    })
    context('DepartmentUtils.isSupportedDepartmentId', ()=>{
        it('should return false when `departmentId` is invalid', ()=>{
            expect(DepartmentUtils.isSupportedDepartmentId()).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(undefined)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(true)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(false)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId({})).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId({failed:true})).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId([])).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId([1,2,3])).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(null)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId('')).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId('0')).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId('1')).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId('string')).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(-1)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(Number.MAX_SAFE_INTEGER)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(Number.MAX_VALUE)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(Number.MIN_SAFE_INTEGER)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(Number.MIN_VALUE)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(0.1)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(-0.1)).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(Symbol())).to.be.false;
            expect(DepartmentUtils.isSupportedDepartmentId(Symbol('string'))).to.be.false;
        })
        it('should return true when `departmentId` is valid', ()=>{
            DepartmentUtils.supportedDepartmentId.map(departmentId=>{
                expect(DepartmentUtils.isSupportedDepartmentId(departmentId)).to.be.true;
            })
        })
        it('should be pure function', ()=>{
            DepartmentUtils.supportedDepartmentId.map(departmentId=>{
                expect(DepartmentUtils.isSupportedDepartmentId(departmentId)).to.equal(DepartmentUtils.isSupportedDepartmentId(departmentId));
            })
        })
    })
    context('DepartmentUtils.getDepartmentId', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(DepartmentUtils.getDepartmentId()).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(undefined)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(true)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(false)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId({})).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId({failed:true})).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId([])).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId([1,2,3])).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(null)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId('')).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId('0')).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId('1')).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId('string')).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(0)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(1)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(-1)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(Number.MAX_VALUE)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(Number.MIN_VALUE)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(0.1)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(-0.1)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(Symbol())).to.be.undefined;
            expect(DepartmentUtils.getDepartmentId(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `department` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DepartmentUtils.supportedDepartment(languageId).map(department=>{
                    expect(DepartmentUtils.getDepartmentId({department})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DepartmentUtils.supportedDepartment(languageId).map(()=>{
                    expect(DepartmentUtils.getDepartmentId({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a number represent `departmentId` when both `department` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DepartmentUtils.supportedDepartment(languageId).map(department=>{
                    const departmentId = DepartmentUtils.getDepartmentId({department, languageId})
                    expect(departmentId).to.be.a('number');
                    expect(DepartmentUtils.isSupportedDepartmentId(departmentId)).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DepartmentUtils.supportedDepartment(languageId).map(department=>{
                    expect(DepartmentUtils.getDepartmentId({department, languageId})).to.equal(DepartmentUtils.getDepartmentId({department, languageId}))
                })
            })
        })
    })
    context('DepartmentUtils.getDepartmentById', ()=>{
        it('should return value `undefined` when invalid input is provided', ()=>{
            expect(DepartmentUtils.getDepartmentById()).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(undefined)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(true)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(false)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById({})).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById({failed:true})).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById([])).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById([1,2,3])).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(null)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById('')).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById('0')).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById('1')).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById('string')).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(-1)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(Number.MAX_SAFE_INTEGER)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(Number.MAX_VALUE)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(Number.MIN_SAFE_INTEGER)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(Number.MIN_VALUE)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(0.1)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(-0.1)).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(Symbol())).to.be.undefined;
            expect(DepartmentUtils.getDepartmentById(Symbol('string'))).to.be.undefined;
        })
        it('should return value `undefined` when only `departmentId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(()=>{
                DepartmentUtils.supportedDepartmentId.map(departmentId=>{
                    expect(DepartmentUtils.getDepartmentById({departmentId})).to.be.undefined;
                })
            })
        })
        it('should return value `undefined` when only `languageId` is provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DepartmentUtils.supportedDepartmentId.map(()=>{
                    expect(DepartmentUtils.getDepartmentById({languageId})).to.be.undefined;
                })
            })
        })
        it('should return a string represent `department` when both `departmentId` and `languageId` are provided', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DepartmentUtils.supportedDepartmentId.map(departmentId=>{
                    const department = DepartmentUtils.getDepartmentById({departmentId, languageId})
                    expect(department).to.be.a('string');
                    expect(DepartmentUtils.isSupportedDepartment({department, languageId})).to.be.true;
                })
            })
        })
        it('should be pure function', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                DepartmentUtils.supportedDepartmentId.map(departmentId=>{
                    expect(DepartmentUtils.getDepartmentById({departmentId, languageId})).to.equal(DepartmentUtils.getDepartmentById({departmentId, languageId}))
                })
            })
        })
    })
});
