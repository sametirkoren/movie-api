const mongoose = require('mongoose');


module.exports = () => {
    mongoose.connect('mongodb://movie_user:abcd1234@ds311968.mlab.com:11968/heroku_z0rpq5d3' , {useNewUrlParser : true})
    mongoose.connection.on('open' , () => {
        console.log('MongoDB : Connected');
    });
    mongoose.connection.on('error' , (err)=>{
        console.log('MongoDB : Error' , err);
    });


    mongoose.Promise = global.Promise;
};