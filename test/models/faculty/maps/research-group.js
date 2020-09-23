import chai from 'chai';

import researchGroupMap from 'models/faculty/maps/research-group.js';
import LanguageUtils from 'models/common/utils/language.js';

const expect = chai.expect;

describe('models/faculty/maps/research-group.js', ()=>{
    context('researchGroupMap[languageId]', ()=>{
        it('should have all language mapping', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(researchGroupMap).to.have.property(languageId);
                expect(researchGroupMap[languageId]).to.be.an.instanceOf(Object);
            })
        })

        it('should be a fronzen variable during execution', ()=>{
            expect(researchGroupMap).to.be.frozen;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(researchGroupMap[languageId]).to.be.frozen;
            })
        })
    })

    context('researchGroupMap[languageId].support', ()=>{
        it('should have `support` array for all language version', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(researchGroupMap[languageId]).to.have.property('support');
                expect(researchGroupMap[languageId].support).to.be.an.instanceOf(Array);
            })
        })

        it('should have more than 2 options for each language support', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(researchGroupMap[languageId].support).to.have.lengthOf.at.least(2);
            })
        })

        it('should have same array size for all language support', ()=>{
            const sameLength = researchGroupMap[LanguageUtils.defaultLanguageId].support.length;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(researchGroupMap[languageId].support).to.have.lengthOf(sameLength);
            })
        })

        it('should be an array of string for all language support', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                researchGroupMap[languageId].support.map(value=>{
                    expect(value).to.be.a('string')
                    expect(value).to.not.equal('')
                })
            })
        })

        it('should be a fronzen variable during execution', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(researchGroupMap[languageId].support).to.be.frozen;
            })
        })
    })

    context('researchGroupMap[languageId].default', ()=>{
        it('should have string `default` for all language version', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(researchGroupMap[languageId]).to.have.property('default');
                expect(researchGroupMap[languageId].default).to.be.a('string');
            })
        })
        it('should not be empty string', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(researchGroupMap[languageId].default).to.not.equal('');
            })
        })
        it('should be in `support` array', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(researchGroupMap[languageId].support).to.include(researchGroupMap[languageId].default);
            })
        })
    })
})

