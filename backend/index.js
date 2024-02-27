global.foodData = require('./foodItems')(function call(err, data, CatData) {
    // console.log(data)
    if(err) console.log(err);
    global.foodData = data;
    // console.log(global.foodData);
    global.foodCategory = CatData;
    // console.log(global.foodCategory);
  })

const express = require('express');
const port = 8080;
const mongodb = require('./config/mongoose');
const router = require('./routes/route');
const router2 = require('./routes/displayData');
const cors = require('cors');
const app = express();


// Middlewares
app.use((req,res,next)=>{
    res.setHeader("Access-Controls-Allow-Origin","http://localhost:8080");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    )
    next();
})
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
app.use(cors())


app.use('/',router)
app.use('/food',router2);

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`Server is running on port: ${port}`)
})