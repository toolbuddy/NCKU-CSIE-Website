import chai from 'chai';

import departmentMap from 'models/faculty/maps/department.js';
import LanguageUtils from 'models/common/utils/language.js';

const expect = chai.expect;

describe('models/faculty/maps/department.js', ()=>{
    context('departmentMap[languageId]', ()=>{
        it('should have all language mapping', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(departmentMap).to.have.property(languageId);
                expect(departmentMap[languageId]).to.be.an.instanceOf(Object);
            })
        })

        it('should be a fronzen variable during execution', ()=>{
            expect(departmentMap).to.be.frozen;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(departmentMap[languageId]).to.be.frozen;
            })
        })
    })

    context('departmentMap[languageId].support', ()=>{
        it('should have `support` array for all language version', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(departmentMap[languageId]).to.have.property('support');
                expect(departmentMap[languageId].support).to.be.an.instanceOf(Array);
            })
        })

        it('should have more than 2 options for each language support', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(departmentMap[languageId].support).to.have.lengthOf.at.least(2);
            })
        })

        it('should have same array size for all language support', ()=>{
            const sameLength = departmentMap[LanguageUtils.defaultLanguageId].support.length;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(departmentMap[languageId].support).to.have.lengthOf(sameLength);
            })
        })

        it('should be an array of string for all language support', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                departmentMap[languageId].support.map(value=>{
                    expect(value).to.be.a('string')
                    expect(value).to.not.equal('')
                })
            })
        })

        it('should be a fronzen variable during execution', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(departmentMap[languageId].support).to.be.frozen;
            })
        })
    })

    context('departmentMap[languageId].default', ()=>{
        it('should have string `default` for all language version', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(departmentMap[languageId]).to.have.property('default');
                expect(departmentMap[languageId].default).to.be.a('string');
            })
        })
        it('should not be empty string', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(departmentMap[languageId].default).to.not.equal('');
            })
        })
        it('should be in `support` array', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(departmentMap[languageId].support).to.include(departmentMap[languageId].default);
            })
        })
    })
})

