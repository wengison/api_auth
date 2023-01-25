const jwt = require('jsonwebtoken');

const authorization = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const validation = jwt.verify(token, process.env.SECRET)
        res.locals.id = validation._id;
        next();
    } 
    catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {authorization}