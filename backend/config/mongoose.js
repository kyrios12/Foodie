const mongoose = require('mongoose');
// const mongouri = "mongodb+srv://Saahil:saahil123@cluster0.0srwvph.mongodb.net/Foody"
const mongouri = "mongodb://127.0.0.1:27017/Foodb";
// Assuming 'mongouri' is defined somewhere in your code
mongoose.connect(mongouri)
  .then(async () => {
    console.log('Connected to database successfully');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

// const Food = mongoose.model('FoodItem',FoodSchema);
const Foodie = mongoose.model('Foodie',UserSchema);

// module.exports = {Food,Foodie};
module.exports = Foodie;