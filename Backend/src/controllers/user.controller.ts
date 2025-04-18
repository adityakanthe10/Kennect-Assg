import prisma from "../lib/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

interface SignupRequestBody {
    email: string;
    password: string;
}

export const signup = async (req: Request<{}, {}, SignupRequestBody>, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create a new user and save to DB
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        console.log("newUser", newUser);
        res.status(201).json({
            message:"Signup successful"
        })
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // find user by email
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            res.status(401).json({
                message: "Invalid email or password",
            });
            return;
        }

        // compare the password with the hashed password in DB
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({
                message: "Invalid email or password",
            });
            return;
        }

        res.status(200).json({
            message: "Login successful",
        });
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};