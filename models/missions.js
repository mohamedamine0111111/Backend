const mongoose = require('mongoose');

const roomsDoc = mongoose.Schema({
    
    bedrooms: Number,
    bathrooms: Number,
    kitchen: Number,
    living: Number
})

const missionSchema = mongoose.Schema({
    
    
    
    dateTimeStart: Date,
    dateTimeStop : Date,
    rooms: roomsDoc,
    hasProducts : Boolean,
    isPaid: Boolean,
    // frequency : String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, 
    cleaner: { type: mongoose.Schema.Types.ObjectId, ref: 'cleaners', required: false },
});

const Mission = mongoose.model('missions', missionSchema);

module.exports = Mission;





