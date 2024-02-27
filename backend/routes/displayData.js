const router = require('express').Router();

// Not able to pass food items data from mongoose
router.post('/foodata',async (req,res)=>{
     try{
        res.send([global.foodData,global.foodCategory])
        console.log(foodItems);
     }catch(err){
        console.error(err)
     }
})

module.exports = router;