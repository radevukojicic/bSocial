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
        const {firstName,lastName,email, username, password , passwordConfirm} = req.body

        //Check if inputs are empty
        if(!firstName || !lastName || !email || !username || !password || !passwordConfirm){
            return res.status(400).send({message:'All fields are required!'})

        }
        
        //Checking if user is already in database
        const emailExist = await user.findOne({
            where: { email: email },
        });
        if(emailExist) return res.status(400).send({message:'Email already exists'})

        //Checking if password match
        if(password !== passwordConfirm) return res.status(400).send({message:'Password do not match'})


        if(password.length <= 5) return  res.status(400).send({message:'The password must contain at least 6 characters!'}) 

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //If all is ok create a new user 
        const userInfo = {
            firstName,
            lastName,
            email,
            username,
            password:hashPassword
        }
        try {
            const newUser = await user.create(userInfo)

            //Automatic login user after register
            const token = jwt.sign({id: newUser.id, name: newUser.firstName, email: newUser.email,username: newUser.username },
                secret,
                { expiresIn: '8h' }
                )
           res.status(200).send({success: true, token})

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
        const token = jwt.sign({id: User.id, name: User.firstName, email: User.email,username: User.username },
             secret,
             { expiresIn: '8h' }
             )
        res.status(200).send({success: true, token})
    }

    //Login
    static async logOut(req, res) {
        res.clearCookie('token').redirect('/login');
    }
}