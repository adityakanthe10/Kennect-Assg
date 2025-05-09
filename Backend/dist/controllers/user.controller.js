"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // create a new user and save to DB
        const newUser = yield prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        console.log("newUser", newUser);
        res.status(201).json({
            message: "Signup successful"
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // find user by email
        const user = yield prisma_1.default.user.findUnique({
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
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                message: "Invalid email or password",
            });
            return;
        }
        res.status(200).json({
            message: "Login successful",
        });
    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.login = login;
