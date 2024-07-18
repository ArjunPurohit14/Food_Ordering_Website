const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/gofoodmern", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected");

    const db = mongoose.connection.db;

    // Fetch data using the native MongoDB driver
    const foodItemsCollection = db.collection("foodItems");
    const foodCategoryCollection = db.collection("foodCategory");

    const foodItemsData = await foodItemsCollection.find({}).toArray();
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    // Assign to global variables
    global.foodItems = foodItemsData;
    global.foodCategory = foodCategoryData;

    console.log("Global data set successfully");
  } catch (err) {
    console.error("Error:", err);
  }
};

module.exports = mongoDB;
