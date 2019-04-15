import chai from 'chai';
import chaiAsPromise from 'chai-as-promised';

import {
    faculty,
    announcement,
} from 'models/common/utils/connect.js';

chai.use(chaiAsPromise);
const expect = chai.expect;


describe('models/common/utils/connect.js', ()=>{
    context('connect.faulty', ()=>{
        it('should be authenticated successfuly', (done)=>{
            faculty.authenticate().then(()=>{
                done();
                faculty.close();
            })
            .catch((err)=>{
                done(err);
            })
        })
    })
    context('connect.announcement', ()=>{
        it('should be authenticated successfuly', (done)=>{
            announcement.authenticate().then(()=>{
                done();
                announcement.close();
            })
            .catch((err)=>{
                done(err);
            })
        })
    })
})