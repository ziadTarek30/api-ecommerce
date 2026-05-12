const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  }
  catch(e) {
    console.log("database connection error: ", e);
  }
}

module.exports = dbConnect;