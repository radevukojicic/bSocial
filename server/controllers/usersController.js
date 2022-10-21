//bycrypt
const bcrypt = require('bcrypt')
//db
const db = require('../models')
//Model
const user = db.users

module.exports = class API {

    //register new user
    static async register(req, res) {

        //grabbing form data
        const {firstName,lastName,email, password , passwordConfirm} = req.body
        
        //Checking if user is already in database
        const emailExist = await user.findOne({
            where: { email: email },
        });
        if(emailExist) return res.status(400).send('Email already exists')

        //Checking if user is already in database
        if(password !== passwordConfirm) return res.status(400).send('Password do not match')

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //If all is ok create a new user 
        const userInfo = {
            firstName,
            lastName,
            email,
            password:hashPassword
        }
        try {
            const newUser = await user.create(userInfo)
            res.send(newUser.firstName)
        } catch(err) {
            res.send(err)
        }

    }
}