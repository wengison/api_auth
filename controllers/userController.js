const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

env.config();

// token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'});
}

// signup
const signupUser = async(req, res) => {
    try {
        const {email, password} = req.body
        const exist = await User.findOne({email})
        if(exist) {
            res.status(400).json({err: 'User with this email already exist'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        const user = await User.create({email, password: hashed})
        const token = createToken(user._id);

        res.status(200).json({user, token})
        
    } catch (error) {
        res.status(400).json(error)
    }
}

// login
const loginUser = async (req, res) => {

    try {
        const {email, password} = req.body

        if(!email) {
            res.status(400).json('no email');
        } 
        const user = await User.findOne({email});

        if(!password) {
            res.status(400).json('no password');
        }
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            throw Error('wrong password')
        } 
       
        const token = createToken(user._id);  // -> user._id.toString(); ..neni potreba
        res.status(200).json({user, token, message: 'successfully login'})
    } 
    catch (err) {
        res.status(400).json(err.message);
    }
}


// ----------------------------------------
// delete one
// const deleteUser = async(req, res) => {
//     try {
//         const user = await User.findByIdAndRemove({_id: req.params.id});
//         console.log('delete one user');
//         res.status(200).json(user);
//     } catch (err){
//         res.status(400).json(err);
//     }
// }

// // update one
// const updateUser = async(req, res) => {
//     try {
//         const user = await User.findByIdAndUpdate({_id: req.params.id}, {
//             ...req.body
//         })
//         console.log('update one user');
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// }

module.exports = {loginUser, signupUser}