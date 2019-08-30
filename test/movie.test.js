const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();


const server = require('../app');

chai.use(chaiHttp);

let token ; 
// Testin ne testi olduğunu yazıyoruz.
describe('/api/movies tests' , ()=>{
   before((done)=>{ // -> testler başlamadan önceden bir işlem yapmamızı sağlar
    chai.request(server)
        .post('/authenticate')
        .send( { username: 'sirkoren1' , password: '123456' })
        .end((err , res)=>{
            token = res.body.token;
            console.log(token);
            done();
        });
   });

   describe('/GET movies' , ()=>{
       it('it should GET all the movies' , (done)=>{
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token' , token)
                .end((err , res)=>{
                    res.should.have.status(200); // status kodu 200 olmalı
                    res.body.should.be.a('array'); // bir array olmalı demek istiyoruz.
                    done();
                });
       })
   });

});