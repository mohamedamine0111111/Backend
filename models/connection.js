const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://andaloussi101:072680940Aa@cluster0.kzy4b78.mongodb.net/CleanSweetHome';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));

