const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../Model/userModel')

const userCtrl = {
    signup: async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error);
            res.status(503).send({message: error.message})            
        }
    },
    login: async (req, res) => {
        try {
            
        } catch (error) {
            console.log(error);
            res.status(503).send({message: error.message})            
        }
    }
}