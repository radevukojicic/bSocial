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
        if(!firstName || !lastName || !email || !password || !passwordConfirm){
            // return res.status(400).send('All fields are required!')
            return res.render('register',{error:"All fields are required!"})

        }
        
        //Checking if user is already in database
        const emailExist = await user.findOne({
            where: { email: email },
        });
        //For Vue, React
        // if(emailExist) return res.status(400).send('Email already exists')
         if(emailExist) return res.render('register',{error:"Email already exists!"})

        //Checking if user is already in database

        //For Vue, React
        // if(password !== passwordConfirm) return res.status(400).send('Password do not match')
        if(password !== passwordConfirm) return res.render('register',{error:"Password do not match!"})


        if(password.length <= 5) return res.render('register',{error:"The password must contain at least 6 characters!"})

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

            //Automatic login user after register
            const token = jwt.sign({id: newUser.id ,name: newUser.firstName}, secret )
            res.cookie('token',token, { maxAge: 900000, httpOnly: true }).redirect('/feed')

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
            //For client like Vue, React , etc..
            // return res.status(400).send('All fields are required!')
            return res.render('login',{error:"All fields are required!"})
        }

        //Check if email exists
        const User = await user.findOne({
            where: { email: email }
        });
        //For client like Vue, React , etc..
        // if(!User) return res.status(400).send("Wrong email or password")
        if(!User) return res.render('login',{error:"Wrong email or password!"})
        

        //Check if password is valid
        const validPass = bcrypt.compareSync(password,User.password)
        //For client like Vue, React , etc..
        // if(!validPass) return res.status(400).send("Wrong email or password")
        if(!validPass) return res.render('login',{error:"Wrong email or password!"})

        //Evrything is ok create token
        const token = jwt.sign({id: User.id, name: User.firstName}, secret )
        res.cookie('token',token, { maxAge: 900000, httpOnly: true }).redirect('/feed')
    }

    //Login
    static async logOut(req, res) {
        res.clearCookie('token').redirect('/login');
    }
}