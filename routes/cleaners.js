var express = require('express');
var router = express.Router();

const Cleaner = require('../models/cleaners');
const Mission = require('../models/missions');


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

       
        
           
            
            
            // route pour avoir un compteur du temps de travail pour chaque cleaner 

            router.get('/workTimeHours/:cleanerId', (req, res) => {
                Mission.find({ cleaner: req.params.cleanerId }).then(missions => {
                    let totalHours = 0;
            
                    missions.forEach(mission => {
                        
                        const start = new Date(mission.dateTimeStart);
                        const end = new Date(mission.dateTimeStop);
                       
                        totalHours += (end - start) / (1000 * 60 * 60); // Convertir en heures
                    });                                                  // convertir en min si possible
            
                    res.json({ totalHours: totalHours, missionsCompleted: missions.length });
                
             
                    res.json({ result: false, message: "Erreur lors de la récupération des missions" });
                });
            });



            module.exports = router;

          









        


    








    














// get / tt les Cleaner 
// get / recupere un cleaner avec son id 
//POST /cleaner body {email, telephone, firstname, lastname}
// testé TC avec succés 