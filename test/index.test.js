const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();


const server = require('../app');

chai.use(chaiHttp);


// Testin ne testi olduğunu yazıyoruz.
describe('Node Server' , ()=>{
    it('(GET /) returns the homepage' , (done)=>{ // -> unit testi yapmak için
        chai.request(server)
            .get('/')
            .end((err,res)=>{
                res.should.have.status(200);
                done();  // ->  done() testi bitti herşey yolunda sıkıntı yok demek.
            }) 
    }); 
})