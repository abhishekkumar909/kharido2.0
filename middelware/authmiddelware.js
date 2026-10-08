import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const verifytoken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                status: false,
                message: "Token is required",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Token is required",
            });
        }

        const verify = jwt.verify(token, jwtSecret);

        req.user = verify;
        next();
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: "Invalid or expired token",
        });
    }
};

