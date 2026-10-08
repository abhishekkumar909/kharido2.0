import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.TOKEN_KEY;

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            status: "fail",
            message: "User already exists",
        });
    }

    try {
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                status: "success",
                message: "User created successfully",
                data: user,
            });
        } else {
            res.status(400).json({
                status: "fail",
                message: "User not created",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};


// login api

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                status: false,
                message: "first fill both fields",
            });
        }

        const userlogin = await User.findOne({ email, password }).select("-password");

        if (!userlogin) {
            return res.status(404).json({
                status: false,
                message: "login failed",
            });
        }

        const token = jwt.sign(
            {
                id: userlogin._id,
                email: userlogin.email,
            },
            jwtSecret,
            {
                expiresIn: "7h",
            }
        );

        res.status(201).json({
            status: true,
            message: "login suceessfully",
            data: userlogin,
            token: token,
        });

    } catch (error) {
        res.status(500).json({
            status: false,
            message: "internal server error",
            error: error.message,
        });
    }
};

// logout

const logout = async (req, res) => {
    try {
         res.clearCookie("token");
        return res.status(200).json({
            status: true,
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Logout failed",
            error: error.message,
        });
    }
};


// Get all profiles
const profile = async (req, res) => {
    try {
        const getProfile = await User.find();

        if (getProfile) {
            return res.status(200).json({
                status: true,
                message: "User profile data",
                data: getProfile,
            });
        }

        return res.status(404).json({
            status: false,
            message: "No user data found",
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


// Find profile by ID
const findprofile = async (req, res) => {
    try {
        const getProfileId = await User.findById(req.params.id);

        if (getProfileId) {
            return res.status(200).json({
                status: true,
                message: "User profile data",
                data: getProfileId,
            });
        }

        return res.status(404).json({
            status: false,
            message: "User not found",
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


// Update profile
const updateprofile = async (req, res) => {
    try {
        const updatedProfile = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,

            }
        );

        if (updatedProfile) {
            return res.status(200).json({
                status: true,
                message: "User profile updated successfully",
                data: updatedProfile,
            });
        }

        return res.status(404).json({
            status: false,
            message: "User not found",
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};
export { register, login, logout, profile, findprofile, updateprofile };
