const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router(); 
const Group = require('../models/groups');
const User = require('../models/users');
const mongoose = require('mongoose');

router.get('/:user',(req, res, next)=>{
  const userid=req.params.user;
  User.findById(userid)
  .then(user =>
    res.render('user',{
      user_name: user.naam,
      user_id: userid}));
});
router.get('/:user/create-habit', (req,res,next)=>{
  const userid=req.params.user
  res.render('form', {
    user_id: userid
  });
});

router.post('/:user/create-habit', (req,res,next)=>{
  const userid=req.params.user;
  const naam= req.body.groupname;
  const fr1 = req.body.fr1;
  const fr2 = req.body.fr2;
  const fr3 = req.body.fr3;
  const fr4 = req.body.fr4;
  const fr5 = req.body.fr5;
  const fr6 = req.body.fr6;
  const fr7 = req.body.fr7;
  const new_frequency = [];
  const freque = [fr1, fr2, fr3, fr4, fr5, fr6, fr7];
  for (i in freque) {
    if (freque[i] == undefined){
      continue;
    }
    new_frequency.push(freque[i]);
  }
  const group= new Group(
    {naam: naam, frequency:new_frequency, people: [userid]});
  group
    .save()
    .then(result=>{
    console.log('Created Group');
    res.redirect('/'+userid, {
      user_id:userid
    });
    })
    .catch(err=>{
       console.log(err);
    });

}); 


router.get('/:user/home', (req,res,next)=>{
  const userid=req.params.user;
  // User.find(userid)
  // .then(users => {
  //   users.habits.push(groupid);
  // })
  // .catch(err =>{
  //   console.log(err);
  // });
  res.render('index',{
    user_id:userid
  })
});

router.get('/', (req,res,next)=>{
  res.render('login');
});


router.post('/', (req,res,next)=>{
  const naam= req.body.name;
  const email= req.body.email;
  const password= req.body.password;
  const eyed = new mongoose.Types.ObjectId();
  const user= new User (
    {_id: eyed, naam: naam, email: email, password: password});
    user
    .save()
    .then(result=>{
    console.log('Created User');
    })
    .catch(err=>{
       console.log(err);
    });
  res.redirect('/'+eyed)
});


module.exports = router;
