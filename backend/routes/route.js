const router = require("express").Router();
const {Foodie} = require("../config/mongoose");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "iwillbechampiononeday";


router.get('/',(req,res)=>{
  res.send('<h1>Hello World</h1>')
})

// There is a problem code is directly jumping to catch block
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password","Too Weak").isLength({ min: 5 }),
    body("name").isLength({ min: 2 }),
    body("location").isLength({min:5})
  ],
  async (req, res) => {
    const result = validationResult(req);
    console.log(req);
    
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    try {
        const password = req.body.password;
        // Directly hashing password and also generating salt
        const hashedpassword = await bcrypt.hash(password,10);
        const newFoodie = await Foodie.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: hashedpassword,
        });

        res.status(200).send({ success: "Hello, you have successfully registered!", user: newFoodie });
    } catch (err) {
        console.error('Error occurred during registration:', err);
        res.status(500).send({ message: "An error occurred during registration." });
    }
}

);
// This post request is not returning valid response as it is not checking in database for already existing user
router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password","Incorrect Password")
  ],
  async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const password = req.body.password;
        const userExist = await Foodie.findOne({ email: req.body.email });
        const comparePassword = await bcrypt.compare(password,userExist.password);
        if (!userExist || !comparePassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const data = {
          user:{
            id:userExist.id
          }
        }
        const authToken = jwt.sign(data,jwtSecret);
        // User authenticated successfully
        return res.json({ success: true,authToken});
    } catch (err) {
        console.error('Error occurred during authentication:', err);
        return res.status(500).json({ error: 'An error occurred during authentication.' });
    }
  }
);

module.exports = router;
