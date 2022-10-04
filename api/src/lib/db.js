const mongoose = require("mongoose");

const MONGODB_CONNECTION_STR = process.env.MONGODB_CONNECTION_STR || '';

if (MONGODB_CONNECTION_STR == "") {
    console.error("Database connection string is empty [MONGODB_CONNECTION_STR]")
    process.exit(1);
}

mongoose.Promise = global.Promise;
const connection = mongoose.connection;

connection.on('connecting', function () {
  console.log('connecting to MongoDB...');
});

connection.on('error', function (err) {
  if (err.message.code === 'ETIMEDOUT') {
    console.log('Attempting to re-establish database connection.');
    mongoose.connect(MONGODB_CONNECTION_STR);
  } else {
    mongoose.disconnect();
    console.error('Error while attempting to connect to database:');
    console.error(err);
  }
});

connection.on('connected', function () {
  console.log('MongoDB connected!');
});
connection.once('open', function () {
  console.log('MongoDB connection opened!');
});
connection.on('reconnected', function () {
  console.log('MongoDB reconnected!');
});
connection.on('disconnected', function () {
  console.log('MongoDB disconnected!');
  mongoose.connect(MONGODB_CONNECTION_STR);
});

mongoose.connect(MONGODB_CONNECTION_STR);

module.exports = connection;
