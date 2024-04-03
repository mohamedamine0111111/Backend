const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://andaloussi101:072680940Aa@cluster0.kzy4b78.mongodb.net/CleanSweetHome';

const { MongoMemoryServer } = require('mongodb-memory-server');


const mongod = new MongoMemoryServer()

if (process.env.NODE_ENV === 'test') {
  mongod.start().then(() => {
    const uri = mongod.getUri();
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  });
} else {

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
    .catch(error => console.error(error));
}

module.exports = mongoose;

