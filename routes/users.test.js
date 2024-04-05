const request = require('supertest');
const app = require('../app'); 

it('GET /users/65a350cd587d5483fa22d9f5/profile', async () => {
  
  const res = await request(app).get('/users/65a350cd587d5483fa22d9f5/profile'); 

  
  expect(res.statusCode).toBe(200);
 
 
}); 
