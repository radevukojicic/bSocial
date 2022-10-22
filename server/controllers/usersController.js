//bycrypt
const bcrypt = require('bcrypt')
//jwt
const jwt = require('jsonwebtoken')
//secret
const secret = require('../config/keys').secret
//db
const db = require('../models')
//Model
const user = db.users



module.exports = class API {

    //register new user
    static async register(req, res) {

        //grabbing form data
        const {firstName,lastName,email, password , passwordConfirm} = req.body

        //Check if inputs are empty
        if(!firstName || !lastName || !email || !password || !password || !passwordConfirm){
            return res.status(400).send('All fields are required!')
        }
        
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
            res.send(newUser)
        } catch(err) {
            res.send(err)
        }

    }


    //Login
    static async login(req, res) {
        //form data
        const {email, password} =  req.body

        //Check if inputs are empty
        if(!email || !password){
            return res.status(400).send('All fields are required!')
        }

        //Check if email exists
        const User = await user.findOne({
            where: { email: email }
        });
        if(!User) return res.status(400).send("Wrong email or password")

        //Check if password is valid
        const validPass = bcrypt.compareSync(password,User.password)
        if(!validPass) return res.status(400).send("Wrong email or password")

        //Evrything is ok create token
        const token = jwt.sign({id: User.id}, secret )
        res.cookie('token',token, { maxAge: 900000, httpOnly: true }).send({user: User, token: token})
    }
}