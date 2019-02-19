import chai from 'chai';

import languageMap from 'models/common/maps/language.js';

const expect = chai.expect;

describe('models/common/maps/language.js', ()=>{
    context('languageMap', ()=>{
        it('should be a fronzen variable during execution', ()=>{
            expect(languageMap).to.be.frozen;
        })
    })

    context('languageMap.support', ()=>{
        it('should have `support` array', ()=>{
            expect(languageMap).to.have.property('support');
            expect(languageMap.support).to.be.an.instanceOf(Array);
        })

        it('should have more than 2 options', ()=>{
            expect(languageMap.support).to.have.lengthOf.at.least(2);
        })

        it('should be an array of string', ()=>{
            languageMap.support.map(language=>{
                expect(language).to.be.a('string');
                expect(language).to.not.empty;
            })
        })

        it('should satisfying IETF language tag format: [a-z]{2}-[a-z]{2,3}', ()=>{
            languageMap.support.map(language=>{
                expect(language).to.have.lengthOf.at.most(6);
                expect(language.substring(0,2)).to.match(/[a-z]{2}/);
                if(language.length >= 3)
                    expect(language[2]).to.equal('-');
                if(language.length >= 5)
                    expect(language.substring(3)).to.match(/[A-Z]{2,3}/);
            })
        })

        it('should be a fronzen variable during execution', ()=>{
            expect(languageMap.support).to.be.frozen;
        })
    })

    context('languageMap.default', ()=>{
        it('should have string `default`', ()=>{
            expect(languageMap).to.have.property('default');
            expect(languageMap.default).to.be.a('string');
        })
        it('should not be empty string', ()=>{
            expect(languageMap.default).to.not.empty;
        })
        it('should be in `support` array', ()=>{
            expect(languageMap.support).to.include(languageMap.default);
        })
    })
})

