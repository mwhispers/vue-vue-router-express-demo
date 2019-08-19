const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const movieSchema = mongoose.Schema({
    title : {type:String,require:true},
    poster : String,
    rating : String,
    introduction : String,
    create_at : {type : Date, default : Date.now},
    update_at : {type : Date, default : Date.now}
});

const Movie = mongoose.model('Movie',movieSchema);
module.exports = Movie;

router.get('/movie',(req,res)=>{
    Movie.find({})
    .sort({update_at:-1})
    .then(movies=>{
        res.json(movies);
    })
    .catch(err=>{
        res.json(err);
    })
});

router.get('/movie/:id',(req,res)=>{
    Movie.findOne({title:req.params.id})
    .then(movie=>{
        res.json(movie);
    })
    .catch(err=>{
        res.json(err);
    })
})

router.post('/movie',(req,res)=>{
    Movie.create(req.body,(err,movie)=>{
        if(err){
            res.json(err);
        }else{
            res.json(movie);
        }
    })
});

router.put('/movie/:id',(req,res)=>{
    Movie.findOneAndUpdate({_id:req.params.id},
        {
            $set:{
                title:req.body.title,
                rating : req.body.rating,
                poster : req.body.poster,
                introduction : req.body.introduction 
            }
        },{
            new:true
        }).then(movie=>{
            res.json(movie);
        }).catch(err=>{
            res.json(err);
        })
});

router.delete('/movie/:id',(req,res)=>{
    Movie.findOneAndDelete({
        _id:req.params.id
    }).then(movie=>{
        res.send('删除成功')
    }).catch(err=>{
        res.json(err);
    })
})

module.exports = router;