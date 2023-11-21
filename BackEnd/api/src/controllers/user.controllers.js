const User = require('../model/user.model.js');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

  // const createToken = async() => {
  //     const token = await jwt.sign({_id:"6557b5f919a6247f7bdb486d"} , "sgdfetghytgehjuikjhyhnbgfredwsdt",{
  //       expiresIn:"10 seconds"
  //     });
  //     console.log(token);

  //     const userVerify = await jwt.verify(token,"sgdfetghytgehjuikjhyhnbgfredwsdt");
  //     console.log(userVerify);
  // }


//createToken();

//Retrieve and return all users from the database.
exports.helloworld = (req, res) => {
  res.send("Hello World");
}
exports.findAll = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong while getting list of users."
      });
    });
};
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }

  console.log(typeof (req.body))
  // Create a new User
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    createpassword: req.body.createpassword,
    confirmpassword: req.body.confirmpassword,
    creationtimestamp:moment().unix(),

  });
  
  // Save user in the database
  user.save()
    .then(data => {
      res.send(data);
      console.log('response===========>', res);
      const token = user.generateAuthToken();
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Something went wrong while creating new user."
      });
    });
};
//Login
exports.login =  (req,res) => {
  let token;
  const{email,createpassword} = req.body;
  console.log(res.body)
  if(!email || !createpassword ){
    return res.status(400).json({
      message:"Provide the details"

    });
  }
  
  User.findOne({email:email})
  .then(async (user)=> {
    const isMatch = await bcrypt.compare(createpassword,user.createpassword);
     token =  await user.generateAuthToken();
     

    if(!isMatch){
      return res.status(400).json({
        message:"User Not Found",
        logged_in:false
      });
    }
    res.status(200).json({
      message:"Login Successfull",
      logged_in:true,
      token:token
    });
  })
  .catch(err => {
   
    res.status(400).json({
      message:"Something went Wrong"
    });
  })
}
// Find a single User with a id
exports.findOne = (req, res) => {
  User.find({ phone: req.params.phone })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.phone
        });
      }
      res.send(user);
    }).catch(err => {

      return res.status(500).send({
        message: "Error getting user with id " + req.params.phone
      });
    });
};
// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  // Find user and update it with the request body
  User.findByIdAndUpdate(req.params.id, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.last_name,
    phone: req.body.last_name
  }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      res.send(user);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.id
      });
    });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      res.send({ message: "user deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "user not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id
      });
    });
};