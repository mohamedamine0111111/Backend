var express = require('express');
var router = express.Router();


const Mission = require('../models/missions');

const { checkBody } = require('../modules/checkBody');


// teste TC : result false peut etre a cause des champs   rooms ?? ca doit etre un object


router.post('/order',(req, res) => {
    
  
  if (!checkBody(req.body, ['rooms','user','dateTimeStart','dateTimeStop','hasProducts'])) {  
      
     res.json({ result: false, error: 'Missing or empty fields' });
      
      return;
    }

    

    const newMission = new Mission({
      
      
      
      rooms: req.body.rooms,
      dateTimeStart: req.body.dateTimeStart,
      dateTimeStop: req.body.dateTimeStop,
      hasProducts: req.body.hasProducts,
      user: req.body.user,
      isPaid: false
   
   
    });
    
    

      
    // Sauvegarde la nouvel mission dans la base de donnée
      
    
    newMission.save().then((data) => {
        
      res.json({ mission:data , result: true });
     
    
    });});

 //get/mission/:Id

 // route pour mettre a jour le paiement d'une mission / test TC en cours Id mission status ? 
   

 // faire une route pour get le sta 

   

 router.put('/:id/updatePayment',(req,res) => {
      
    
    const newStatusPayment = req.body.status;
    

    Mission.updateOne({_id: req.params.id}, {isPaid: newStatusPayment}) .then(data => {

      res.json({ result: true, data });
                
    }) });




     // Route DELETE pour annuler une mission testé TC


    router.delete('/:id', (req,res) => {


Mission.deleteOne({_id: req.params.id}).then(data => {
 
 
        if (data.deletedCount === 0) {
         
          res.json({ result: false, error: 'mission not found' });
        
        } else {
          
          res.json({ result: true, data });
        }

      })});
      

// testé TC


       router.put('/:missionId/assign/:cleanerId',(req,res)=>{
        
        
        const missionId = req.params.missionId;
        
        const cleanerId = req.params.cleanerId;
        
     
        Mission.updateOne({ _id: missionId }, { cleaner: cleanerId })
      
        .then(data => {
      
        if (data.modifiedCount === 0) {
        
          res.json({ result: false, error: 'mission not found' });
      
        } else {
        
          res.json({ result: true, data });
      
        }})});
        
        
        
        module.exports = router;

// POST /mission/order (formulaire de commande) / body :
//{number of rooms,dateTimeStart,dateTimeStop,hasProducts,frequency} 
// POST /mission/:id/updatePayment / body :  
// {status (true/false)} => Mission.updateOne({_id: req.params.id}, {isPaid: req.body.status}) 
// Delete /mission/:id/cancel  (annulation de commande) 
// PUT /mission/:missionId/assign/:cleanerId
 // routes testé avec succés