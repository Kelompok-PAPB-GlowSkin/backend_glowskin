const dotenv = require("dotenv");
dotenv.config();

const key = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

class UserController {
    static async createUser(req, res, next){
        const { username, password, name, email } = req.body;
        const user = await User.findOne({ username });
        if (user)
            return res.status(403).json({
                error: {
                    message: "Username sudah digunakan!"
                },
            });
        const useremail = await User.findOne({ email });
        if (useremail)
            return res.status(403).json({
                error: {
                    message: "Email sudah digunakan!"
                },
            });
        const newUser = new User({ username, password, name, email });
        try {
            await newUser.save();
            const token = getSignedToken(newUser);
            res.status(200).json({token, message: "Berhasil mendaftar!"});
        } catch (error)  {
            error.status = 400;
            next(error);
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user)
                return res.status(403).json({
                    error: {
                        message: "Email anda salah!"
                    },
                });
            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid)
                return res.status(403).json({
                    error: { 
                        message: "Password anda salah!" 
                    },
                })
            const token = getSignedToken(user);
            res.status(200).json({
                token,
                message: "Login Success!",
                email: user.email,
            })
        } catch (error) {
            res.status(500).send({ err: error });
        }
    }

    static async getAllUser(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send({ err: error });
        }
    }

    static async editUser(req, res) {
        try{
            const id = req.params.id;
            const { name, email } = req.body;

            await User.findByIdAndUpdate({ _id: id }, { 
                name: name, 
                email: email 
            });
            res.status(200).json({ message: "Berhasil mengubah data!" });
        }
        catch (error) {
            res.status(500).send({ err: error });
        }
    }

    static async getUserByEmail(req, res) {
        const { email } = req.params;
        try {
            const user = await User.findOne({ email });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send({ err: error });
        }
    }

}

getSignedToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        key,
        { expiresIn: '12h' }
    );
};

module.exports = UserController