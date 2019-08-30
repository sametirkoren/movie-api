const express = require('express');
const router = express.Router();

// Models
const Director = require('../models/Director');

router.post('/', (req, res, next) => {
  const director = new Director(req.body);
  const promise = director.save();
  promise.then((data) =>{
      res.json(data);
  }).catch((err)=>{
      res.json(err);
  });
});

router.get('/' , (req,res)=>{
  const promise = Director.aggregate([
    {
      $lookup : {
        from : 'movies', // nere ile join edilecek
        localField : '_id', // director tablosundan hangi alan ile eşleştirilecek
        foreignField : 'director_id' , // movies tablosundan ne ile eşleşecek
        as : 'movies' // donen datanın adı
      }
    },
    {
      $group : {
        _id  :{
          _id : '$_id',
          name : '$name',
          surname  : '$surname',
          bio : '$bio'
        },
        movies : {
          $push : '$movies'
        }
      }
    },
    {
      $project : {
        _id : '$_id._id',
        name : '$_id.name',
        surname : '$_id.surname',
        movies : '$movies'
      }
    },
    {
      $unwind : {
        path : '$movies',
        preserveNullAndEmptyArrays : true
      }
    }
  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})

module.exports = router;
