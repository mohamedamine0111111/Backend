const request = require('supertest');
const app = require('../app'); 


  it('should assign a cleaner to a mission', async () => {
    
    const missionId = '65821ee4bbb66c9b89f547a8';
    const cleanerId = '6597c6be4923c95410685e8e';

    const answer = await request(app)
    .put('/65821ee4bbb66c9b89f547a8/assign/6597c6be4923c95410685e8e')

      ; 

    
  });

 

    
  ;
