const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Connexion à MongoDB en mode test ou production
if (process.env.NODE_ENV === 'test') {
  const mongod = new MongoMemoryServer();
  mongod.start().then(() => {
    const uri = mongod.getUri();
    mongoose.connect(uri)
      .then(() => console.log('Test Database connected'))
      .catch(error => console.error('Error connecting to Test Database:', error));
  });
} else {
  const connectionString = 'mongodb+srv://andaloussi101:072680940Aa@cluster0.kzy4b78.mongodb.net/CleanSweetHome';

  mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
    .then(() => console.log('Database connected'))
    .catch(error => console.error('Error connecting to Database:', error));
}

module.exports = mongoose;
