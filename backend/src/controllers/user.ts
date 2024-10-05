import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/users'
import { Request, Response } from 'express'
import {z} from 'zod'
import { loginSchema, signupSchema } from '../utils/validations'

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const {username, password } = signupSchema.parse(req.body);
        console.log(username)

        const isUserExist = await User.findOne({username})
        console.log(isUserExist)
        if(isUserExist) {
            res.status(400).json({
                message: "Username already exist. Please choose another one.",
                status : false
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({username, password: hashedPassword})
            newUser.save()
    
            console.log(newUser)
    
            res.status(201).json({
                message: "user created successfully!",
                status: true
            })
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle Zod validation errors
            res.status(400).json({
              message: error.errors[0].message,
              status: false
            });
          } else {
            console.log(error);
            res.status(500).json({ message: "Something went wrong. Please try again later", status: false });
          }
        // console.log(error)
        // res.status(500).json({message: "Something went wrong. Please try again later", status: false})
    }
}

const login = async (req: Request,res: Response): Promise<void> => {
    try {
        const { username, password } = loginSchema.parse(req.body);

        const user = await User.findOne({username, deleted: "N"})
        console.log("this is user")
        console.log(user)
        if(!user) {
            res.status(404).json({
                message: "user not found.",
                status: false
            })
        } else {
            if(user && user.password) {
                const isMatch = await bcrypt.compare(password, user?.password)
                console.log(isMatch);
                if(!isMatch) {
                    res.status(400).json({
                        message: "Invalid Credentials",
                        status: false
                    })
                } else {
                    console.log("it is here")
                    const jwtSecret = process.env.JWT_SECRET as string
                    const token = jwt.sign({id: user._id, }, jwtSecret, {expiresIn: '24h'})
        
                    res.status(200).json({
                        status: true,
                        token,
                        id: user._id
                    })
                }
            } else {
                res.status(500).json({
                    message: "Something went wrong. Please try again later",
                    status: false
                })
            }
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle Zod validation errors
            res.status(400).json({
              message: error.errors[0].message,
              status: false
            });
          } else {
            console.log(error);
            res.status(500).json({ message: "Something went wrong. Please try again later", status: false });
          }
    }

}

const isLoggedIn = async (req: Request,res: Response): Promise<void> => {
    try {
        const token = req.headers["access-token"] as string;
        console.log(req.headers)
        const id = req.headers['user-id'] as string
        console.log("token AND ID", token, id)
        if(token && id) {
            const user = await User.findOne({_id: id, deleted: "N"})
            console.log(user)
            if(user) {
                const jwtSecret = process.env.JWT_SECRET as string
                const verify = jwt.verify(token, jwtSecret);
                if(verify) {
                    res.status(200).json({
                        status: true,
                        message: "correct credentials"
                    })
                } else {
                    res.status(401).json({
                        status: false,
                        message: "incorrect credentials"
                    })
                }
            } else {
                res.status(401).json({
                    status: false,
                    message: "incorrect credentials"
                })
            }
        } else {
            res.status(401).json({
                status: false,
                message: "incorrect credentials"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong. Please try again later", status: false})
    }

}

export default {
    signup,
    login,
    isLoggedIn
};