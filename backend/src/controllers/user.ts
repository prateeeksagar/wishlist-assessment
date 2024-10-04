import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/users'
import { Request, Response } from 'express'

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const {username, password } = req.body
        console.log(username)

        const isUserExist = await User.findOne({username})
        console.log(isUserExist)
        if(isUserExist) {
            res.status(400).json({
                message: "Username already exist. Please choose another one.",
                status : false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({username, password: hashedPassword})
        newUser.save()

        console.log(newUser)

        res.status(201).json({
            message: "user created successfully!",
            status: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong. Please try again later", status: false})
    }
}

const login = async (req: Request,res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({username, deleted: "N"})
        if(!user) {
            res.status(404).json({
                message: "user not found.",
                status: false
            })
        }

        if(user && user.password) {
            const isMatch = bcrypt.compare(password, user?.password)
            if(!isMatch) {
                res.status(400).json({
                    message: "Invalid Credentials",
                    status: false
                })
            }

            const jwtSecret = process.env.JWT_SECRET as string
            const token = jwt.sign({id: user._id, }, jwtSecret, {expiresIn: '24h'})

            res.cookie("token",token)
            res.cookie("id", user._id);

            res.send("logged in!")
        } else {
            res.status(500).json({
                message: "Something went wrong. Please try again later",
                status: false
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong. Please try again later", status: false})
    }



}

export default {
    signup,
    login
};