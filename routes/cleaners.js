var express = require('express');
var router = express.Router();

const Cleaner = require('../models/cleaners');


router.post('/cleaner', (req, res) =>      {
    
    const { email, phone, firstName, lastName } = req.body;


    const newCleaner = new Cleaner({
        email,
        phone,
        firstName,
        lastName,
      });

      
      newCleaner.save().then((data) => {

      res.json({result : true , cleaner : data});
    


      })})


// recuperer le cleaner par son id testé TC
    
       router.get('/cleaners/:id',(req,res) => {
        
        
        Cleaner.findById(req.params.id).then(data => {
        
        
            if(!data)   {    
                res.json({ result: false, error: 'cleaner not found' });
                return;
            }else{
               res.json({ result: true, cleaner:data });
        
 }})})


       // recupérer tous les cleaners testé TC
          
       router.get('/cleaners' ,(req,res) => {

            
            Cleaner.find().then(data => {

               
                if(!data === 0) {

             res.json({ result:false, error : 'cleaners not found'})
                
                  } else {
                
             res.json({result:true, cleaners : data})

             
            }})} )

            module.exports = router;

       
        
            router.get('/:id/workTime',(req,res) => {
            // route pour avoir un compteur du temps de travaille pour chaque cleaner 








            }







            )

// duration, moment.js / 




          









        


    








    














// get / tt les Cleaner 
// get / recupere un cleaner avec son id 
//POST /cleaner body {email, telephone, firstname, lastname}
// testé TC avec succés 