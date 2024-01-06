var express = require('express');
var router = express.Router();


const Mission = require('../models/missions');

const { checkBody } = require('../modules/checkBody');





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
    
    

      
    
      
    
    newMission.save().then((data) => {
        
      res.json({ mission:data , result: true });
     
    
    });});

 

   

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

