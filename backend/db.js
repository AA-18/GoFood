const mongoose = require("mongoose");
require('dotenv').config()

// console.log(process.env.DB_USERNAME);

const mongoURI = "mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.gslbxo9.mongodb.net/goFood";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to database successfully!!");
    await fetchData();
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

async function fetchData() {
  const fetchedData = mongoose.connection.db.collection("foodData");
  global.food_data = await fetchedData.find({}).toArray();
  const fetchedCategory = mongoose.connection.db.collection("foodCategory");
  global.food_category =  await fetchedCategory.find({}).toArray();
  
//   console.log(data);
}

module.exports = mongoDB;
