const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/Foodb'; 


module.exports = async function(callback) {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Connected to MongoDB");

        const foodCollection = mongoose.connection.db.collection("FoodItems");
        const categoryCollection = mongoose.connection.db.collection("FoodCategory");

        const foodItems = await foodCollection.find({}).toArray();
        // Create food category
        const categoryItems = await categoryCollection.find({}).toArray();
        callback(null, foodItems, categoryItems);
    } catch (error) {
        callback(error, null, null);
    }
};
