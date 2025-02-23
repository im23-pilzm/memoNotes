const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("Request Headers:", req.headers);

    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token received in middleware:", token);

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verified successfully:", req.user);
        next();
    } catch (err) {
        console.log("Token verification failed:", err.message);
        res.status(401).json({ error: "Invalid Token" });
    }
};

module.exports = authMiddleware;