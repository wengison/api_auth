const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user')
const goalsRoutes = require('./routes/goals')

dotenv.config();
mongoose.set('strictQuery', true);

// App
const app = express();

//Middleware
app.use(express.json());

app.use('/api/user', userRoutes)
app.use('/api/goals', goalsRoutes)

const runApp = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
        app.listen(process.env.PORT, ()=> console.log('server running & db connected'));
    } catch (err) {
        console.log(err);
    }
}
runApp();