  var express = require('express');
  var router = express.Router();

  const uid2 = require('uid2');
  const bcrypt = require('bcrypt');


  const User = require('../models/users');
  const Missions = require('../models/missions');

  const { checkBody } = require('../modules/checkBody');

  
 
  router.post('/signup', (req, res) => {
  
    
    
    if (!checkBody(req.body, ['email','firstName','lastName','address','phone','password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }


    
   
    User.findOne({ email: req.body.email }).then(data => {
      const hash = bcrypt.hashSync(req.body.password, 10);
      
      if (data === null) {

    
        
    
    const newUser = new User({
          
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,
          phone: req.body.phone,
          password: hash,
          token : uid2(32),
          
        });
        
        
    
       
    
    newUser.save().then((data) => {
          res.json({ token: data.token,userId : data._id,result: true });
        });
     
      } else {
        res.json({ result: false, error: 'User already exists' });
      }
    });
  });





  

  

  
  
  router.post('/signin', (req, res) => {
    
    
  
  if (!checkBody(req.body, ['email', 'password'])) {
      res.json({ result: false, error: 'Missing or empty fields'});
      return;
    }

  
    
  User.findOne({ email: req.body.email }).then(data => {
      
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
  
        
        
        res.json({ result: true, userId: data._id, token: data.token, message : 'la connexion a votre compte est réussi !' });
      } else {
       
        res.json({ result: false, error: 'User not found or wrong password',  message : 'votre email ou votre mot de passe est erroné' });
      }
    });
  });


  
  router.get('/:id/profile',(req,res) => {   

    User.findById(req.params.id).then(data => {
      
      if (!data) {
        res.json({ result: false, error: 'User not found' });
        return;
      }

      Missions.find({ user: data._id }).then( missions => {

        const userProfile = {
          
          
          _id: data._id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phone: data.phone,
          missions : missions,
        
        };

        res.json({ result: true, profile: userProfile });

      })}); })





  module.exports = router;