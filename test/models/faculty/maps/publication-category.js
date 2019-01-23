import chai from 'chai';

import publicationCategoryMap from 'models/faculty/maps/publication-category.js';
import LanguageUtils from 'models/common/utils/language.js';

const expect = chai.expect;

describe('models/faculty/maps/publication-category.js', ()=>{
    context('publicationCategoryMap[languageId]', ()=>{
        it('should have all language mapping', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(publicationCategoryMap).to.have.property(languageId);
                expect(publicationCategoryMap[languageId]).to.be.an.instanceOf(Object);
            })
        })

        it('should be a fronzen variable during execution', ()=>{
            expect(publicationCategoryMap).to.be.frozen;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(publicationCategoryMap[languageId]).to.be.frozen;
            })
        })
    })

    context('publicationCategoryMap[languageId].support', ()=>{
        it('should have `support` array for all language version', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(publicationCategoryMap[languageId]).to.have.property('support');
                expect(publicationCategoryMap[languageId].support).to.be.an.instanceOf(Array);
            })
        })

        it('should have more than 2 options for each language support', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(publicationCategoryMap[languageId].support).to.have.lengthOf.at.least(2);
            })
        })

        it('should have same array size for all language support', ()=>{
            const sameLength = publicationCategoryMap[LanguageUtils.defaultLanguageId].support.length;
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(publicationCategoryMap[languageId].support).to.have.lengthOf(sameLength);
            })
        })

        it('should be an array of string for all language support', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                publicationCategoryMap[languageId].support.map(value=>{
                    expect(value).to.be.a('string')
                    expect(value).to.not.equal('')
                })
            })
        })

        it('should be a fronzen variable during execution', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(publicationCategoryMap[languageId].support).to.be.frozen;
            })
        })
    })

    context('publicationCategoryMap[languageId].default', ()=>{
        it('should have string `default` for all language version', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(publicationCategoryMap[languageId]).to.have.property('default');
                expect(publicationCategoryMap[languageId].default).to.be.a('string');
            })
        })
        it('should not be empty string', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(publicationCategoryMap[languageId].default).to.not.equal('');
            })
        })
        it('should be in `support` array', ()=>{
            LanguageUtils.supportedLanguageId.map(languageId=>{
                expect(publicationCategoryMap[languageId].support).to.include(publicationCategoryMap[languageId].default);
            })
        })
    })
})

