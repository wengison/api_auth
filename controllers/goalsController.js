const Goal = require('../models/Goal')

const handleError = (message) => {
    return message
}

const getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({user: res.locals.id})
        if(!goals) {
            throw new Error()
        }
        res.status(200).json({goals})
    } 
    catch (error) {
        res.status(400).json(error.message)
    }
}

const createGoal = async (req, res) => {
    const {text} = req.body
    const user = res.locals.id
    try {
        const goal = await Goal.create({user, text})
        res.status(200).json(goal)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {getGoals, createGoal}