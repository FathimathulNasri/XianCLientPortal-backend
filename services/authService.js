const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.register = async ({ name, email, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  return User.create({ name, email, password: hashed });
};

exports.login = async (email, password) => {
    try{
        const adminExists = await User.findOne({ role:'admin'  });
        if (!adminExists) {
          // If no admin exists, create one with pre-set admin credentials
          const hashedPassword = await bcrypt.hash('admin123', 10); // Pre-set password
    
          const newAdmin = new User({
            username: 'admin', // Pre-set username
            email: 'admin@123.com', // Pre-set email
            password: hashedPassword,
            role:'admin',
          });
    
          await newAdmin.save();
        }
        const existingUser = await User.findOne({email})
    if(!existingUser) {
        return "User Not Exist"
    }
    const isMatch = await bcrypt.compare(password,existingUser.password)
    if(!isMatch) {
        return "Invalid Email or Password"
    }
    const token = jwt.sign({id: existingUser._id,role:existingUser.role}, process.env.JWT_SECRET, {expiresIn:'3 days'} )
    return {token,existingUser}
  }
     catch(error){
         return "Login Failed"
        }
  }
