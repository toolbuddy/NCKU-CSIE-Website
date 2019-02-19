import chai from 'chai';

import projectCategoryMap from 'models/faculty/maps/project-category.js';
import LanguageUtils from 'models/common/utils/language.js';

const expect = chai.expect;

describe('models/faculty/maps/project-category.js', ()=>{
    context('projectCategoryMap[languageId]', ()=>{
        it('should have all language mapping', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(projectCategoryMap).to.have.property(languageId);
                expect(projectCategoryMap[languageId]).to.be.an.instanceOf(Object);
            })
        })

        it('should be a fronzen variable during execution', ()=>{
            expect(projectCategoryMap).to.be.frozen;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(projectCategoryMap[languageId]).to.be.frozen;
            })
        })
    })

    context('projectCategoryMap[languageId].support', ()=>{
        it('should have `support` array for all language version', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(projectCategoryMap[languageId]).to.have.property('support');
                expect(projectCategoryMap[languageId].support).to.be.an.instanceOf(Array);
            })
        })

        it('should have more than 2 options for each language support', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(projectCategoryMap[languageId].support).to.have.lengthOf.at.least(2);
            })
        })

        it('should have same array size for all language support', ()=>{
            const sameLength = projectCategoryMap[LanguageUtils.defaultLanguageId].support.length;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(projectCategoryMap[languageId].support).to.have.lengthOf(sameLength);
            })
        })

        it('should be an array of string for all language support', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                projectCategoryMap[languageId].support.map(value=>{
                    expect(value).to.be.a('string')
                    expect(value).to.not.equal('')
                })
            })
        })

        it('should be a fronzen variable during execution', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(projectCategoryMap[languageId].support).to.be.frozen;
            })
        })
    })

    context('projectCategoryMap[languageId].default', ()=>{
        it('should have string `default` for all language version', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(projectCategoryMap[languageId]).to.have.property('default');
                expect(projectCategoryMap[languageId].default).to.be.a('string');
            })
        })
        it('should not be empty string', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(projectCategoryMap[languageId].default).to.not.equal('');
            })
        })
        it('should be in `support` array', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(projectCategoryMap[languageId].support).to.include(projectCategoryMap[languageId].default);
            })
        })
    })
})

