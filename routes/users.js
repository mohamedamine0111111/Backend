  var express = require('express');
  var router = express.Router();

  const uid2 = require('uid2');
  const bcrypt = require('bcrypt');


  const User = require('../models/users');
  const Missions = require('../models/missions');

  const { checkBody } = require('../modules/checkBody');

  // Route pour l'inscription d'un utilisateur 
 
  router.post('/signup', (req, res) => {
  
    // Vérifie si les champs requis sont présents dans la requête 
    
    if (!checkBody(req.body, ['email','firstName','lastName','address','phone','password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }


    // Recherche si l'utilisateur existe déjà 
   
    User.findOne({ email: req.body.email }).then(data => {
      const hash = bcrypt.hashSync(req.body.password, 10);
      
      if (data === null) {

    // Crée un nouvel utilisateur s'il n'existe pas déjà
        
    
    const newUser = new User({
          
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          address: req.body.address,
          phone: req.body.phone,
          password: hash,
          token : uid2(32),
          
        });
        
        
    // Sauvegarde le nouvel utilisateur dans la base de données
       
    
    newUser.save().then((data) => {
          res.json({ token: data.token,result: true });
        });
     
      } else {
        res.json({ result: false, error: 'User already exists' });
      }
    });
  });





  

  

  // Route pour la connexion d'un utilisateur
  
  router.post('/signin', (req, res) => {
    
    // Vérifie si les champs requis sont présents dans la requête
  
  if (!checkBody(req.body, ['email', 'password'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }

  // Recherche l'utilisateur par email
    
  User.findOne({ email: req.body.email }).then(data => {
      
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
  
        // Si l'utilisateur existe et le mot de passe est correct, renvoie le token
        
        res.json({ result: true, token: data.token });
      } else {
        res.json({ result: false, error: 'User not found or wrong password' });
      }
    });
  });


  // Route pour obtenir le profil d'un  avec l'historique des missions
  
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



  // POST /user/signin / body: {email, password} 
  // POST /user/signup / body : {email, firstName, lastName, address [], numberphone} 
  // Get /user/:id/profile /  je veux inclure l'historique des commandes 
  // Get /user/:id/orders ( historiques de commandes) / body : { Id , dateTimeStart ,dateTimeStop, Status (finish or in progress} F
  // les routes testé TC ac succés